import { Recipe } from '@/types/recipe';

function toISO8601Duration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m}M`;
}

const BASE_URL = 'https://monde-recipe.com';

function toAbsoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${BASE_URL}${url}`;
}

interface Props {
  recipe: Recipe;
  aggregateRating?: { average: number; count: number } | null;
}

export default function RecipeSchema({ recipe, aggregateRating }: Props) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    alternateName: recipe.originalTitle,
    description: recipe.description,
    image: [toAbsoluteUrl(recipe.image)],
    author: {
      '@type': 'Organization',
      name: 'MONDE RECIPE',
    },
    datePublished: recipe.publishedAt,
    prepTime: toISO8601Duration(recipe.prepTime),
    cookTime: toISO8601Duration(recipe.cookTime),
    totalTime: toISO8601Duration(recipe.prepTime + recipe.cookTime),
    recipeYield: `${recipe.servings}人前`,
    recipeCategory: recipe.categoryLabel,
    recipeCuisine: [recipe.cuisine, recipe.cuisineEn],
    keywords: recipe.tags.join(', '),
    recipeIngredient: recipe.ingredients.map((ing) => {
      const parts = [ing.amount, ing.unit, ing.name, ing.note].filter(Boolean);
      return parts.join(' ');
    }),
    recipeInstructions: recipe.instructions.map((inst, idx) => ({
      '@type': 'HowToStep',
      name: `ステップ ${idx + 1}`,
      text: inst.text,
      url: `${BASE_URL}/recipes/${recipe.slug}#step-${idx + 1}`,
      image: [toAbsoluteUrl(recipe.image)],
    })),
    url: `${BASE_URL}/recipes/${recipe.slug}`,
    inLanguage: 'ja',
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1人前',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MONDE RECIPE',
      url: BASE_URL,
    },
  };

  if (aggregateRating && aggregateRating.count > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.average,
      reviewCount: aggregateRating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
