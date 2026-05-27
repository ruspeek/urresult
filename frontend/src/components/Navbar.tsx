import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gradient-gold">ЮрРезультат</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/services" className="nav-link">Услуги</Link>
            <Link to="/portfolio" className="nav-link">Портфолио</Link>
            <Link to="/contacts" className="nav-link">Контакты</Link>
            <Link to="/login" className="nav-link">Вход</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-yellow-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fadeIn">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Главная</Link>
            <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Услуги</Link>
            <Link to="/portfolio" className="nav-link" onClick={() => setIsOpen(false)}>Портфолио</Link>
            <Link to="/contacts" className="nav-link" onClick={() => setIsOpen(false)}>Контакты</Link>
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Вход</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;