import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Calendar, ShoppingBag, Vote } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { useSearch } from '../lib/search';

const typeIcons = {
  event: Calendar,
  bazaar: ShoppingBag,
  decision: Vote
};

export default function Layout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { query, results, isSearching, setQuery } = useSearch();

  const handleResultClick = (link: string) => {
    navigate(link);
    setQuery('');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-dark-card shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search across Auroville..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-dark-card border-dark text-dark-primary placeholder-dark-secondary'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } border focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
              />
              <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                isDark ? 'text-dark-secondary' : 'text-gray-400'
              }`} />

              {/* Search Results */}
              {query && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg ${
                  isDark ? 'bg-dark-card' : 'bg-white'
                } overflow-hidden z-50`}>
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500 dark:text-dark-secondary">
                      Searching...
                    </div>
                  ) : results.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-dark-secondary">
                      No results found
                    </div>
                  ) : (
                    <div className="divide-y dark:divide-dark">
                      {results.map((result) => {
                        const Icon = typeIcons[result.type];
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result.link)}
                            className={`w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-dark-hover ${
                              isDark ? 'text-dark-primary' : 'text-gray-900'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 mt-0.5 text-auroville-primary" />
                              <div>
                                <h3 className="font-medium">{result.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-dark-secondary mt-1">
                                  {result.description}
                                </p>
                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-dark-secondary mt-2">
                                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}