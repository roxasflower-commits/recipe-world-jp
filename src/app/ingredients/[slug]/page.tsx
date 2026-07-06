import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ingredients, getIngredientBySlug } from '@/data/ingredients';
import { recipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import AffiliateProducts from '@/components/AffiliateProducts';
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
  return ingredients.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ingredient = getIngredientBySlug(params.slug);
  if (!ingredient) return {};

  const seoTitle = `${ingredient.name}とは？選び方・代用品を解説`;

  return {
    title: seoTitle,
    description: ingredient.description,
    keywords: [ingredient.name, ingredient.originalName ?? '', ingredient.categoryLabel, '選び方', '代用品'],
    alternates: {
      canonical: `/ingredients/${ingredient.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: ingredient.description,
      type: 'article',
      publishedTime: ingredient.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: ingredient.description,
      images: [ingredient.image],
    },
  };
}

export default function IngredientPage({ params }: Props) {
  const ingredient = getIngredientBySlug(params.slug);
  if (!ingredient) notFound();

  const relatedRecipes = ingredient.relatedRecipeSlugs
    .map((slug) => recipes.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (ingredient.faqs ?? []).map((faq) => ({
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
          { name: '食材辞典', path: '/ingredients' },
          { name: ingredient.name, path: `/ingredients/${ingredient.slug}` },
        ]}
      />
      {ingredient.faqs && ingredient.faqs.length > 0 && (
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
          <Link href="/ingredients" className="hover:text-primary transition-colors">食材辞典</Link>
          <span>/</span>
          <span className="text-primary line-clamp-1">{ingredient.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden mb-8">
              <Image
                src={ingredient.image}
                alt={ingredient.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <span className="text-xs tracking-widest uppercase text-white bg-accent px-3 py-1">
                {ingredient.categoryLabel}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mt-4">
                {ingredient.name}
              </h1>
              {ingredient.originalName && (
                <p className="text-sm text-muted italic mt-1">{ingredient.originalName}</p>
              )}
              <p className="text-base text-muted mt-4 leading-relaxed">{ingredient.description}</p>
            </div>

            {/* What is it */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">どんな食材？</h2>
              </div>
              <div className="space-y-4">
                {ingredient.whatIsIt.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Affiliate products */}
            <AffiliateProducts products={ingredient.affiliateProducts} />

            {/* How to choose */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">選び方</h2>
              </div>
              <div className="bg-white border border-warm-border p-6">
                <ul className="space-y-3">
                  {ingredient.howToChoose.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-accent flex-shrink-0">▶</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Substitutes */}
            {ingredient.substitutes.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-gold flex-shrink-0" />
                  <h2 className="font-serif text-2xl font-bold">代用品</h2>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-6">
                  <ul className="space-y-3">
                    {ingredient.substitutes.map((sub, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-amber-900">
                        <span className="text-gold flex-shrink-0">▶</span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* FAQ */}
            {ingredient.faqs && ingredient.faqs.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-accent flex-shrink-0" />
                  <h2 className="font-serif text-2xl font-bold">よくある質問</h2>
                </div>
                <Accordion type="single" collapsible className="w-full bg-white border border-warm-border">
                  {ingredient.faqs.map((faq, i) => (
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

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent inline-block" />
                この食材を使うレシピ
              </h3>
              <div className="space-y-5">
                {relatedRecipes.slice(0, 6).map((r) => (
                  <RecipeCard key={r.id} recipe={r} variant="horizontal" />
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom related recipes */}
        {relatedRecipes.length > 6 && (
          <section className="mt-16 pt-10 border-t border-warm-border">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-6 bg-accent" />
              <h2 className="font-serif text-xl font-bold">この食材を使う他のレシピ</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedRecipes.slice(6).map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
