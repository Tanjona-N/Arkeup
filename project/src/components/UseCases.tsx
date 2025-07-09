import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildStrapiImageUrl, getAllUseCasesUrl } from '../config/api';

interface IconeFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface Icone {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: IconeFormat;
    small?: IconeFormat;
    medium?: IconeFormat;
    large?: IconeFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface UseCaseItem {
  id: number;
  title_item: string;
  description: string;
  bouton_texte: string;
  bouton_lien: string | null;
  icone: Icone;
}

interface SectionUseCases {
  id: number;
  titre_section: string;
  description_section: string;
  liste_use_cases: UseCaseItem[];
}

interface HomePageData {
  data: {
    id: number;
    documentId: string;
    Banner: any;
    block_partenaires: any[];
    section_use_cases: SectionUseCases;
  };
}

const UseCases = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [useCasesData, setUseCasesData] = useState<SectionUseCases | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données depuis Strapi
  useEffect(() => {
    const fetchUseCasesData = async () => {
      try {
        const response = await fetch(getAllUseCasesUrl());
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data: HomePageData = await response.json();
        
        if (data.data.section_use_cases) {
          setUseCasesData(data.data.section_use_cases);
        }
        
        console.log('Données Use Cases:', data.data.section_use_cases);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchUseCasesData();
  }, []);

  // Animation d'apparition des cartes
  useEffect(() => {
    if (!useCasesData || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.case-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fadeInUp');
                card.classList.remove('opacity-0');
                card.classList.remove('translate-y-10');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [useCasesData, loading]);

  // Couleurs pour les cartes (fallback si pas de couleur définie)
  const colors = [
    'bg-blue-50 text-blue-500 border-blue-100',
    'bg-green-50 text-green-500 border-green-100',
    'bg-teal-50 text-teal-500 border-teal-100',
    'bg-purple-50 text-purple-500 border-purple-100',
    'bg-orange-50 text-orange-500 border-orange-100'
  ];

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-slate-50" id="use-cases">
        <div className="container mx-auto px-4 md:px-8">
          <div className="animate-pulse">
            <div className="text-center mb-16">
              <div className="h-10 bg-slate-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-300 rounded w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-slate-300 rounded mr-4"></div>
                    <div className="h-6 bg-slate-300 rounded flex-1"></div>
                  </div>
                  <div className="h-20 bg-slate-300 rounded mb-4"></div>
                  <div className="h-6 bg-slate-300 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-slate-50" id="use-cases">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <p className="text-red-500">Erreur : {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!useCasesData || !useCasesData.liste_use_cases || useCasesData.liste_use_cases.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-slate-50" id="use-cases">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              {useCasesData?.titre_section || 'Nos Use Cases'}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {useCasesData?.description_section || 'Aucun use case disponible'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-slate-50" id="use-cases">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            {useCasesData.titre_section}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {useCasesData.description_section}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCasesData.liste_use_cases.map((useCase, index) => (
            <Link
              key={useCase.id}
              to={`/use-case/${useCase.id}`}
              className={`case-card bg-white rounded-xl shadow-md p-6 border-l-4 ${colors[index % colors.length]} transition-all duration-500 opacity-0 translate-y-10 hover:shadow-lg block`}
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <img
                    src={buildStrapiImageUrl(useCase.icone.url)}
                    alt={useCase.icone.alternativeText || useCase.icone.name || 'Icône'}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      console.error('Erreur de chargement de l\'icône:', useCase.icone.url);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{useCase.title_item}</h3>
              </div>
              <p className="text-slate-600 mb-4">{useCase.description}</p>
              <span className="text-green-500 hover:text-green-600 font-medium inline-flex items-center transition-colors duration-200">
                {useCase.bouton_texte}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          ))}
          
          {/* Carte "Tous nos use cases" */}
          <div className="case-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 opacity-0 translate-y-10 hover:shadow-lg group">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-green-500 transition-colors">
                Tous nos use cases
              </h3>
              <p className="text-slate-600">
                Explorez notre catalogue complet de solutions d'intelligence artificielle et trouvez celle qui correspond à vos besoins.
              </p>
              <div className="mt-4">
                <a href="#" className="text-green-500 hover:text-green-600 font-medium inline-flex items-center">
                  Découvrir
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
