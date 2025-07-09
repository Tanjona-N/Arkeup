import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-slate-300 mb-4">
              Arkeup est une ESN spécialisée en intelligence artificielle, accompagnant les entreprises dans leur transformation numérique.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 5.16c-.406.95-1.072 1.787-1.855 2.46.018.31.018.62.018.93 0 9.46-7.246 20.36-20.36 20.36-4.04 0-7.8-1.177-10.96-3.2.587.067 1.14.067 1.747.067 3.386 0 6.5-1.148 8.994-3.086-3.17-.06-5.843-2.14-6.757-5.01.45.067.898.103 1.347.103.645 0 1.28-.09 1.878-.25-3.32-.667-5.825-3.586-5.825-7.09v-.092c.978.542 2.095.865 3.28.904-1.947-1.297-3.225-3.512-3.225-6.023 0-1.33.356-2.57.978-3.638 3.56 4.354 8.89 7.207 14.88 7.51-.12-.54-.17-1.1-.17-1.66 0-4.01 3.25-7.27 7.27-7.27 2.11 0 4 .89 5.33 2.3 1.67-.33 3.24-.95 4.65-1.8-.54 1.7-1.7 3.12-3.19 4.03 1.48-.17 2.9-.56 4.21-1.13-.98 1.46-2.22 2.74-3.65 3.77z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.97 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.17 20.42H3.58V9.01h3.59v11.41zm-1.8-12.96c-1.15 0-2.07-.93-2.07-2.07 0-1.14.92-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07 0 1.14-.93 2.07-2.07 2.07zm16.06 12.96h-3.58v-5.55c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.97v5.64H9.25V9.01h3.44v1.57h.05c.48-.91 1.65-1.87 3.4-1.87 3.64 0 4.31 2.39 4.31 5.5v6.21z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.11 0-.612.492-1.109 1.1-1.109.608 0 1.1.497 1.1 1.109 0 .614-.493 1.11-1.1 1.11zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Machine Learning</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Computer Vision</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Natural Language Processing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Data Engineering</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">IA Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Études de cas</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Livres blancs</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Webinaires</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-slate-300">123 Avenue de l'Innovation, 75000 Paris</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-slate-300">contact@arkeup.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-slate-300">+33 1 23 45 67 89</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-slate-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
                />
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Arkeup. Tous droits réservés.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Mentions légales
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                Politique de confidentialité
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;