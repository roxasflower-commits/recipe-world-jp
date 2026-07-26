import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug } from '@/data/guides';
import { recipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.shortTitle, guide.categoryLabel, ...guide.dishes.map((d) => d.name)],
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [guide.image],
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const dishRecipes = guide.dishes
    .map((d) => ({ dish: d, recipe: recipes.find((r) => r.slug === d.recipeSlug) }))
    .filter((entry): entry is { dish: typeof entry.dish; recipe: NonNullable<typeof entry.recipe> } =>
      Boolean(entry.recipe)
    );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (guide.faqs ?? []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '料理カルチャーガイド', path: '/guides' },
          { name: guide.shortTitle, path: `/guides/${guide.slug}` },
        ]}
      />
      {guide.faqs && guide.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">ホーム</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-primary transition-colors">料理カルチャーガイド</Link>
          <span>/</span>
          <span className="text-primary line-clamp-1">{guide.shortTitle}</span>
        </nav>

        <div className="max-w-3xl">
          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden mb-8">
            <Image
              src={guide.image}
              alt={guide.shortTitle}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Title and meta */}
          <div className="mb-8">
            <span className="text-xs tracking-widest uppercase text-white bg-accent px-3 py-1">
              {guide.categoryLabel}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mt-4">
              {guide.title}
            </h1>
            <p className="text-base text-muted mt-4 leading-relaxed">{guide.description}</p>
          </div>

          {/* Intro */}
          <section className="mb-10 space-y-4">
            {guide.intro.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </section>

          {/* Dishes */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-accent flex-shrink-0" />
              <h2 className="font-serif text-2xl font-bold">{guide.dishes.length}つの料理</h2>
            </div>
            <div className="space-y-5">
              {dishRecipes.map(({ dish, recipe }, i) => (
                <Link
                  key={dish.recipeSlug}
                  href={`/recipes/${recipe.slug}`}
                  className="group flex gap-4 bg-white border border-warm-border hover:border-accent transition-colors p-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-white flex items-center justify-center font-serif font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image src={recipe.image} alt={dish.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold group-hover:text-accent transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mt-1">{dish.highlight}</p>
                    <span className="text-xs tracking-widest uppercase text-accent mt-2 inline-flex items-center gap-1">
                      レシピを見る
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Comparison notes */}
          {guide.comparisonNotes.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-gold flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">違いのポイント</h2>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6">
                <ul className="space-y-3">
                  {guide.comparisonNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-amber-900">
                      <span className="text-gold flex-shrink-0">▶</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* FAQ */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">よくある質問</h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-white border border-warm-border">
                {guide.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-b border-warm-border last:border-b-0"
                  >
                    <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-left hover:no-underline hover:text-accent transition-colors [&[data-state=open]]:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-sm text-muted leading-relaxed border-t border-warm-border">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>

        {/* Recipe cards grid */}
        <section className="mt-16 pt-10 border-t border-warm-border">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-accent" />
            <h2 className="font-serif text-xl font-bold">このガイドで紹介したレシピ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishRecipes.map(({ recipe }) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
