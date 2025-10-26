'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRecipeById, toggleLikeRecipe } from '@/lib/api';
import { getAuth } from '@/lib/auth';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  author: any;
  likes: string[];
  createdAt: string;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    fetchRecipe();
  }, [params.id]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipeById(params.id);
      setRecipe(data);
      setIsLiked(data.likes?.includes(auth.user?._id) || false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!auth.isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      await toggleLikeRecipe(params.id);
      setIsLiked(!isLiked);
      fetchRecipe(); // Refresh to update like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">Recipe not found</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Back to recipes
        </Link>
      </div>
    );
  }

  const isAuthor = auth.user?._id === recipe.author?._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
            </div>
            <button
              onClick={handleLike}
              className={`text-2xl ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
            >
              ❤️ {recipe.likes?.length || 0}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              📍 {recipe.cuisine}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {recipe.difficulty}
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              ⏱️ {recipe.prepTime + recipe.cookTime} min
            </div>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              🍽️ {recipe.servings} servings
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500">
              By <span className="font-medium text-gray-900">{recipe.author?.username}</span> •{' '}
              {new Date(recipe.createdAt).toLocaleDateString()}
            </p>
          </div>

          {isAuthor && (
            <div className="mb-6 flex gap-4">
              <Link
                href={`/recipes/${recipe._id}/edit`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Edit Recipe
              </Link>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
        >
          ← Back to recipes
        </Link>
      </div>
    </div>
  );
}
