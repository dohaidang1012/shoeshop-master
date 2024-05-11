import express from 'express'
import {getAllUser, registerUser, login, DeleteUser, UpdateDailyVisits, getVisitsByCurrentDate, changeRule} from '../controllers/UserController.js'
const UserRouter = express.Router()
import {isAuth, isAdmin} from '../untils/until.js'

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)
UserRouter.put('/dailyVisit/:id', UpdateDailyVisits)
UserRouter.put('/changeRule/:id', changeRule)
UserRouter.get('/dailyVisit', getVisitsByCurrentDate)


export default UserRouter
