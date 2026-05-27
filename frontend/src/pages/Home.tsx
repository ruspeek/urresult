import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, DollarSign, AlertTriangle, Smartphone, FileText, Zap, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gold">Ваш сайт не приносит заявок?</span>
            <br />
            <span className="text-white">Мы это исправим.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            ЮрРезультат — агентство сайтов, созданное специально для юристов по банкротству
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-dark-secondary px-6 py-3 rounded-lg border border-gold/30">
              <Shield className="w-6 h-6 text-gold" />
              <span className="text-white font-medium">Только юристы БФЛ</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-secondary px-6 py-3 rounded-lg border border-gold/30">
              <Clock className="w-6 h-6 text-gold" />
              <span className="text-white font-medium">5-7 дней</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-secondary px-6 py-3 rounded-lg border border-gold/30">
              <DollarSign className="w-6 h-6 text-gold" />
              <span className="text-white font-medium">Фикс. цена</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacts"
              className="bg-gradient-to-r from-gold to-yellow-600 text-dark-primary px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-gold transition-all transform hover:scale-105 shadow-lg shadow-gold/25"
            >
              Получить бесплатный разбор
            </Link>
            <Link
              to="/services"
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold hover:text-dark-primary transition-all"
            >
              Наши услуги
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gold">Почему сайты юристов</span>
            <br />
            <span className="text-white">не приносят звонков?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Клиент напуган — не доверяет</h3>
                  <p className="text-gray-400">Человек в долгах ищет защиты, а не красоту. Сайт должен снимать страхи, а не пугать сложными терминами.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-gold">
              <div className="flex items-start gap-4">
                <Smartphone className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">80% заходят с телефона</h3>
                  <p className="text-gray-400">Большинство сайтов юристов не адаптированы под мобильные. Клиент уходит к конкуренту за 5 секунд.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-gold">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Тексты написаны для юристов</h3>
                  <p className="text-gray-400">"Процедура несостоятельности" вместо ответа на вопрос: "Заберут ли квартиру?" — клиент не понимает и не звонит.</p>
                </div>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Нет призыва к действию</h3>
                  <p className="text-gray-400">Нет формы заявки, нет кнопки, нет звонка. Деньги на рекламу сгорают — сайт не продаёт.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            <span className="text-white">Сайт — это ваш лучший продавец,</span>
            <br />
            <span className="text-gold">который работает 24 часа в сутки.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-3">Смысловой копирайтинг</h3>
              <p className="text-gray-300">Тексты снимают страхи клиента и закрывают возражения до первого звонка</p>
            </div>

            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-3">Дизайн под доверие</h3>
              <p className="text-gray-300">Строгий корпоративный стиль — клиент чувствует: здесь ему помогут</p>
            </div>

            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-3">Мобильная адаптация</h3>
              <p className="text-gray-300">Идеально работает на смартфоне — откуда приходит 80% трафика</p>
            </div>

            <div className="bg-dark-secondary p-8 rounded-xl border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-3">Форма заявки в Telegram</h3>
              <p className="text-gray-300">Клиент нажимает кнопку — вы получаете уведомление мгновенно</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gold">4 шага</span>
            <span className="text-white"> от первого контакта до сайта</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { num: '01', title: 'Бесплатный разбор', desc: 'Анализируем ваш текущий сайт, находим причины потери заявок. Вы получаете конкретный список проблем — бесплатно, без обязательств.' },
              { num: '02', title: 'Структура и тексты', desc: 'Прорабатываем логику лендинга под вашу специализацию. Пишем тексты, которые снимают страхи клиента и ведут к заявке.' },
              { num: '03', title: 'Разработка', desc: 'Создаём быстрый адаптивный сайт. Подключаем форму заявки с отправкой прямо в ваш Telegram или Email.' },
              { num: '04', title: 'Сдача за 5-7 дней', desc: 'Передаём готовый сайт. Подключаем Яндекс Метрику. Один раунд правок включён — вы точно останетесь довольны.' }
            ].map((step, index) => (
              <div key={index} className="bg-dark-primary p-8 rounded-xl border border-gold/20 flex gap-6 items-start">
                <div className="text-4xl font-bold text-gold flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">ЮрРезультат vs обычные студии —</span>
            <br />
            <span className="text-gold">разница очевидна.</span>
          </h2>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-4 px-4 text-gold font-bold">Параметр</th>
                  <th className="text-center py-4 px-4 text-gold font-bold">ЮрРезультат</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-bold">Другие студии</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Специализация', 'Только юристы БФЛ', 'Любая ниша'],
                  ['Тексты', 'Под страхи клиента', 'Шаблонные'],
                  ['Срок выполнения', '5-7 рабочих дней', '3-6 недель'],
                  ['Ценообразование', 'Фиксированная цена', 'Плавающая смета'],
                  ['Фокус результата', 'Заявки в Telegram', 'Красивый дизайн'],
                  ['Знание ниши', 'Глубокое', 'Поверхностное']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-dark-secondary transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{row[0]}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-2 text-gold">
                        <CheckCircle className="w-5 h-5" />
                        {row[1]}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark-secondary to-dark-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            <span className="text-white">Пока вы думаете —</span>
            <br />
            <span className="text-gold">ваш конкурент получает вашу заявку.</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Начните с бесплатного разбора вашего сайта. Без продаж, без давления — просто конкретные рекомендации.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://t.me/resultlegal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gold to-yellow-600 text-dark-primary px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-gold transition-all transform hover:scale-105"
            >
              Написать в Telegram
            </a>
            <Link
              to="/contacts"
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold hover:text-dark-primary transition-all"
            >
              Отправить запрос
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span>Без продаж на первом звонке</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span>Бесплатный разбор сайта</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span>Ответ за 30 минут</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;