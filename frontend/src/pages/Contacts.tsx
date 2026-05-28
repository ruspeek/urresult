import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
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
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="section">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gradient-gold">Контакты</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Контактная информация */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Контактная информация</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500/10 p-3 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Telegram</h3>
                    <a href="https://t.me/resultlegal" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      @resultlegal
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-500/10 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <a href="mailto:legalresult1@gmail.com" className="text-gray-400 hover:text-yellow-500 transition-colors">
                      legalresult1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500/10 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Время ответа</h3>
                    <p className="text-gray-400">Ответ в течение 30 минут</p>
                    <p className="text-gray-500 text-sm">Пн-Вс: 9:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Преимущества */}
            <div className="card gradient-border">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Почему стоит написать нам</h3>
              <ul className="space-y-3">
                {[
                  'Бесплатный разбор сайта',
                  'Без продаж и давления',
                  'Конкретные рекомендации',
                  'Опыт 50+ проектов'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Форма */}
          <div className="card">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Отправить заявку</h2>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-gray-400">Мы свяжемся с вами в течение 30 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Сообщение *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    placeholder="Расскажите о вашем проекте"
                  />
                </div>

                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                  Отправить <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="card gradient-gold-red p-12 animate-glow">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Пока вы думаете — ваш конкурент получает вашу заявку
            </h2>
            <p className="text-xl text-gray-800 mb-8 font-semibold">
              Начните с бесплатного разбора вашего сайта
            </p>
            <a href="https://t.me/resultlegal" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform inline-block">
              Написать в Telegram →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;