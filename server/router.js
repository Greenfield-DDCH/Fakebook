import express from 'express';
import { Router } from 'express';
import {getPosts, postToPosts, getComments, findFriend} from './controllers/controller';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import passport from './models/passport';
import verifyJWTToken from './tokenVerify';



const router = Router();

router.route('/search/:username')
  .get(verifyJWTToken, searchController);

router.route('/user/login')
  .post(passport.authenticate('local'), loginController);
router.route('/user/')
  .post(signupController);

router.route('/user/setstatus')
  .post(verifyJWTToken, profileController.EditStatus);

  router.route('/user/insertpicture')
  .post(profileController.EditPicture);

  
  //COMMENTS GO THROUGH THE ROUTE BELOW WORKS FOR REGULAR POSTS FOR JWT TOKEN, BUT NOT FOR COMMENTS ON A POST
router.get('/posts/:userId', getPosts);
router.post('/posts/:userId',  postToPosts);

router.get('/comments/:parentId/:userId', getComments);

router.get('/friends/:currUserId/:loggedInAsId', findFriend);

export default router;
