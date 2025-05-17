
import { supabase } from './supabase';

export type BlogPost = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

// Get all posts, optionally filtering by published status
export async function getPosts(publishedOnly: boolean = false) {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (publishedOnly) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
      return []; // Return empty array instead of throwing to prevent UI crashes
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching posts:', error);
    return []; // Return empty array on any error
  }
}

// Get draft posts only
export async function getDraftPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', false)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching draft posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching draft posts:', error);
    return [];
  }
}

// Get a single post by ID
export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
  
  return data;
}

// Create a new post
export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...post,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  return data;
}

// Update an existing post
export async function updatePost(id: string, post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...post,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }
  
  return data;
}

// Delete a post
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
  
  return true;
}
