import { Recipe } from '@/types/recipe';

interface FaqItem {
  question: string;
  answer: string;
}

function buildFaqs(recipe: Recipe): FaqItem[] {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const generated: FaqItem[] = [
    {
      question: `${recipe.title}の調理時間はどのくらいですか？`,
      answer: `準備時間${recipe.prepTime}分、調理時間${recipe.cookTime}分で、合計約${totalTime}分かかります。`,
    },
    {
      question: `${recipe.title}は何人前のレシピですか？`,
      answer: `このレシピは${recipe.servings}人前です。材料の分量を比例して増減することで人数に合わせて調整できます。`,
    },
    {
      question: `${recipe.title}の難易度はどのくらいですか？`,
      answer: `${recipe.difficultyLabel}レベルです。${recipe.description}`,
    },
    {
      question: `${recipe.title}（${recipe.originalTitle}）はどんな料理ですか？`,
      answer: `${recipe.cuisine}の料理で、${recipe.description}`,
    },
  ];
  return recipe.faqs ? [...recipe.faqs, ...generated] : generated;
}

export default function FaqSchema({ recipe }: { recipe: Recipe }) {
  const faqs = buildFaqs(recipe);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export { buildFaqs };
export type { FaqItem };
