import express from 'express';
import { Router } from 'express';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import {getPosts, postToPosts} from './controller';

const router = Router();

router.route('/search/:username')
  .get(searchController);

router.route('/user/')
  .post(signupController);
router.route('/user/:username/:password')
  .get(loginController);


router.route('/user/setstatus')
  .post(profileController.EditStatus);

router.route('/user/insertpicture')
  .post(profileController.EditPicture);


router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

export default router;