import "reflect-metadata";
import express, { Router, Request, Response } from 'express';
import { dataSource } from '../config/database';
import { TaskSchema } from '../models/TaskSchema';


export const router: Router = express.Router();

const taskRepository = dataSource.getRepository(TaskSchema);
router.route('/post')
  //Get all posts
  .get(async (req, res) => {
    try {
      const posts = await taskRepository.find();
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No posts found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: posts,
        });
      }

    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Create Post
  .post(async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).json({
          status: 'error',
          message: 'Title and content are required',
        });
      } else {
        const doc = taskRepository.create({ title, body });
        const post = await taskRepository.save(doc);

        res.status(201).json({
          status: 'success',
          post,
        })
      }

    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });

router.route('/post/:id')
  //Update A Single Post
  .patch(async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;

      if (!title && !content) {
        return res.status(400).json({
          status: 'error',
          message: 'Title or content is required for update',
        });
      }

      const post = await taskRepository.findOne({
        where: {
          id: parseInt(req.params.id)
        },
      })

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      } else {
        const postUpdate = await taskRepository.update(
          { id: parseInt(req.params.id) },
          {
            title: req.body.title,
            body: req.body.body,
            createdAt: req.body.createdAt
          })
        res.status(200).json({
          status: 'success',
          postUpdate,
        })
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Get Back A Single Post
  .get(async (req: Request, res: Response) => {
    try {
      const post = await taskRepository.findOne({
        where: {
          id: parseInt(req.params.id)
        }
      });
      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          post,
        })
      }

    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Delete Single Post
  .delete(async (req: Request, res: Response) => {
    try {
      const post = await taskRepository.delete({ id: parseInt(req.params.id) });

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          post,
        })
      }

    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });
