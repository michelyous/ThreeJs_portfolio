import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // Track active section
  const { i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Adjust threshold to detect visibility
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { id: 'home', href: '#home', name: 'nav.home' },
    { id: 'about', href: '#about', name: 'nav.about' },
    { id: 'work', href: '#work', name: 'nav.work' },
    { id: 'contact', href: '#contact', name: 'nav.contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* Logo */}
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Michel
          </a>

          {/* Desktop Navigation */}
          <nav className="sm:flex hidden">
            <ul className="nav-ul">
              {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                  <a
                    href={href}
                    className={`nav-li_a ${
                      activeSection === id ? 'font-bold text-white' : 'text-neutral-400'
                    }`}
                  >
                    {i18n.t(name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => changeLanguage('en')}
              className={`text-neutral-400 hover:text-white transition-colors ${
                currentLanguage === 'en' ? 'font-bold text-white' : ''
              }`}
            >
              EN
            </button>
            <span className="text-neutral-400">|</span>
            <button
              onClick={() => changeLanguage('fr')}
              className={`text-neutral-400 hover:text-white transition-colors ${
                currentLanguage === 'fr' ? 'font-bold text-white' : ''
              }`}
            >
              FR
            </button>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
              <li key={id} className="nav-li">
                <a
                  href={href}
                  className={`nav-li_a ${
                    activeSection === id ? 'font-bold text-white' : 'text-neutral-400'
                  }`}
                >
                  {i18n.t(name)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
