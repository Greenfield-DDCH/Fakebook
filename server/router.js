import express from 'express';
import { Router } from 'express';
import passport from 'passport';

import {getPosts, postToPosts, getComments} from './controllers/controller';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import verifyJWTToken from './tokenVerify';
import './passport';


const router = Router();

router.route('/search/:username')
  .get( searchController);

router.route('/user/login')
  .post(passport.authenticate('local'), loginController);
router.route('/user/')
  .post(signupController);


router.route('/user/setstatus')
  .post( verifyJWTToken, profileController.EditStatus);


router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

router.get('/comments/:parentId/:userId', getComments);

export default router;
