import { pool } from '../config/db.js';

export interface Post {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return res.rows;
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const res = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  const res = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return res.rows[0];
};

export const updatePost = async (id: string, title: string, content: string): Promise<Post | null> => {
  const res = await pool.query(
    'UPDATE posts SET title = $1, content = $2, updated_at = now() WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return res.rows[0] || null;
};

export const deletePost = async (id: string): Promise<boolean> => {
  const res = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  return (res.rowCount ?? 0) > 0;
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
