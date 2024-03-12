import express from 'express';
import {activateUser,loginUser, logoutUser, registrationUser, updateAccessToken,getUserInfo, socialAuth, updateUserInfo, updatePassword, updateProfilePicture} from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated} from '../middleware/auth';
const userRouter = express.Router();


userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAuthenticated, authorizeRoles("user") ,logoutUser);
// userRouter.get('/logout', isAuthenticated, authorizeRoles("user") ,logoutUser);

// userRouter.get('/logout', logoutUser);

userRouter.get('/refreshtoken', updateAccessToken);

userRouter.get('/me',isAuthenticated, getUserInfo);

userRouter.post('/socialAuth', socialAuth);

userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);

userRouter.put('/update-user-password', isAuthenticated, updatePassword);

userRouter.put('/update-user-avatar', isAuthenticated, updateProfilePicture);





export default userRouter;