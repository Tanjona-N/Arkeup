import type { Schema, Struct } from '@strapi/strapi';

export interface SharedExpertiseItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_expertise_items';
  info: {
    displayName: 'Expertise Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icone_type: Schema.Attribute.Enumeration<
      [
        'target',
        'trending-up',
        'users',
        'shield',
        'brain',
        'rocket',
        'settings',
        'chart-bar',
      ]
    >;
    image_thumbnail: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    sous_titre: Schema.Attribute.String;
    titre: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSectionExpertiseArkeUp extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_expertise_arke_ups';
  info: {
    displayName: 'Section Expertise ArkeUp';
  };
  attributes: {
    description_section: Schema.Attribute.Text;
    liste_expertises: Schema.Attribute.Component<'shared.expertise-item', true>;
    titre_section: Schema.Attribute.String;
  };
}

export interface SharedSectionPartenaires extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_partenaires';
  info: {
    displayName: 'section_partenaires';
  };
  attributes: {
    logos: Schema.Attribute.Media<'files' | 'images', true>;
    titre_partenaires: Schema.Attribute.String;
  };
}

export interface SharedSectionTitre extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_titres';
  info: {
    displayName: 'section titre';
  };
  attributes: {
    banner_description: Schema.Attribute.Text;
    banner_sub_title: Schema.Attribute.String;
    banner_title: Schema.Attribute.String;
  };
}

export interface SharedSectionUseCases extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_use_cases';
  info: {
    displayName: 'Section Use Cases';
  };
  attributes: {
    description_section: Schema.Attribute.Text;
    liste_use_cases: Schema.Attribute.Component<'shared.use-case-item', true>;
    titre_section: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedThematique extends Struct.ComponentSchema {
  collectionName: 'components_shared_thematiques';
  info: {
    displayName: 'thematique';
  };
  attributes: {};
}

export interface SharedTransformerVotreEntrepriseAvecLIa
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_transformer_votre_entreprise_avec_l_ia_s';
  info: {
    displayName: "Transformer votre entreprise avec l'IA ?";
  };
  attributes: {
    description: Schema.Attribute.Text;
    titre: Schema.Attribute.String;
  };
}

export interface SharedUseCaseItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_use_case_items';
  info: {
    displayName: 'Use Case Item';
  };
  attributes: {
    bouton_lien: Schema.Attribute.String;
    bouton_texte: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icone: Schema.Attribute.Media<'images' | 'files'>;
    title_item: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.expertise-item': SharedExpertiseItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.section-expertise-arke-up': SharedSectionExpertiseArkeUp;
      'shared.section-partenaires': SharedSectionPartenaires;
      'shared.section-titre': SharedSectionTitre;
      'shared.section-use-cases': SharedSectionUseCases;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.thematique': SharedThematique;
      'shared.transformer-votre-entreprise-avec-l-ia': SharedTransformerVotreEntrepriseAvecLIa;
      'shared.use-case-item': SharedUseCaseItem;
    }
  }
}
