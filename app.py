from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional
import bcrypt
from datetime import datetime
import os
import logging
import traceback

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Конфигурация
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production-please')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Поддержка PostgreSQL на Render и SQLite локально
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    # Render иногда возвращает postgres:// вместо postgresql://
    if DATABASE_URL.startswith('postgres://'):
        DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    logger.info('Using PostgreSQL database')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jurresult.db'
    logger.info('Using SQLite database (local development)')

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Пожалуйста, войдите для доступа к этой странице'
login_manager.login_message_category = 'error'


# === MODELS ===
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), default='')
    phone = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    projects = db.relationship('Project', backref='user', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        if not password:
            raise ValueError("Password cannot be empty")
        self.password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

    def check_password(self, password):
        if not password or not self.password_hash:
            return False
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )


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
    name = StringField('Имя', validators=[DataRequired(message='Имя обязательно')])
    email = StringField('Email', validators=[DataRequired(message='Email обязателен'), Email()])
    phone = StringField('Телефон', validators=[Optional()])
    password = PasswordField('Пароль', validators=[DataRequired(message='Пароль обязателен'),
                                                   Length(min=6, message='Минимум 6 символов')])
    confirm_password = PasswordField('Подтвердите пароль', validators=[
        DataRequired(message='Подтверждение пароля обязательно'),
        EqualTo('password', message='Пароли не совпадают')
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
    try:
        return db.session.get(User, int(user_id))
    except Exception as e:
        logger.error(f"Error loading user {user_id}: {e}")
        return None


# === ERROR HANDLERS ===
@app.errorhandler(404)
def not_found_error(error):
    return render_template('error.html', error_code=404, error_message="Страница не найдена"), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    logger.error(f"500 error: {error}")
    return render_template('error.html', error_code=500, error_message="Внутренняя ошибка сервера"), 500


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
        try:
            contact = Contact(
                name=form.name.data or '',
                email=form.email.data,
                phone=form.phone.data or '',
                message=form.message.data,
                service=form.service.data or ''
            )
            db.session.add(contact)
            db.session.commit()
            flash('Заявка отправлена! Мы свяжемся с вами в течение 30 минут.', 'success')
            return redirect(url_for('contacts'))
        except Exception as e:
            db.session.rollback()
            logger.error(f"Contact form error: {e}")
            logger.error(traceback.format_exc())
            flash('Ошибка при отправке заявки. Попробуйте позже.', 'error')
    return render_template('contacts.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    form = LoginForm()
    if form.validate_on_submit():
        try:
            user = User.query.filter_by(email=form.email.data.lower()).first()
            if user and user.check_password(form.password.data):
                login_user(user)
                next_page = request.args.get('next')
                logger.info(f"User {user.email} logged in successfully")
                return redirect(next_page or url_for('dashboard'))
            flash('Неверный email или пароль', 'error')
        except Exception as e:
            logger.error(f"Login error: {e}")
            logger.error(traceback.format_exc())
            flash('Ошибка при входе. Попробуйте позже.', 'error')

    return render_template('login.html', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    form = RegisterForm()

    if form.validate_on_submit():
        try:
            email = form.email.data.lower().strip()

            # Проверка на существующего пользователя
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                flash('Пользователь с таким email уже существует', 'error')
                return render_template('register.html', form=form)

            # Создание нового пользователя
            user = User(
                email=email,
                name=form.name.data.strip(),
                phone=form.phone.data.strip() if form.phone.data else None
            )
            user.set_password(form.password.data)

            db.session.add(user)
            db.session.commit()

            login_user(user)
            logger.info(f"New user registered: {user.email}")
            flash('Регистрация успешна! Добро пожаловать.', 'success')
            return redirect(url_for('dashboard'))

        except Exception as e:
            db.session.rollback()
            logger.error(f"Registration error: {e}")
            logger.error(traceback.format_exc())
            flash(f'Ошибка регистрации. Попробуйте позже.', 'error')

    # Показываем ошибки валидации формы
    if form.errors:
        for field, errors in form.errors.items():
            for error in errors:
                flash(f'{error}', 'error')

    return render_template('register.html', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Вы вышли из системы', 'success')
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    try:
        projects = Project.query.filter_by(user_id=current_user.id).order_by(Project.created_at.desc()).all()
        return render_template('dashboard.html', projects=projects)
    except Exception as e:
        logger.error(f"Dashboard error: {e}")
        logger.error(traceback.format_exc())
        flash('Ошибка при загрузке данных', 'error')
        return render_template('dashboard.html', projects=[])


@app.route('/dashboard/project/new', methods=['POST'])
@login_required
def new_project():
    try:
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
    except Exception as e:
        db.session.rollback()
        logger.error(f"New project error: {e}")
        flash('Ошибка при создании проекта', 'error')

    return redirect(url_for('dashboard'))


@app.route('/api/health')
def health():
    try:
        # Проверяем подключение к БД
        db.session.execute('SELECT 1')
        return jsonify({
            'status': 'ok',
            'database': 'connected',
            'timestamp': datetime.utcnow().isoformat()
        })
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            'status': 'error',
            'database': 'disconnected',
            'error': str(e)
        }), 500


# === DATABASE INITIALIZATION ===
def init_db():
    """Создает таблицы БД при запуске"""
    with app.app_context():
        try:
            db.create_all()
            logger.info('✅ Database tables created successfully')
        except Exception as e:
            logger.error(f'❌ Database initialization error: {e}')
            logger.error(traceback.format_exc())
            raise


# Инициализируем БД при запуске
init_db()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)