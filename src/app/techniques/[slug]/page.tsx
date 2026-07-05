import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { techniques, getTechniqueBySlug } from '@/data/techniques';
import { recipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BASE_URL = 'https://monde-recipe.com';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const technique = getTechniqueBySlug(params.slug);
  if (!technique) return {};

  const seoTitle = `${technique.shortTitle}｜失敗しない料理のコツ`;

  return {
    title: seoTitle,
    description: technique.description,
    keywords: [technique.shortTitle, technique.categoryLabel, '料理 コツ', '失敗しない'],
    alternates: {
      canonical: `/techniques/${technique.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: technique.description,
      type: 'article',
      publishedTime: technique.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: technique.description,
      images: [technique.image],
    },
  };
}

export default function TechniquePage({ params }: Props) {
  const technique = getTechniqueBySlug(params.slug);
  if (!technique) notFound();

  const relatedRecipes = technique.relatedRecipeSlugs
    .map((slug) => recipes.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (technique.faqs ?? []).map((faq) => ({
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
          { name: '料理のコツ', path: '/techniques' },
          { name: technique.shortTitle, path: `/techniques/${technique.slug}` },
        ]}
      />
      {technique.faqs && technique.faqs.length > 0 && (
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
          <Link href="/techniques" className="hover:text-primary transition-colors">料理のコツ</Link>
          <span>/</span>
          <span className="text-primary line-clamp-1">{technique.shortTitle}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="relative aspect-[16/9] overflow-hidden mb-8">
              <Image
                src={technique.image}
                alt={technique.shortTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Title and meta */}
            <div className="mb-8">
              <span className="text-xs tracking-widest uppercase text-white bg-accent px-3 py-1">
                {technique.categoryLabel}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mt-4">
                {technique.title}
              </h1>
              <p className="text-base text-muted mt-4 leading-relaxed">{technique.description}</p>
            </div>

            {/* Steps */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-accent flex-shrink-0" />
                <h2 className="font-serif text-2xl font-bold">手順とコツ</h2>
              </div>
              <div className="space-y-6">
                {technique.steps.map((step) => (
                  <div key={step.step} className="flex gap-5">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-white flex items-center justify-center font-serif font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm leading-relaxed">{step.text}</p>
                      {step.tip && (
                        <div className="mt-3 flex gap-2 p-3 bg-amber-50 border-l-2 border-gold">
                          <span className="text-gold text-sm flex-shrink-0">💡</span>
                          <p className="text-xs text-amber-900 leading-relaxed">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Common mistakes */}
            {technique.commonMistakes.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-gold flex-shrink-0" />
                  <h2 className="font-serif text-2xl font-bold">よくある失敗</h2>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-6">
                  <ul className="space-y-3">
                    {technique.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-amber-900">
                        <span className="text-gold flex-shrink-0">▶</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* FAQ */}
            {technique.faqs && technique.faqs.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-accent flex-shrink-0" />
                  <h2 className="font-serif text-2xl font-bold">よくある質問</h2>
                </div>
                <Accordion type="single" collapsible className="w-full bg-white border border-warm-border">
                  {technique.faqs.map((faq, i) => (
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
                このテクニックを使うレシピ
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
              <h2 className="font-serif text-xl font-bold">このテクニックを使う他のレシピ</h2>
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
