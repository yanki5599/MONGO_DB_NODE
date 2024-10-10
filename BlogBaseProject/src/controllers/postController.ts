import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import asyncHandler from "../middleware/asyncHandler";
import * as postService from "../services/postService";

// Create a new post
export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, data: post });
  }
);

// Delete a post
export const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deleted = await postService.deletePost(req.params.id);
    res.status(204).json({ success: true, data: deleted }); // no content data is sent back for future changes
  }
);

// Get all posts
export const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const posts = await postService.getPosts();
    res.status(200).json({ success: true, data: posts });
  }
);

// Get a single post by ID
export const getPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const post = await postService.getPost(req.params.id);
    res.status(200).json({ success: true, data: post });
  }
);

// Update a post
export const updatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({ success: true, data: post });
  }
);

// Add a comment to a post
export const addComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newComment = await postService.addComment(req.params.id, req.body);
    res.status(201).json({ success: true, data: newComment });
  }
);
