
import express from 'express';
import { Router } from 'express';
import searchController from './searchController';

const router = Router();

router.route('/search/:username')
  .get(searchController);


router.route('/user/setstatus')
    .post(Profile.Status)


export default router;



