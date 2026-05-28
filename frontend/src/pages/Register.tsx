import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name, formData.phone);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      {/* Фоновые эффекты */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="section max-w-lg w-full relative z-10">
        <div className="card gradient-border p-8 animate-fadeInUp">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-float" />
            <h1 className="text-3xl font-bold text-gradient-gold mb-2">Регистрация</h1>
            <p className="text-gray-400">Создайте аккаунт для управления проектами</p>
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Аккаунт создан! Перенаправление...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Имя *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Иван Иванов"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Пароль *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Подтвердите пароль *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 py-4">
              Зарегистрироваться <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Регистрируясь, вы соглашаетесь с{' '}
              <Link to="/terms" className="text-yellow-500 hover:text-red-500 transition-colors">
                условиями использования
              </Link>
            </p>
            <p className="text-gray-400">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-yellow-500 hover:text-red-500 transition-colors font-semibold">
                Войти
              </Link>
            </p>
          </div>

          {/* Преимущества */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <CheckCircle className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Бесплатно</p>
              </div>
              <div>
                <CheckCircle className="w-5 h-5 text-red-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Быстро</p>
              </div>
              <div>
                <CheckCircle className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Безопасно</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;