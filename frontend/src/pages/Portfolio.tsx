import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      name: 'Чистый Лист',
      specialization: 'Банкротство физических лиц · Москва',
      features: [
        'Продающая структура под БФЛ',
        'Тексты под страхи клиента',
        'Форма заявки в Telegram',
        'Полная мобильная адаптация'
      ],
      url: 'https://chistiy-list.netlify.app'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Портфолио</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Каждый сайт сделан под конкретную специализацию
          </p>
        </div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card gradient-border animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center mb-6">
                    <span className="text-gray-500">Скриншот сайта</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-yellow-500 mb-2">{project.name}</h3>
                  <p className="text-gray-400 mb-6">{project.specialization}</p>

                  <ul className="space-y-3 mb-8">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2"
                  >
                    Посмотреть сайт <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 card gradient-gold-red p-12 animate-glow">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Хотите такой же сайт?
            </h2>
            <p className="text-xl text-gray-800 mb-8 font-semibold">
              Обсудим ваш проект и создадим эффективный сайт
            </p>
            <a href="/contacts" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform inline-block">
              Заказать сайт →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;