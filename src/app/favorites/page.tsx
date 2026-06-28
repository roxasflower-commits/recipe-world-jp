"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { recipes } from "@/data/recipes"
import RecipeCard from "@/components/RecipeCard"

const STORAGE_KEY = "monde-favorites"

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      setFavoriteIds(stored ? JSON.parse(stored) : [])
    } catch {
      setFavoriteIds([])
    }
  }, [])

  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id))

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1 h-6 bg-accent" />
          <h1 className="font-serif text-2xl font-bold tracking-tight">お気に入りレシピ</h1>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Heart className="w-12 h-12 text-warm-border mb-4" />
            <p className="text-muted text-sm mb-6">まだお気に入りが登録されていません</p>
            <Link
              href="/recipes"
              className="text-xs tracking-widest uppercase text-accent hover:text-primary transition-colors"
            >
              レシピ一覧を見る →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted mb-8">{favoriteRecipes.length}品のレシピを保存しています</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
