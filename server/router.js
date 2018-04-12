var router = require('express').Router();
import {getPosts, } from './controller';


router.get('/:userId', getPosts);
//router.post('/:userId', )

export default router;