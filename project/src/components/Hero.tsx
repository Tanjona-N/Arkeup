import React, { useEffect, useRef, useState  } from 'react';
import NeuralNetworkBackground from './NeuralNetworkBackground';
import { NotepadText } from 'lucide-react';
 interface BannerData {
    banner_title: string;
    banner_sub_title: string;
    banner_description: string;
  }
  interface HomePageData {
    data: {
      Banner:BannerData;
    };
  }

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  //Titre banner
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Récupération des données depuis Strapi
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/home-page?populate=*`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data: HomePageData = await response.json();
        setBannerData(data.data.Banner);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);


   useEffect(() => {
    if (!bannerData) return;

    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    
    if (title) title.classList.add('animate-fadeInUp');
    
    setTimeout(() => {
      if (subtitle) subtitle.classList.add('animate-fadeInUp');
    }, 200);
    
    setTimeout(() => {
      if (cta) cta.classList.add('animate-fadeInUp');
    }, 400);
  }, [bannerData]);

  if(loading) {
      return (
      <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 relative overflow-hidden bg-slate-50/80">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-300 rounded mb-4"></div>
              <div className="h-6 bg-slate-300 rounded mb-6"></div>
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-slate-300 rounded-full"></div>
                <div className="h-10 w-40 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 relative overflow-hidden bg-slate-50/80">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
            <p className="text-red-500">Erreur : {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 relative overflow-hidden bg-slate-50/80">
      <NeuralNetworkBackground />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-slate-800 leading-tight opacity-0 transition-opacity duration-1000 text-left"
          >
             {bannerData?.banner_title}
            <span className="block text-green-500 mt-2">{bannerData?.banner_sub_title}</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 opacity-0 transition-opacity duration-1000 leading-relaxed italic text-left"
          >
           {bannerData?.banner_description}
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-start gap-3 opacity-0 transition-opacity duration-1000"
          >
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full transition-all transform hover:scale-105 font-medium text-base w-full sm:w-auto">
              Mon premier pas
            </button>
            <button className="bg-transparent border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-2.5 rounded-full transition-all transform hover:scale-105 font-medium text-base w-full sm:w-auto">
              Je veux en savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;