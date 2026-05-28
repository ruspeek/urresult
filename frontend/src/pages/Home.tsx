import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, DollarSign, ArrowRight, TrendingUp, Award, Zap, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фоновые эффекты */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-red-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="section text-center relative z-10">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-gold">
              Ваш сайт не приносит<br />заявок?
            </h1>
            <p className="text-3xl md:text-4xl font-bold mb-8 text-gradient-red">
              Мы это исправим.
            </p>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Создаем сайты для юристов по банкротству, которые работают 24/7 и приносят заявки
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
              <Link to="/contacts">
                <button className="btn-gold flex items-center gap-2 mx-auto">
                  Бесплатный разбор <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-red mx-auto">
                  Наши услуги
                </button>
              </Link>
            </div>
          </div>

          {/* Преимущества */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-500 mb-2">Только юристы БФЛ</h3>
              <p className="text-gray-400">Глубокое знание специфики банкротства физических лиц</p>
            </div>
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Clock className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-500 mb-2">5-7 дней</h3>
              <p className="text-gray-400">Быстрый запуск готового сайта под ключ</p>
            </div>
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <DollarSign className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-500 mb-2">Фикс. цена</h3>
              <p className="text-gray-400">Без скрытых платежей и сюрпризов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Почему выбирают нас */}
      <section className="section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
            Почему выбирают нас
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы специализируемся только на юристах по банкротству
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card text-center animate-fadeInUp">
            <TrendingUp className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-500 mb-2">+300% заявок</h3>
            <p className="text-sm text-gray-400">В среднем получают наши клиенты</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yellow-500 mb-2">50+ проектов</h3>
            <p className="text-sm text-gray-400">Успешно реализовано</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-500 mb-2">Мгновенно</h3>
            <p className="text-sm text-gray-400">Заявки в Telegram</p>
          </div>
          <div className="card text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Гарантия</h3>
            <p className="text-sm text-gray-400">Работаем по договору</p>
          </div>
        </div>
      </section>

      {/* Что входит */}
      <section className="section">
        <div className="card gradient-border p-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient-gold">
            Что входит в каждый сайт
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Продающая структура под БФЛ',
              'Тексты под страхи клиента',
              'Форма заявки в Telegram',
              'Полная мобильная адаптация',
              'Яндекс Метрика',
              'Бесплатный аудит',
              'Приоритетная сдача',
              'Поддержка'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20">
        <div className="card gradient-gold-red p-12 animate-glow">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
        </div>
      </section>
    </div>
  );
};

export default Home;