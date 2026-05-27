import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Target, Shield, Clock, DollarSign, MessageCircle } from 'lucide-react';

const Services: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      name: 'СТАРТ',
      price: 'от 50 000 ₽',
      subtitle: 'Первые клиенты',
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
      name: 'ОСНОВНОЙ',
      price: '85 000 ₽',
      subtitle: 'Рабочий режим',
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
      name: 'РАСШИРЕННЫЙ',
      price: '110 000 ₽',
      subtitle: 'Сайт + чат-бот',
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
    <div>
      <section className="py-20 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            <span className="text-gold">Индивидуальная услуга</span>
          </h1>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-300 mb-6">
              Создадим сайт, идеально подходящий для вашей практики. Это не шаблон, а полностью кастомное решение,
              разработанное с учетом уникальных потребностей вашего бизнеса.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20 text-center">
              <Target className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Глубокий анализ</h3>
              <p className="text-gray-400">Изучаем вашу специфику и целевую аудиторию</p>
            </div>

            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20 text-center">
              <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Уникальная структура</h3>
              <p className="text-gray-400">Разрабатываем логику под вашу специализацию</p>
            </div>

            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20 text-center">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Продающие тексты</h3>
              <p className="text-gray-400">Пишем тексты, работающие со страхами клиентов</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-white">Прозрачные пакеты.</span>
              <br />
              <span className="text-gold">Без скрытых платежей.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-dark-primary rounded-xl p-8 border-2 transition-all transform hover:scale-105 ${
                  pkg.popular ? 'border-gold shadow-lg shadow-gold/20' : 'border-gray-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-dark-primary px-4 py-1 rounded-full font-bold text-sm">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gold text-4xl font-bold mb-2">{pkg.price}</p>
                  <p className="text-gray-400">{pkg.subtitle}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contacts"
                  state={{ package: pkg.name }}
                  className={`block w-full py-3 rounded-lg font-bold text-center transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-gold to-yellow-600 text-dark-primary hover:from-yellow-400 hover:to-gold'
                      : 'border-2 border-gold text-gold hover:bg-gold hover:text-dark-primary'
                  }`}
                >
                  Заказать
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-white">Три причины начать</span>
            <br />
            <span className="text-gold">работать с нами сегодня.</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-gold">
              <div className="flex items-start gap-4">
                <div className="bg-gold text-dark-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ваши конкуренты уже онлайн</h3>
                  <p className="text-gray-400">Каждый день без рабочего сайта — это заявки, которые уходят к другому юристу. Рынок БФЛ растёт, и промедление стоит денег.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Правильный сайт = стабильный поток</h3>
                  <p className="text-gray-400">Лендинг с верной структурой и текстами приносит заявки без постоянных затрат на рекламу. Это актив, а не расход.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Мы берём всё на себя</h3>
                  <p className="text-gray-400">Вы занимаетесь делами клиентов. Мы занимаемся сайтом. Никакой технической рутины, никаких переплат, никаких сюрпризов.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;