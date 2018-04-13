import express from 'express';
import { Router } from 'express';
import profileController from './profileController.js';

const router = Router();

// // router.route('/search/:username')
// //   .get(searchController);


router.route('/user/setstatus')
    .post(profileController.EditStatus)


export default router;



