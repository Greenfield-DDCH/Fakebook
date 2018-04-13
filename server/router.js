import express from 'express';
import { Router } from 'express';
import searchController from './searchController';
import {getPosts, postToPosts} from './controller';

const router = Router();

router.route('/search/:username')
  .get(searchController);

router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

export default router;