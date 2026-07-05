export interface TechniqueStep {
  step: number;
  text: string;
  tip?: string;
}

export interface Technique {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  categoryLabel: string;
  image: string;
  steps: TechniqueStep[];
  commonMistakes: string[];
  relatedRecipeSlugs: string[];
  publishedAt: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}
