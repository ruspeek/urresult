from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional
import bcrypt
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jurresult.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# === MODELS ===
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    projects = db.relationship('Project', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    package_type = db.Column(db.String(50), default='individual')
    message = db.Column(db.Text)
    phone = db.Column(db.String(50))
    status = db.Column(db.String(50), default='new')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(50))
    message = db.Column(db.Text, nullable=False)
    service = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# === FORMS ===
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Войти')


class RegisterForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    phone = StringField('Телефон', validators=[Optional()])
    password = PasswordField('Пароль', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Подтвердите пароль', validators=[
        DataRequired(), EqualTo('password', message='Пароли не совпадают')
    ])
    submit = SubmitField('Зарегистрироваться')


class ContactForm(FlaskForm):
    name = StringField('Имя')
    email = StringField('Email', validators=[DataRequired(), Email()])
    phone = StringField('Телефон')
    message = TextAreaField('Сообщение', validators=[DataRequired()])
    service = SelectField('Услуга', choices=[
        ('', 'Выберите пакет'),
        ('individual', 'Индивидуальная разработка'),
        ('start', 'Старт — 50 000 ₽'),
        ('main', 'Основной — 85 000 ₽'),
        ('extended', 'Расширенный — 110 000 ₽')
    ])
    submit = SubmitField('Отправить заявку')


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))


# === ROUTES ===
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/services')
def services():
    return render_template('services.html')


@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')


@app.route('/contacts', methods=['GET', 'POST'])
def contacts():
    form = ContactForm()
    if form.validate_on_submit():
        contact = Contact(
            name=form.name.data,
            email=form.email.data,
            phone=form.phone.data,
            message=form.message.data,
            service=form.service.data
        )
        db.session.add(contact)
        db.session.commit()
        flash('Заявка отправлена! Мы свяжемся с вами в течение 30 минут.', 'success')
        return redirect(url_for('contacts'))
    return render_template('contacts.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Неверный email или пароль', 'error')
    return render_template('login.html', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    form = RegisterForm()
    if form.validate_on_submit():
        if User.query.filter_by(email=form.email.data).first():
            flash('Пользователь с таким email уже существует', 'error')
        else:
            user = User(
                email=form.email.data,
                name=form.name.data,
                phone=form.phone.data
            )
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for('dashboard'))
    return render_template('register.html', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    projects = Project.query.filter_by(user_id=current_user.id).order_by(Project.created_at.desc()).all()
    return render_template('dashboard.html', projects=projects)


@app.route('/dashboard/project/new', methods=['POST'])
@login_required
def new_project():
    package_type = request.form.get('package_type', 'individual')
    message = request.form.get('message', '')
    phone = request.form.get('phone', '')
    project = Project(
        user_id=current_user.id,
        package_type=package_type,
        message=message,
        phone=phone
    )
    db.session.add(project)
    db.session.commit()
    flash('Проект создан!', 'success')
    return redirect(url_for('dashboard'))


@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'database': 'connected'})


# === INIT DB ===
def init_db():
    with app.app_context():
        db.create_all()
        print('Database initialized!')


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)