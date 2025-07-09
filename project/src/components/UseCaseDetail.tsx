import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buildStrapiImageUrl } from '../config/api';

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

interface HomePageData {
  data: {
    id: number;
    documentId: string;
    section_use_cases: {
      id: number;
      titre_section: string;
      description_section: string;
      liste_use_cases: UseCaseItem[];
    };
  };
}

const UseCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [useCase, setUseCase] = useState<UseCaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUseCaseDetail = async () => {
      if (!id) {
        setError('ID du use case manquant');
        setLoading(false);
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(
          `${baseUrl}/api/home-page?populate[section_use_cases][populate][liste_use_cases][populate]=*&filters[section_use_cases][liste_use_cases][id][$eq]=${id}`
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const data: HomePageData = await response.json();
        
        if (data.data.section_use_cases?.liste_use_cases) {
          const foundUseCase = data.data.section_use_cases.liste_use_cases.find(
            uc => uc.id === parseInt(id)
          );
          
          if (foundUseCase) {
            setUseCase(foundUseCase);
          } else {
            setError('Use case non trouvé');
          }
        } else {
          setError('Aucun use case trouvé');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchUseCaseDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 rounded w-32 mb-8"></div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-slate-300 rounded-lg mr-6"></div>
                <div className="h-10 bg-slate-300 rounded w-64"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-300 rounded w-full"></div>
                <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                <div className="h-4 bg-slate-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !useCase) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Retour
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 text-xl mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Use case non trouvé</h1>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Retour aux use cases
        </button>

        {/* Contenu principal */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                <img 
                  src={buildStrapiImageUrl(useCase.icone.url)}
                  alt={useCase.icone.alternativeText || useCase.icone.name || 'Icône'}
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                  onError={(e) => {
                    console.error('Erreur de chargement de l\'icône:', useCase.icone.url);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {useCase.title_item}
                </h1>
                <p className="text-green-100 text-lg">
                  Solution d'intelligence artificielle
                </p>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description principale */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Description
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {useCase.description}
                </p>

                {/* Fonctionnalités (exemple) */}
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Fonctionnalités clés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-slate-600">Intelligence artificielle avancée</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-slate-600">Interface intuitive</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-slate-600">Intégration facile</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-slate-600">Support 24/7</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Informations
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-slate-500 block">ID</span>
                      <span className="text-slate-800 font-medium">#{useCase.id}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-500 block">Catégorie</span>
                      <span className="text-slate-800 font-medium">Intelligence Artificielle</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-500 block">Statut</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Disponible
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        if (useCase.bouton_lien) {
                          window.location.href = useCase.bouton_lien;
                        } else {
                          console.log('Aucun lien défini pour ce use case');
                        }
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      {useCase.bouton_texte}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseDetail;