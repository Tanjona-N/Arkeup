// Configuration centralisée pour les APIs
export const API_CONFIG = {
  STRAPI: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    ENDPOINTS: {
      HOME_PAGE: '/api/home-page',
      USE_CASES: '/api/liste-use-cases',
      EXPERTISE: '/api/expertises', // Ajout pour les expertises
      CONTACT: '/api/contact',      // Ajout pour le contact
    },
    POPULATE: {
      EXPERTISE_SECTION: 'populate[section_expertise_arkeup][populate][liste_expertises][populate]=*',
      DEVIS_SECTION: 'populate[section_devis]=*',
      USE_CASES_SECTION: 'populate[section_use_cases][populate][liste_use_cases][populate]=*',
      ALL: 'populate=*',
    }
  },
  SUPABASE: {
    URL: import.meta.env.VITE_SUPABASE_URL,
    ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  // Ajout des URLs d'application
  APP: {
    ETECH_URL: import.meta.env.VITE_ETECH_URL || 'https://df.etechconsulting-mg.com',
    ARKEUP_URL: import.meta.env.VITE_ARKEUP_URL || 'https://ai.arkeup.com',
  }
} as const;

// Helper pour construire les URLs Strapi
export const buildStrapiUrl = (endpoint: string, params?: string[]): string => {
  const baseUrl = API_CONFIG.STRAPI.BASE_URL;
  const queryParams = params ? `?${params.join('&')}` : '';
  return `${baseUrl}${endpoint}${queryParams}`;
};

// Helper pour construire les URLs d'images Strapi
export const buildStrapiImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath; // URL absolue
  }
  return `${API_CONFIG.STRAPI.BASE_URL}${imagePath}`;
};

// Helper pour récupérer un use case par ID
export const getUseCaseByIdUrl = (id: number): string => {
  return `${API_CONFIG.STRAPI.BASE_URL}/api/home-page?populate[section_use_cases][populate][liste_use_cases][populate]=*&filters[section_use_cases][liste_use_cases][id][$eq]=${id}`;
};

// Helper pour récupérer tous les use cases
export const getAllUseCasesUrl = (): string => {
  return `${API_CONFIG.STRAPI.BASE_URL}/api/home-page?${API_CONFIG.STRAPI.POPULATE.USE_CASES_SECTION}`;
};

// Nouveau helper pour récupérer les expertises
export const getExpertisesUrl = (): string => {
  return `${API_CONFIG.STRAPI.BASE_URL}/api/home-page?${API_CONFIG.STRAPI.POPULATE.EXPERTISE_SECTION}`;
};

// Helper pour la section devis
export const getDevisUrl = (): string => {
  return `${API_CONFIG.STRAPI.BASE_URL}/api/home-page?${API_CONFIG.STRAPI.POPULATE.DEVIS_SECTION}`;
};
