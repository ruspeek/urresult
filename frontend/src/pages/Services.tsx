import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState('main');

  const packages = [
    {
      id: 'start',
      name: 'Старт',
      price: '50 000 ₽',
      description: 'Первые клиенты',
      features: [
        'Лендинг под ключ',
        'Тексты под БФЛ',
        'Форма в Telegram',
        'Мобильная версия',
        '1 раунд правок'
      ],
      popular: false
    },
    {
      id: 'main',
      name: 'Основной',
      price: '85 000 ₽',
      description: 'Рабочий режим',
      features: [
        'Всё из Старта',
        'Яндекс Метрика',
        'Приоритетная сдача',
        'Бесплатный аудит',
        'Поддержка'
      ],
      popular: true
    },
    {
      id: 'extended',
      name: 'Расширенный',
      price: '110 000 ₽',
      description: 'Сайт + чат-бот',
      features: [
        'Всё из Основного',
        'Чат-бот для заявок',
        'Бот 24/7 в Telegram',
        'Абон. поддержка',
        '2 раунда правок'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Наши услуги</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Прозрачные пакеты. Без скрытых платежей.
          </p>
        </div>

        {/* Пакеты */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`card relative ${pkg.popular ? 'border-yellow-500 border-2' : ''} animate-fadeInUp`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold-red text-gray-900 px-6 py-2 rounded-full font-bold text-sm">
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-yellow-500 mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-4">{pkg.description}</p>
                <p className="text-4xl font-bold text-gradient-red">{pkg.price}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contacts">
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                  pkg.popular
                    ? 'btn-gold'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}>
                  Заказать
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Индивидуальная услуга */}
        <div className="card gradient-border p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gradient-gold">
                Индивидуальная услуга
              </h2>
              <p className="text-gray-300 mb-6">
                Создадим сайт, идеально подходящий для вашей практики. Не шаблон, а полностью кастомное решение.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Глубокий анализ вашей ниши',
                  'Уникальная структура и дизайн',
                  'Продающие тексты',
                  'Интеграция с CRM',
                  'Максимальная конверсия'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contacts">
                <button className="btn-red flex items-center gap-2">
                  Обсудить проект <ArrowRight size={20} />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center p-6">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <p className="font-bold text-yellow-500">Быстро</p>
                <p className="text-sm text-gray-400">7-14 дней</p>
              </div>
              <div className="card text-center p-6">
                <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="font-bold text-red-500">Качественно</p>
                <p className="text-sm text-gray-400">Гарантия</p>
              </div>
              <div className="card text-center p-6">
                <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <p className="font-bold text-yellow-500">Поддержка</p>
                <p className="text-sm text-gray-400">24/7</p>
              </div>
              <div className="card text-center p-6">
                <Award className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="font-bold text-red-500">Опыт</p>
                <p className="text-sm text-gray-400">50+ проектов</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card gradient-gold-red p-12 animate-glow">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Готовы начать?
            </h2>
            <p className="text-xl text-gray-800 mb-8 font-semibold">
              Оставьте заявку и получите бесплатный разбор
            </p>
            <Link to="/contacts">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                Оставить заявку →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;