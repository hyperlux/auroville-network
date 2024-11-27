import { create } from 'zustand';
import axios from './axios';

type ErrorState = string | null;

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  replies: number;
  views: number;
  lastActivity: string;
}

interface ForumState {
  posts: ForumPost[];
  categories: string[];
  isLoading: boolean;
  error: ErrorState;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  fetchPosts: (page: number) => Promise<void>;
  createPost: (data: Partial<ForumPost>) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  sortBy: SortOption;
  setSortOption: (option: SortOption) => void;
  editPost: (id: string, data: Partial<ForumPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  pinPost: (id: string) => Promise<void>;
}

type SortOption = 'latest' | 'mostViewed' | 'mostCommented';

export const useForumStore = create<ForumState>((set, get) => ({
  posts: [],
  categories: ['General', 'Announcements', 'Events', 'Projects', 'Questions', 'Ideas'],
  isLoading: false,
  error: null,
  selectedCategory: 'All',
  currentPage: 1,
  postsPerPage: 10,
  totalPosts: 0,
  sortBy: 'latest',

  fetchPosts: async (page: number) => {
    try {
      set({ isLoading: true, error: null });
      const { selectedCategory } = get();
      const response = await axios.get('/api/forums/posts' + 
        (selectedCategory !== 'All' ? `?category=${selectedCategory}` : '')
      );
      
      const formattedPosts = response.data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        author: post.author,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
        replies: post.replies || 0,
        views: post.views || 0,
        lastActivity: new Date(post.lastActivity).toLocaleDateString()
      }));
      
      set({ posts: formattedPosts, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to load posts', 
        isLoading: false 
      });
    }
  },

  createPost: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post('/api/forums/posts', data);
      await get().fetchPosts(1);
    } catch (error: any) {
      console.error('Error creating post:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to create post', 
        isLoading: false 
      });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchPosts(1);
  },

  setSortOption: (option: SortOption) => {
    set({ sortBy: option });
    get().fetchPosts(1);
  },

  editPost: async (id: string, data: Partial<ForumPost>) => {
    try {
      set({ isLoading: true, error: null });
      await axios.put(`/api/forums/posts/${id}`, data);
      await get().fetchPosts(1);
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to edit post',
        isLoading: false 
      });
    }
  },

  deletePost: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`/api/forums/posts/${id}`);
      await get().fetchPosts(1);
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete post',
        isLoading: false 
      });
    }
  },

  pinPost: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await axios.put(`/api/forums/posts/${id}/pin`);
      await get().fetchPosts(1);
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to pin post',
        isLoading: false 
      });
    }
  }
}));

interface PostAnalytics {
  viewCount: number;
  uniqueViewers: string[];
  engagementRate: number;
}
