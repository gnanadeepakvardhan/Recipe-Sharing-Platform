'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllRecipes } from '@/lib/api';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  author: any;
  likes: string[];
  createdAt: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, [cuisineFilter]);

  const fetchRecipes = async () => {
    try {
      const filters: any = {};
      if (cuisineFilter) filters.cuisine = cuisineFilter;
      if (searchTerm) filters.search = searchTerm;
      
      const data = await getAllRecipes(filters);
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Discover Recipes</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </form>
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No recipes found. Be the first to add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded">
                    {recipe.cuisine}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>🍽 {recipe.servings} servings</span>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/recipes/${recipe._id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Recipe →
                  </Link>
                  <span className="text-sm text-gray-500">❤️ {recipe.likes?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
