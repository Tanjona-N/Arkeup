import React, { useEffect, useState } from 'react';
import { Shield, Target, TrendingUp, Users, Brain, Rocket, Settings, BarChart3, LucideIcon } from 'lucide-react';
import { API_CONFIG, buildStrapiUrl, buildStrapiImageUrl } from '../config/api';

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ImageThumbnail {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
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

interface ExpertiseItem {
  id: number;
  titre: string;
  sous_titre: string;
  description: string;
  icone_type: string | null;
  image_thumbnail: ImageThumbnail;
}

interface SectionExpertiseArkeup {
  id: number;
  titre_section: string;
  description_section: string;
  liste_expertises: ExpertiseItem[];
}

interface SectionDevis {
  id: number;
  titre: string;
  description: string;
}

interface HomePageData {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    section_expertise_arkeup: SectionExpertiseArkeup;
    section_devis: SectionDevis;
  };
  meta: {};
}

const Expertise = () => {
  const [expertiseData, setExpertiseData] = useState<SectionExpertiseArkeup | null>(null);
  const [devisData, setDevisData] = useState<SectionDevis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapping des icônes
  const iconMap: Record<string, LucideIcon> = {
    'target': Target,
    'trending-up': TrendingUp,
    'users': Users,
    'shield': Shield,
    'brain': Brain,
    'rocket': Rocket,
    'settings': Settings,
    'chart-bar': BarChart3,
  };

  // Récupération des données depuis Strapi
  useEffect(() => {
    const fetchExpertiseData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/home-page?populate[section_expertise_arkeup][populate][liste_expertises][populate]=*&populate[section_devis]=*');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data: HomePageData = await response.json();
        
        console.log('Données complètes:', data);
        console.log('Section expertise:', data.data.section_expertise_arkeup);
        console.log('Section devis:', data.data.section_devis);
        
        if (data.data && data.data.section_expertise_arkeup) {
          setExpertiseData(data.data.section_expertise_arkeup);
        } else {
          throw new Error('Section expertise non trouvée dans les données');
        }

        if (data.data && data.data.section_devis) {
          setDevisData(data.data.section_devis);
        }
        
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchExpertiseData();
  }, []);

  // Fonction pour obtenir la meilleure URL d'image
  const getImageUrl = (image: ImageThumbnail): string => {
    const baseUrl = 'http://localhost:1337';
    
    // Priorité: large > medium > small > original
    if (image.formats?.large?.url) {
      return `${baseUrl}${image.formats.large.url}`;
    }
    if (image.formats?.medium?.url) {
      return `${baseUrl}${image.formats.medium.url}`;
    }
    if (image.formats?.small?.url) {
      return `${baseUrl}${image.formats.small.url}`;
    }
    return `${baseUrl}${image.url}`;
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white" id="expertise">
        <div className="container mx-auto px-4 md:px-8">
          <div className="animate-pulse">
            <div className="text-center mb-16">
              <div className="h-10 bg-slate-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-slate-300 rounded w-96 mx-auto"></div>
            </div>
            <div className="space-y-24">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="lg:w-1/2">
                    <div className="h-[400px] bg-slate-300 rounded-2xl"></div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="h-8 bg-slate-300 rounded mb-2 w-3/4"></div>
                    <div className="h-6 bg-slate-300 rounded mb-4 w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-300 rounded"></div>
                      <div className="h-4 bg-slate-300 rounded"></div>
                      <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                    </div>
                  </div>
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
      <section className="py-16 md:py-24 bg-white" id="expertise">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Erreur de chargement</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!expertiseData || !expertiseData.liste_expertises || expertiseData.liste_expertises.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white" id="expertise">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              {expertiseData?.titre_section || "L'expertise Arkeup"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {expertiseData?.description_section || 'Aucune expertise disponible pour le moment.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white" id="expertise">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            {expertiseData.titre_section}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {expertiseData.description_section}
          </p>
        </div>
        
        <div className="space-y-24">
          {expertiseData.liste_expertises.map((area, index) => {
            // Gestion de l'icône avec fallback
            const IconComponent = area.icone_type && iconMap[area.icone_type] 
              ? iconMap[area.icone_type] 
              : Target; // Icône par défaut
            
            return (
              <div 
                key={area.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <div className="lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-105 duration-300 group">
                    <img 
                      src={getImageUrl(area.image_thumbnail)}
                      alt={area.image_thumbnail.alternativeText || area.titre}
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        console.error('Erreur de chargement de l\'image:', getImageUrl(area.image_thumbnail));
                        // Fallback vers une image par défaut
                        e.currentTarget.src = 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute bottom-6 left-6 text-white thematique">
                      <IconComponent className="w-8 h-8 mb-3" />
                      <h3 className="text-xl font-semibold">{area.titre}</h3>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">{area.titre}</h3>
                  <h4 className="text-xl text-green-500 font-medium mb-4">{area.sous_titre}</h4>
                  <p className="text-slate-600 leading-relaxed">{area.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        
        <div className="mt-20 bg-slate-50 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">
              {devisData?.titre || "Prêt à transformer votre entreprise avec l'IA ?"}
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {devisData?.description || "Nos experts sont à votre disposition pour étudier vos besoins et vous proposer une solution adaptée."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 font-medium text-lg w-full sm:w-auto">
              Demander un devis gratuit
            </button>
            <button className="bg-transparent border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-3 rounded-full transition-all transform hover:scale-105 font-medium text-lg w-full sm:w-auto">
              Contacter un expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
