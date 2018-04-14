import express from 'express';
import { Router } from 'express';
import profileController from './profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import {getPosts, postToPosts} from './controller';
import passport from 'passport';
import './passport';
import verifyJWTToken from './tokenVerify';

const router = Router();

router.route('/search/:username')
  .get(verifyJWTToken, searchController);

router.route('/user/login')
  .post(passport.authenticate('local'), loginController);
router.route('/user/')
  .post(signupController);


router.route('/user/setstatus')
  .post( verifyJWTToken, profileController.EditStatus);


router.get('/posts/:userId', verifyJWTToken, getPosts);
router.post('/posts/:userId', verifyJWTToken, postToPosts);

export default router;

