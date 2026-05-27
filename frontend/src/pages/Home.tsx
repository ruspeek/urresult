import React from 'react';
import { Shield, Clock, DollarSign, ArrowRight, TrendingUp, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="section text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-gold">
              Ваш сайт не приносит<br />заявок?
            </h1>
            <p className="text-3xl md:text-4xl font-bold mb-8 text-gradient-red">
              Мы это исправим.
            </p>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Создаем сайты для юристов по банкротству, которые работают 24/7
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/contacts">
                <button className="btn-gold flex items-center gap-2">
                  Бесплатный разбор <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-red">
                  Наши услуги
                </button>
              </Link>
            </div>
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <Shield className="icon-gold w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gold mb-2">Только юристы БФЛ</h3>
              <p className="text-gray-400">Глубокое знание специфики</p>
            </div>
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Clock className="icon-red w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-500 mb-2">5-7 дней</h3>
              <p className="text-gray-400">Быстрый запуск</p>
            </div>
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <DollarSign className="icon-gold w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gold mb-2">Фикс. цена</h3>
              <p className="text-gray-400">Без скрытых платежей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="section">
        <div className="divider" />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
          Почему выбирают нас
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card text-center animate-fadeInUp">
            <TrendingUp className="icon-red w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-500 mb-2">+300% заявок</h3>
            <p className="text-sm text-gray-400">В среднем получают наши клиенты</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <Award className="icon-gold w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gold mb-2">50+ проектов</h3>
            <p className="text-sm text-gray-400">Успешно реализовано</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Zap className="icon-red w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-500 mb-2">Мгновенно</h3>
            <p className="text-sm text-gray-400">Заявки в Telegram</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Shield className="icon-gold w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gold mb-2">Гарантия</h3>
            <p className="text-sm text-gray-400">Работаем по договору</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center py-20">
        <div className="card gradient-gold-red p-12 animate-glow">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Начните получать заявки уже сегодня
          </h2>
          <p className="text-xl text-gray-800 mb-8 font-semibold">
            Бесплатный разбор вашего сайта за 30 минут
          </p>
          <Link to="/contacts">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
              Получить разбор →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;