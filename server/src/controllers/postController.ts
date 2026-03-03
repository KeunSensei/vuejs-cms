import { Request, Response } from 'express';
import {
  getAllPosts as dbGetAll,
  getPostById as dbGetById,
  createPost as dbCreate,
  updatePost as dbUpdate,
  deletePost as dbDelete
} from '../models/Post.js';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await dbGetAll();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await dbGetById(req.params.id as string);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const saved = await dbCreate(title, content);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const updated = await dbUpdate(req.params.id as string, title, content);
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const success = await dbDelete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
