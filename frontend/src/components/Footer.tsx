import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, Clock, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="section">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* О компании */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-bold text-gradient-gold">ЮрРезультат</span>
            </div>
            <p className="text-gray-400 text-sm">
              Агентство сайтов для юристов по банкротству физических лиц
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-bold text-yellow-500 mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link">Главная</Link></li>
              <li><Link to="/services" className="footer-link">Услуги</Link></li>
              <li><Link to="/portfolio" className="footer-link">Портфолио</Link></li>
              <li><Link to="/contacts" className="footer-link">Контакты</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-bold text-yellow-500 mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-red-500" />
                <a href="mailto:legalresult1@gmail.com" className="footer-link">legalresult1@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-red-500" />
                <a href="https://t.me/resultlegal" className="footer-link">@resultlegal</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-red-500" />
                <span>Москва, Россия</span>
              </li>
            </ul>
          </div>

          {/* Режим работы */}
          <div>
            <h4 className="text-lg font-bold text-yellow-500 mb-4">Режим работы</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-yellow-500" />
                <span>Пн-Пт: 9:00 - 20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-yellow-500" />
                <span>Сб-Вс: 10:00 - 18:00</span>
              </li>
              <li className="text-red-400 font-semibold">Ответ в течение 30 минут</li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-yellow-500/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ЮрРезультат. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="footer-link">Политика конфиденциальности</Link>
              <Link to="/terms" className="footer-link">Условия использования</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;