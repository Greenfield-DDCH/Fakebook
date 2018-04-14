import express from 'express';
import { Router } from 'express';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import {getPosts, postToPosts} from './controller';
import passport from './models/passport';
// import './passport';
import verifyJWTToken from './tokenVerify';

import {getPosts, postToPosts, getComments} from './controllers/controller';


const router = Router();

router.route('/search/:username')
  .get(verifyJWTToken, searchController);

router.route('/user/login')
  .post(passport.authenticate('local'), loginController);
router.route('/user/')
  .post(signupController);


router.route('/user/setstatus')
  .post( verifyJWTToken, profileController.EditStatus);

  router.route('/user/insertpicture')
  .post(profileController.EditPicture);


router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

router.get('/comments/:parentId/:userId', getComments);

export default router;
