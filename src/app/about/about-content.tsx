'use client';

import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ChefHat,
  BookOpen,
  ArrowRight,
  Star,
  Utensils,
  Users,
  LayoutGrid,
} from 'lucide-react';
import { chefs } from '@/data/chefs';
import { recipes, cuisines } from '@/data/recipes';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }),
};

function StatCounter({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { stiffness: 60, damping: 15 });
  const display = useTransform(spring, (v) => Math.floor(v));

  if (isInView) spring.set(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-6 bg-white border border-warm-border group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div className="font-serif text-3xl font-bold text-primary flex items-end leading-none">
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-xs tracking-widest uppercase text-muted mt-2">{label}</p>
      <div className="w-8 h-px bg-accent mt-3 group-hover:w-14 transition-all duration-300" />
    </motion.div>
  );
}

const features = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: '10カ国のレシピ',
    body: 'フランス・イタリア・スペインから北欧・ペルーまで、世界各国の本格料理をカバー。',
  },
  {
    icon: <ChefHat className="w-5 h-5" />,
    title: 'シェフ監修',
    body: 'ミシュラン星付きシェフが公開したレシピをベースに、調理用語の精度を保って日本語解説。',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'レシピの背景まで',
    body: '作り方だけでなく、料理が生まれた歴史・文化・シェフの哲学まで丁寧に紹介。',
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    title: '家庭で再現できる',
    body: '日本で手に入る食材・調理器具で作れるよう、分量と工程を最適化。',
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: '難易度別に整理',
    body: '家庭料理・中級・プロ仕様の3段階で絞り込み。今夜の一皿を見つけやすく。',
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: '本物のレシピ',
    body: '著名レストランの公式レシピ・専門書・料理人インタビューを一次資料として参照。',
  },
];

export default function AboutContent() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const statsData = [
    { value: recipes.length, suffix: '+', label: '掲載レシピ数', icon: <BookOpen className="w-5 h-5" /> },
    { value: cuisines.length, suffix: '', label: '料理ジャンル', icon: <Globe className="w-5 h-5" /> },
    { value: chefs.length, suffix: '', label: '掲載シェフ', icon: <Users className="w-5 h-5" /> },
    { value: 3, suffix: '', label: '難易度区分', icon: <LayoutGrid className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-warm-bg">

      {/* Hero */}
      <section ref={sectionRef} className="bg-primary text-white py-24 px-4 overflow-hidden relative">
        <motion.div style={{ y: parallaxY }} className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase text-white/40"
          >
            About MONDE RECIPE
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl font-bold mt-5 leading-tight"
          >
            海外の名料理を、<br className="hidden sm:block" />日本の台所へ。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/60 mt-6 text-base leading-relaxed max-w-xl mx-auto"
          >
            ミシュランシェフが生み出した本格レシピを、日本語で丁寧に。<br />
            世界各国の料理文化をご家庭で体験できるよう、<br />
            レシピの背景から技術まで深く解説します。
          </motion.p>
        </motion.div>
        {/* Decorative dots */}
        <motion.div
          className="absolute top-16 left-12 w-3 h-3 rounded-full bg-accent/40"
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-12 right-16 w-4 h-4 rounded-full bg-white/10"
          animate={{ y: [0, 14, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Origin story */}
        <MotionSection>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-serif text-2xl font-bold mb-8">サイトを作った経緯</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-sm sm:text-base leading-loose text-gray-700">
              <p>「今日の晩ごはん、何にしようか」——そんな日常の小さな悩みから、このサイトは生まれました。</p>
              <p>毎日の献立を考えるのは、思いのほか大変なことです。冷蔵庫の中を眺めながら同じようなメニューを繰り返してしまう。せっかく週末があるなら、少し手間をかけて普段とは違う料理に挑戦してみたい。そう思ってインターネットで検索すると、本場の美味しそうなレシピがたくさんヒットします。</p>
              <p>けれど、そこには大きな壁がありました。<strong className="font-semibold text-primary">英語、フランス語、イタリア語——言葉がわからない。</strong></p>
              <p>機械翻訳を使っても、料理の工程は微妙なニュアンスが命です。「fold in」と「mix」の違い、「sauté until translucent」の火加減——字面を訳しただけでは伝わらない、料理ならではの言葉があります。</p>
              <p>それなら、<strong className="font-semibold text-primary">料理を知っている人間が、ちゃんと日本語に翻訳すればいい。</strong>そう考えて立ち上げたのが、この MONDE RECIPE です。</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="フランス料理のイメージ"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>
        </MotionSection>

        {/* Features 3-col */}
        <MotionSection>
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="font-serif text-2xl font-bold mb-8">MONDE RECIPEでできること</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="group bg-white border border-warm-border p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-serif text-base font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </MotionSection>

        {/* Stats */}
        <MotionSection>
          <SectionLabel>By the Numbers</SectionLabel>
          <h2 className="font-serif text-2xl font-bold mb-8">サイトについて</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((s, i) => (
              <StatCounter key={i} {...s} />
            ))}
          </div>
        </MotionSection>

        {/* Chefs */}
        <MotionSection>
          <SectionLabel>Featured Chefs</SectionLabel>
          <h2 className="font-serif text-2xl font-bold mb-8">掲載シェフ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {chefs.map((chef, i) => (
              <motion.div
                key={chef.slug}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <Link href={`/chefs/${chef.slug}`} className="group block text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full border-2 border-warm-border group-hover:border-accent transition-colors duration-300">
                    <Image src={chef.image} alt={chef.nameJa} fill className="object-cover" />
                  </div>
                  <p className="font-serif text-sm font-bold leading-snug group-hover:text-accent transition-colors duration-300">
                    {chef.nameJa}
                  </p>
                  <p className="text-xs text-muted mt-1">{chef.restaurant}</p>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {Array.from({ length: chef.michelinStars }).map((_, j) => (
                      <Star key={j} className="w-2.5 h-2.5 fill-gold text-gold" />
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </MotionSection>

        {/* Mission */}
        <MotionSection>
          <div className="bg-primary text-white p-8 sm:p-12">
            <SectionLabel light>Our Mission</SectionLabel>
            <h2 className="font-serif text-2xl font-bold mb-5 mt-1">MONDE RECIPE の想い</h2>
            <p className="text-white/70 text-sm sm:text-base leading-loose max-w-2xl">
              「monde」はフランス語で「世界」を意味します。フランス料理、イタリアン、タイ料理、ペルー料理——
              国境を越えた食の多様性が、毎日の食卓を豊かにすると信じています。
              言語という障壁をなくし、世界中の美味しいレシピをすべての人に届けること。それが、このサイトを作り続ける理由です。
            </p>
          </div>
        </MotionSection>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-primary text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-xl font-bold mb-1">まずはレシピを探してみる</h3>
            <p className="text-white/55 text-sm">80以上のレシピから、今夜の一皿を見つけてください。</p>
          </div>
          <Link
            href="/recipes"
            className="flex items-center gap-2 bg-accent text-white text-sm tracking-widest uppercase px-6 py-3 hover:bg-accent/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            レシピ一覧へ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

function MotionSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-px bg-accent" />
      <span className={`text-xs tracking-widest uppercase ${light ? 'text-white/40' : 'text-accent'}`}>
        {children}
      </span>
    </div>
  );
}
