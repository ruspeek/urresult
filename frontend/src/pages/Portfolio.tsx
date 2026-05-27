import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'Чистый лист',
      category: 'Банкротство физических лиц · Москва',
      features: [
        'Продающая структура под БФЛ',
        'Тексты под страхи клиента',
        'Форма заявки в Telegram',
        'Полная мобильная адаптация'
      ],
      url: 'https://chistiy-list.netlify.app',
      image: '/portfolio/clean-sheet.jpg'
    }
  ];

  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            <span className="text-gold">Примеры наших сайтов</span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-16">
            Каждый сделан под конкретную специализацию
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-dark-primary rounded-xl overflow-hidden border border-gold/20 hover:border-gold transition-all transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-gold/20 to-dark-secondary flex items-center justify-center">
                  <span className="text-6xl">🏛️</span>
                </div>

                <div className="p-6">
                  <div className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium mb-3">
                    ГОТОВО
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.category}</p>

                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gold/10 border border-gold text-gold rounded-lg font-medium hover:bg-gold hover:text-dark-primary transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Посмотреть сайт
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;