import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  FolderOpen,
  MessageCircle,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  Mail,
  Phone
} from 'lucide-react';

interface Project {
  id: number;
  package_type: string;
  status: string;
  message: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-yellow-500 bg-yellow-500/10';
      case 'in_progress': return 'text-blue-500 bg-blue-500/10';
      case 'completed': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершён';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Фоновые эффекты */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <section className="section">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-fadeInUp">
          <div>
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">Личный кабинет</h1>
            <p className="text-gray-400">Управляйте своими проектами</p>
          </div>

          <div className="flex gap-4">
            <Link to="/contacts">
              <button className="btn-gold flex items-center gap-2">
                <Plus size={20} /> Новый проект
              </button>
            </Link>
            <button
              onClick={logout}
              className="btn-red flex items-center gap-2"
            >
              <LogOut size={20} /> Выйти
            </button>
          </div>
        </div>

        {/* Инфо о пользователе */}
        <div className="card gradient-border p-8 mb-12 animate-fadeInUp">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-gold-red flex items-center justify-center">
              <User className="w-10 h-10 text-gray-900" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{user?.name || 'Пользователь'}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-500" />
                  {user?.email}
                </span>
                {user?.phone && (
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    {user.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-gray-400 text-sm">Дата регистрации</p>
              <p className="text-yellow-500 font-semibold">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('ru-RU') : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center animate-fadeInUp">
            <FolderOpen className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white mb-1">{projects.length}</p>
            <p className="text-gray-400 text-sm">Всего проектов</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white mb-1">
              {projects.filter(p => p.status === 'new' || p.status === 'in_progress').length}
            </p>
            <p className="text-gray-400 text-sm">В работе</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white mb-1">
              {projects.filter(p => p.status === 'completed').length}
            </p>
            <p className="text-gray-400 text-sm">Завершено</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white mb-1">100%</p>
            <p className="text-gray-400 text-sm">Удовлетворённость</p>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-gold-red text-gray-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderOpen className="inline w-5 h-5 mr-2" />
            Проекты
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'messages'
                ? 'bg-gradient-gold-red text-gray-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageCircle className="inline w-5 h-5 mr-2" />
            Сообщения
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-gold-red text-gray-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="inline w-5 h-5 mr-2" />
            Настройки
          </button>
        </div>

        {/* Контент табов */}
        {activeTab === 'projects' && (
          <div className="animate-fadeIn">
            {loading ? (
              <div className="card text-center py-12">
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Загрузка проектов...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="card gradient-border p-12 text-center">
                <FolderOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">У вас пока нет проектов</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Создайте свой первый проект и начните получать заявки от клиентов
                </p>
                <Link to="/contacts">
                  <button className="btn-gold flex items-center gap-2 mx-auto">
                    <Plus size={20} /> Создать проект
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="card animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(project.created_at).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Пакет: {project.package_type || 'Индивидуальный'}
                        </h3>
                        <p className="text-gray-400">{project.message || 'Нет описания'}</p>
                      </div>
                      <div className="flex gap-3">
                        <Link to={`/projects/${project.id}`}>
                          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors">
                            Подробнее
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="card gradient-border p-12 text-center animate-fadeIn">
            <MessageCircle className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Сообщения</h3>
            <p className="text-gray-400 mb-8">
              Свяжитесь с нами через Telegram для быстрых ответов
            </p>
            <a href="https://t.me/resultlegal" target="_blank" rel="noopener noreferrer">
              <button className="btn-gold flex items-center gap-2 mx-auto">
                <MessageCircle size={20} /> Написать в Telegram
              </button>
            </a>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="card">
              <h3 className="text-xl font-bold text-yellow-500 mb-6">Профиль</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Имя</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ''}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Телефон</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone || ''}
                    className="input-field"
                  />
                </div>
                <button className="btn-gold w-full">Сохранить изменения</button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-red-500 mb-6">Безопасность</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Текущий пароль</label>
                  <input type="password" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Новый пароль</label>
                  <input type="password" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Подтвердите пароль</label>
                  <input type="password" className="input-field" />
                </div>
                <button className="btn-red w-full">Изменить пароль</button>
              </div>
            </div>

            <div className="card md:col-span-2">
              <h3 className="text-xl font-bold text-yellow-500 mb-6">Уведомления</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                  <span className="text-gray-300">Email уведомления о новых заявках</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-yellow-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                  <span className="text-gray-300">Telegram уведомления</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-yellow-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                  <span className="text-gray-300">SMS уведомления</span>
                  <input type="checkbox" className="w-5 h-5 accent-yellow-500" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 card gradient-gold-red p-12 animate-glow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Нужна помощь?
            </h2>
            <p className="text-lg text-gray-800 mb-8 font-semibold">
              Наша поддержка ответит в течение 30 минут
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://t.me/resultlegal" target="_blank" rel="noopener noreferrer">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  <MessageCircle size={20} /> Telegram
                </button>
              </a>
              <a href="mailto:legalresult1@gmail.com">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  <Mail size={20} /> Email
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;