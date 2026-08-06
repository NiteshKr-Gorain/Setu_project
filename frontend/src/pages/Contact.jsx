import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    
    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden min-h-screen">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-light/35 to-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-light px-4 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            We'd Love to{' '}
            <span className="bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          <p className="text-slate-655 text-base md:text-lg leading-relaxed">
            Have questions about Setu, feedback on our mentor network, or suggestions for knowledge topics? Reach out to our community support team.
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md flex items-start space-x-5 hover:scale-[1.01] transition-transform duration-300">
              <div className="p-4 bg-brand-light text-brand-primary rounded-2xl">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-extrabold text-slate-900 text-lg">Email Us</h3>
                <p className="text-sm text-slate-500">For general inquiries and feedback</p>
                <a href="mailto:support@setuplatform.org" className="text-sm font-bold text-brand-primary hover:underline block pt-1">
                  support@setuplatform.org
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md flex items-start space-x-5 hover:scale-[1.01] transition-transform duration-300">
              <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-extrabold text-slate-900 text-lg">Call Support</h3>
                <p className="text-sm text-slate-500">Toll-free helpline (Mon - Fri, 9am - 6pm)</p>
                <a href="tel:1800-123-4567" className="text-sm font-bold text-amber-600 hover:underline block pt-1">
                  1800-123-4567 (Toll-free)
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md flex items-start space-x-5 hover:scale-[1.01] transition-transform duration-300">
              <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-extrabold text-slate-900 text-lg">Office Address</h3>
                <p className="text-sm text-slate-500">Come say hello at our main hub</p>
                <p className="text-sm font-semibold text-slate-700 pt-1">
                  102, Innovation & Heritage Block,<br />
                  Central Avenue, Tech District, New Delhi - 110001
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md flex items-start space-x-5 hover:scale-[1.01] transition-transform duration-300">
              <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-extrabold text-slate-900 text-lg">Response Time</h3>
                <p className="text-sm text-slate-500">Average response duration</p>
                <p className="text-sm font-bold text-emerald-600 pt-1">
                  Usually under 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-slate-100 w-full text-left space-y-6">
              
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900">Send Message</h2>
                <p className="text-xs text-slate-400 font-semibold">Fill out the form below and we will get back to you shortly.</p>
              </div>

              {status === 'success' && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold p-4 rounded-2xl flex items-start space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Thank You!</p>
                    <p className="text-xs text-emerald-650 font-normal">Your message has been sent successfully. Our team will contact you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={status === 'loading'}
                    placeholder="John Doe"
                    className={`w-full border-b py-2 text-sm focus:outline-none font-semibold text-slate-800 transition-colors focus:ring-0 ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 font-medium flex items-center space-x-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={status === 'loading'}
                    placeholder="john@example.com"
                    className={`w-full border-b py-2 text-sm focus:outline-none font-semibold text-slate-800 transition-colors focus:ring-0 ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium flex items-center space-x-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={status === 'loading'}
                    placeholder="How can we help you?"
                    className={`w-full border-b py-2 text-sm focus:outline-none font-semibold text-slate-800 transition-colors focus:ring-0 ${
                      errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-500 font-medium flex items-center space-x-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={status === 'loading'}
                    placeholder="Write your details here..."
                    className={`w-full border rounded-2xl p-3 text-sm focus:outline-none font-semibold text-slate-850 transition-colors focus:ring-1 focus:ring-brand-primary ${
                      errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 font-medium flex items-center space-x-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 mt-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-brand-primary/10 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
