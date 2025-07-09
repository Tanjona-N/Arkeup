import React, { useEffect, useRef, useState } from 'react';

interface LogoFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface Logo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: LogoFormat;
    small?: LogoFormat;
    medium?: LogoFormat;
    large?: LogoFormat;
  };
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

interface BlockPartenaires {
  id: number;
  titre_partenaires: string;
  logos: Logo[];
}

interface HomePageData {
  data: {
    id: number;
    documentId: string;
    Banner: any;
    block_partenaires: BlockPartenaires[];
  };
}

const References = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const [partnersData, setPartnersData] = useState<BlockPartenaires | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données depuis Strapi
  useEffect(() => {
    const fetchPartnersData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/home-page?populate[Banner]=*&populate[block_partenaires][populate]=*');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data: HomePageData = await response.json();
        
        // Récupérer le premier bloc partenaires
        if (data.data.block_partenaires && data.data.block_partenaires.length > 0) {
          setPartnersData(data.data.block_partenaires[0]);
        }
        
        console.log('Données partenaires:', data.data.block_partenaires[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnersData();
  }, []);

  // Animation du slider
  useEffect(() => {
    if (!partnersData || !partnersData.logos || partnersData.logos.length === 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const clone = slider.cloneNode(true);
    slider.parentNode?.appendChild(clone);

    let animationFrameId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      if (!slider.parentNode) return;
      
      position -= speed;
      
      const firstSlider = slider.parentNode.children[0] as HTMLElement;
      const secondSlider = slider.parentNode.children[1] as HTMLElement;
      
      firstSlider.style.transform = `translateX(${position}px)`;
      secondSlider.style.transform = `translateX(${position}px)`;
      
      if (Math.abs(position) >= firstSlider.offsetWidth) {
        position = 0;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [partnersData]);

  if (loading) {
    return (
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-300 rounded w-64 mx-auto mb-8"></div>
            <div className="flex justify-center gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-40 h-24 bg-slate-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-8">
          <p className="text-red-500 text-center">Erreur : {error}</p>
        </div>
      </section>
    );
  }

  if (!partnersData || !partnersData.logos || partnersData.logos.length === 0) {
    return (
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
            {partnersData?.titre_partenaires || 'Ils nous font confiance '}
          </h2>
          <p className="text-center text-slate-500 mt-4">Aucun logo disponible</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          {partnersData.titre_partenaires}
        </h2>
      </div>
      
      <div ref={containerRef} className="w-full overflow-hidden relative">
        <div className="flex relative" style={{ width: '200%' }}>
          <div ref={sliderRef} className="flex items-center justify-around min-w-full">
            {partnersData.logos.map((logo) => (
              <div 
                key={`logo-${logo.id}`} 
                className="mx-6"
              >
                <div className="w-40 h-24 bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-110 duration-300">
                  
                  <img 
                    src={`http://localhost:1337${logo.url}`}
                    alt={logo.alternativeText || logo.name || 'Company logo'}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      console.error('Erreur de chargement de l\'image:', logo.url);
                      // Optionnel : remplacer par une image par défaut
                      // e.currentTarget.src = '/path/to/default-logo.png';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
