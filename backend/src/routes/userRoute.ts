//Create route's to make the API work's online
import { Router } from "express";
import { DeleteUser } from "../controllers/userController/deleteUser";
import { GetAllUsers } from "../controllers/userController/getAllUsers";
import { GetUserById } from "../controllers/userController/getUserById";
import { UserLogin } from "../controllers/userController/loginUser";
import { PostUser } from "../controllers/userController/postUser";
import { PutUser } from "../controllers/userController/putUser";
import { RegisterNewUser } from "../controllers/userController/registerNewUser";
import { ResetPassword } from "../controllers/userController/resetPassword";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { registerUserAuthenticate } from "../middlewares/registerUserAuthenticate";
import { ResetPasswordAuthenticate } from "../middlewares/resetPasswordAuthenticate";

const userRoute = Router()

const postUser = new PostUser()
const getAllUsers = new GetAllUsers()
const deleteUser = new DeleteUser()
const putUser = new PutUser()
const getUserById = new GetUserById()
const resetPassword = new ResetPassword()
const userLogin = new UserLogin()
const registerUser = new RegisterNewUser()

userRoute.get('/api/user/getall', ensureAuthenticated, getAllUsers.handle)
userRoute.get('/api/user/getById/:id', ensureAuthenticated, getUserById.handle)

userRoute.delete('/api/user/delete/:id', ensureAuthenticated, deleteUser.handle)

userRoute.put('/api/user/put/:id', ensureAuthenticated, putUser.handle)
userRoute.put('/api/user/changePassword', ResetPasswordAuthenticate, resetPassword.changePassword)

userRoute.post('/api/user/post', ensureAuthenticated, postUser.handle)
userRoute.post('/api/user/login', userLogin.handle)
userRoute.post('/api/user/initResetPassword', resetPassword.initRequest)
userRoute.post('/api/user/verifyResetCode', resetPassword.codeVerify)
userRoute.post('/api/user/startRegister', registerUser.sendCode)
userRoute.post('/api/user/registerCodeVerify', registerUser.codeVerify)
userRoute.post('/api/user/register', registerUserAuthenticate, registerUser.create)

export { userRoute }