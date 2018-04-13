import express from 'express';
import { Router } from 'express';
import profileController from './profileController.js';
import searchController from './searchController';
import {getPosts, postToPosts} from './controller';

const router = Router();

// // router.route('/search/:username')
// //   .get(searchController);


router.route('/user/setstatus')
    .post(profileController.EditStatus)


router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

export default router;