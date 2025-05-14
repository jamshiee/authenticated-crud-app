import express from 'express'
import { createUser, deleteUser, editUser, getUser } from '../controller/userController.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/adduser',protectedRoute,createUser)
router.get('/getuser',protectedRoute,getUser)
router.put(`/edituser/:id`,protectedRoute,editUser)
router.delete(`/deleteuser/:id`,protectedRoute,deleteUser)

export default router