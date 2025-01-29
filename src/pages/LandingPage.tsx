import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {saveToFirestore} from './../../saveUSerToFirestore'

const sections = [
  {
    title: "Hi Pay - Smart Payments Made Simple",
    description: "Experience the future of payments with Hi Pay. Our revolutionary platform combines cutting-edge technology with seamless user experience to make digital transactions effortless and secure.",
    image: "https://firebasestorage.googleapis.com/v0/b/billsplit-d206c.appspot.com/o/hipay-assets%2Fwaitlist%20launch.png?alt=media&token=9fd13024-d32f-43d6-91e7-7ffaaaa818b7",
    features: [
      "Instant money transfers",
      "Bill Payments",
      "Airtime Recharge"
    ]
  },
  {
    title: "Pay Anyone, Anywhere",
    description: "Send money to friends, split bills, or pay merchants with just a tap. Hi Pay makes financial transactions as easy as saying hello, with real-time processing and instant confirmations.",
    image: "https://firebasestorage.googleapis.com/v0/b/billsplit-d206c.appspot.com/o/hipay-assets%2Fpayment-01.png?alt=media&token=8f467191-fcfd-442e-b1e2-72f040699b82",
    features: [
      "QR code payments",
      "Group payment splitting",
      "Seamless Transfer between OM and MOMO wallets"
    ]
  },
];

function BetaSignupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateWhatsapp = (number: string) => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    
    // Check if the number is between 10 and 15 digits
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      setWhatsappError('Please enter a valid WhatsApp number (10-15 digits)');
      return false;
    }
    
    setWhatsappError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateWhatsapp(whatsapp)) {
      // // Send the whatsapp message.
    
      saveToFirestore(email,whatsapp)
      // then navigate to the new page witht the details
      navigate('/confirmation',{state:{email:email,number:whatsapp}});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg mx-4 bg-midnight-light/95 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">Join Hi Pay Waitlist</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 bg-midnight border border-white/20 rounded-lg shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="example : example@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-base font-medium text-gray-300 mb-2">
              WhatsApp number
            </label>
            <input
              type="tel"
              id="whatsapp"
              required
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
                validateWhatsapp(e.target.value);
              }}
              className={`block w-full px-4 py-3 bg-midnight border rounded-lg shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-accent ${
                whatsappError ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="example : +237 XXX -XXX- XXX"
            />
            {whatsappError && (
              <p className="mt-2 text-sm text-red-400">{whatsappError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-midnight transition-colors"
          >
            Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const timer = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
      scrollToSection((currentSection + 1) % sections.length);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSection]);

  const scrollToSection = (index: number) => {
    if (sectionsContainerRef.current) {
      const sectionHeight = window.innerHeight;
      sectionsContainerRef.current.style.transform = `translateY(-${index * sectionHeight}px)`;
      setCurrentSection(index);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-dark overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Additional overlay for darker blend */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-midnight-dark via-midnight-dark/95 to-midnight-dark opacity-90" />

      {/* Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-midnight-dark/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent animate-pulse" />
            <p className="text-white font-medium tracking-wide text-base sm:text-lg">
              <span className="text-accent font-semibold">Hi Pay Launch:</span>
              {" "}<span className="hidden sm:inline">Join the waitlist and be the first to try it out</span>
              <span className="inline sm:hidden">Be the first to try</span>
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-accent text-white px-6 py-2 rounded-md hover:bg-accent-dark transition-colors font-medium text-sm sm:text-base"
          >
            Join the waitlist
          </button>
        </div>
      </div>

      {/* Beta Signup Modal */}
      <BetaSignupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Main Content */}
      <div className="relative z-10 h-screen pt-16 sm:pt-0">
        <div 
          ref={sectionsContainerRef}
          className="transition-transform duration-1000 ease-in-out"
        >
          {sections.map((section, index) => (
            <div key={index} className="h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Column - Content */}
                  <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {section.title}
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed">
                      {section.description}
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent flex-shrink-0" />
                          <span className="text-gray-200 text-base sm:text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  <div className="relative order-1 lg:order-2 mb-6 lg:mb-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-dark/90 to-transparent rounded-xl" />
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full rounded-xl shadow-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Navigation */}
        <div className={`fixed ${isMobile ? 'bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row space-x-4' : 'right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4'} z-50`}>
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                currentSection === index ? 'bg-accent' : 'bg-gray-600'
              } hover:bg-accent-light`}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;