export interface GuideDish {
  recipeSlug: string;
  name: string;
  highlight: string;
}

export interface Guide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  categoryLabel: string;
  image: string;
  intro: string[];
  dishes: GuideDish[];
  comparisonNotes: string[];
  publishedAt: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
}
