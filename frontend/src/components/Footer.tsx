import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-secondary border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold text-white">ЮрРезультат</span>
            </div>
            <p className="text-gray-400 text-sm">
              Агентство сайтов для юристов по банкротству физических лиц
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-gold transition-colors">Главная</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-gold transition-colors">Услуги</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-gold transition-colors">Портфолио</Link></li>
              <li><Link to="/contacts" className="text-gray-400 hover:text-gold transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-4 h-4 text-gold" />
                <a href="https://t.me/resultlegal" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  @resultlegal
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:legalresult1@gmail.com" className="hover:text-gold transition-colors">
                  legalresult1@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Режим работы</h3>
            <p className="text-gray-400 text-sm mb-2">Пн-Пт: 9:00 - 20:00</p>
            <p className="text-gray-400 text-sm mb-4">Сб-Вс: 10:00 - 18:00</p>
            <p className="text-gold text-sm">Ответ в течение 30 минут</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 ЮрРезультат. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;