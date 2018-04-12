import express from 'express';
import { Router } from 'express';
import searchController from './searchController';
import {getPosts, } from './controller';

const router = Router();

router.route('/search/:username')
  .get(searchController);

router.get('/:userId', getPosts);

export default router;