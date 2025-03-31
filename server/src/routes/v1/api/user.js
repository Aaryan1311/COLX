import express from 'express';



import { deleteUser, getUser, getUserListings, updateUser } from '../../../controller/user/user.controller.js';
import { isAuthenticated } from '../../../utils/isAuthenticated.js';

const router=express.Router();

router.put('/updateUser/:id',isAuthenticated, updateUser)
router.delete('/deleteUser/:id',isAuthenticated, deleteUser)
router.get('/getUserListings/:id',isAuthenticated, getUserListings)
router.get('/getUser/:id',isAuthenticated,getUser)

export default router;

