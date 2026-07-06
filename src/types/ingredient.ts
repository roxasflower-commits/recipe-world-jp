export interface IngredientProduct {
  name: string;
  amazonQuery: string;
  rakutenQuery?: string;
}

export interface Ingredient {
  slug: string;
  name: string;
  originalName?: string;
  shortTitle: string;
  description: string;
  categoryLabel: string;
  image: string;
  whatIsIt: string[];
  howToChoose: string[];
  substitutes: string[];
  relatedRecipeSlugs: string[];
  affiliateProducts: IngredientProduct[];
  publishedAt: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}
