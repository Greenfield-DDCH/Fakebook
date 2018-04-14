import express from 'express';
import { Router } from 'express';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import {getPosts, postToPosts, getComments} from './controllers/controller';

const router = Router();

router.route('/search/:username')
  .get(searchController);

router.route('/user/')
  .post(signupController);
router.route('/user/:username/:password')
  .get(loginController);


router.route('/user/setstatus')
  .post(profileController.EditStatus);


router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

router.get('/comments/:parentId/:userId', getComments);

export default router;