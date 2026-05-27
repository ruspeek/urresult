import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Project {
  id: number;
  package_type: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      new: 'Новая заявка',
      in_progress: 'В работе',
      completed: 'Завершён',
      cancelled: 'Отменён'
    };
    return statuses[status] || status;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Личный кабинет</h1>
          <p className="text-gray-400 mb-8">Добро пожаловать, {user?.name || user?.email}</p>

          <div className="bg-dark-primary p-8 rounded-xl border border-gold/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Ваши проекты</h2>

            {loading ? (
              <div className="text-center py-12 text-gray-400">Загрузка...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">У вас пока нет проектов</p>
                <a href="/contacts" className="inline-block bg-gold text-dark-primary px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                  Создать первый проект
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-dark-secondary p-6 rounded-lg border border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(project.status)}
                      <div>
                        <h3 className="text-white font-medium">
                          {project.package_type === 'individual' ? 'Индивидуальный проект' :
                           project.package_type === 'start' ? 'Пакет Старт' :
                           project.package_type === 'main' ? 'Пакет Основной' : 'Пакет Расширенный'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Создан {new Date(project.created_at).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                      project.status === 'in_progress' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {getStatusText(project.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-dark-primary p-8 rounded-xl border border-gold/20">
            <h2 className="text-2xl font-bold text-white mb-4">Информация профиля</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Имя</p>
                <p className="text-white">{user?.name || 'Не указано'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Телефон</p>
                <p className="text-white">{user?.phone || 'Не указано'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;