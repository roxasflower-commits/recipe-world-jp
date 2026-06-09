export interface Ingredient {
  amount: string;
  unit: string;
  name: string;
  note?: string;
}

export interface Instruction {
  step: number;
  text: string;
  tip?: string;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'professional';
export type CategoryLevel = 'home' | 'intermediate' | 'professional';

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  description: string;
  cuisine: string;
  cuisineEn: string;
  cuisineSlug: string;
  category: CategoryLevel;
  categoryLabel: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tips: string[];
  image: string;
  source: string;
  sourceUrl?: string;
  sourceSiteName?: string;
  publishedAt: string;
  featured: boolean;
}
