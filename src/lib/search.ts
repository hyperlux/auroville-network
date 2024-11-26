import { create } from 'zustand';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'bazaar' | 'forum' | 'decision';
  link: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  search: () => Promise<void>;
}

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  error: null,

  setQuery: (query) => {
    set({ query });
    if (query.trim()) {
      get().search();
    } else {
      set({ results: [] });
    }
  },

  search: async () => {
    const query = get().query.trim();
    if (!query) return;

    set({ isSearching: true, error: null });

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate searching through different sections
      const results: SearchResult[] = [
        // Events
        {
          id: '1',
          title: 'Community Clean-up Drive',
          description: 'Join us for our monthly community clean-up initiative.',
          type: 'event',
          link: '/events/1'
        },
        // Bazaar
        {
          id: '2',
          title: 'Fresh Organic Vegetables',
          description: 'Locally grown seasonal vegetables from Buddha Garden',
          type: 'bazaar',
          link: '/bazaar'
        },
        // Decisions
        {
          id: '3',
          title: 'Solar Panel Installation',
          description: 'Proposal to install solar panels across the International Zone',
          type: 'decision',
          link: '/decisions'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

      set({ results, isSearching: false });
    } catch (error) {
      set({ error: 'Failed to search', isSearching: false });
    }
  }
}));