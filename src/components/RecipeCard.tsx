import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

const difficultyColor: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-orange-100 text-orange-800',
  professional: 'bg-red-100 text-red-800',
};

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'default' | 'large' | 'horizontal';
}

export default function RecipeCard({ recipe, variant = 'default' }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  if (variant === 'large') {
    return (
      <Link href={`/recipes/${recipe.slug}`} className="group block">
        <article className="relative overflow-hidden bg-card-bg h-full">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-card-gradient" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-widest uppercase text-white/80 bg-accent px-2 py-0.5">
                  {recipe.cuisine}
                </span>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  {recipe.categoryLabel}
                </span>
              </div>
              <h2 className="font-serif text-2xl text-white leading-tight group-hover:text-white/90 transition-colors">
                {recipe.title}
              </h2>
              <p className="text-white/70 text-sm mt-2 line-clamp-2">{recipe.description}</p>
              <div className="flex items-center gap-4 mt-4 text-white/60 text-xs">
                <span>⏱ {totalTime}分</span>
                <span>👥 {recipe.servings}人前</span>
                <span className={`px-2 py-0.5 rounded text-xs ${difficultyColor[recipe.difficulty]}`}>
                  {recipe.difficultyLabel}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/recipes/${recipe.slug}`} className="group block">
        <article className="flex gap-4 items-start">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs tracking-widest uppercase text-accent font-medium">
              {recipe.cuisine}
            </span>
            <h3 className="font-serif text-sm font-semibold leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            <div className="text-xs text-muted mt-2">
              ⏱ {totalTime}分 · {recipe.difficultyLabel}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <article className="bg-card-bg overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs tracking-widest uppercase text-white bg-accent px-2 py-1">
              {recipe.cuisine}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficultyLabel}
            </span>
            <span className="text-xs text-muted">{recipe.categoryLabel}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold leading-tight group-hover:text-accent transition-colors flex-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">{recipe.description}</p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-warm-border text-xs text-muted">
            <span>⏱ {totalTime}分</span>
            <span>👥 {recipe.servings}人前</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
