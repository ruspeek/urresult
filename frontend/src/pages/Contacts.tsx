import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Contacts: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: location.state?.package || ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', service: '' });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gold">Свяжитесь с нами</span>
          </h1>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Начните с бесплатного разбора</h2>

              <div className="space-y-6 mb-8">
                <a href="https://t.me/resultlegal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-dark-primary rounded-xl border border-gold/20 hover:border-gold transition-all">
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telegram</p>
                    <p className="text-white font-medium">@resultlegal</p>
                  </div>
                </a>

                <a href="mailto:legalresult1@gmail.com" className="flex items-center gap-4 p-4 bg-dark-primary rounded-xl border border-gold/20 hover:border-gold transition-all">
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">legalresult1@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="bg-dark-primary p-6 rounded-xl border border-gold/20">
                <h3 className="text-xl font-bold text-white mb-4">Почему стоит написать сейчас?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>Ответ в течение 30 минут</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>Бесплатный разбор вашего сайта</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>Без продаж и давления</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-dark-primary p-8 rounded-xl border border-gold/20">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-gold focus:outline-none text-white"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-gold focus:outline-none text-white"
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-gold focus:outline-none text-white"
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Интересующая услуга</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-gold focus:outline-none text-white"
                    >
                      <option value="">Выберите пакет</option>
                      <option value="individual">Индивидуальная разработка</option>
                      <option value="start">Старт (от 50 000 ₽)</option>
                      <option value="main">Основной (85 000 ₽)</option>
                      <option value="extended">Расширенный (110 000 ₽)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Сообщение *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-700 rounded-lg focus:border-gold focus:outline-none text-white resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-gold to-yellow-600 text-dark-primary py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-gold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? 'Отправка...' : (
                      <>
                        <Send className="w-5 h-5" />
                        Отправить заявку
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;