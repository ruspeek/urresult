import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Shield, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark-primary border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-gold" />
            <span className="text-xl font-bold text-white">ЮрРезультат</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-gold transition-colors">Главная</Link>
            <Link to="/services" className="text-gray-300 hover:text-gold transition-colors">Услуги</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-gold transition-colors">Портфолио</Link>
            <Link to="/contacts" className="text-gray-300 hover:text-gold transition-colors">Контакты</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors">
                  <User className="w-4 h-4" />
                  Кабинет
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-gold transition-colors">Вход</Link>
                <Link to="/register" className="bg-gold text-dark-primary px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                  Регистрация
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-gold transition-colors">Главная</Link>
            <Link to="/services" className="block text-gray-300 hover:text-gold transition-colors">Услуги</Link>
            <Link to="/portfolio" className="block text-gray-300 hover:text-gold transition-colors">Портфолио</Link>
            <Link to="/contacts" className="block text-gray-300 hover:text-gold transition-colors">Контакты</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-300 hover:text-gold transition-colors">Кабинет</Link>
                <button onClick={handleLogout} className="block text-gray-300 hover:text-red-500 transition-colors">
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-300 hover:text-gold transition-colors">Вход</Link>
                <Link to="/register" className="block text-gold font-medium">Регистрация</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;