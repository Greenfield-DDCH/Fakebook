import express from 'express';
import { Router } from 'express';
import profileController from './profileController.js';

const router = Router();

// // router.route('/search/:username')
// //   .get(searchController);


router.route('/user/setstatus')
    .post(profileController.EditStatus)
import express from 'express'
import { Router } from 'express';
import Profile from './controller.js'

const router = Router();

router.route('/user/setstatus')
    .post(Profile.Status)


export default router;