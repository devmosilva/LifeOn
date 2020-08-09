import {Router} from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'
const routes = Router();

const ClassesControllers = new ClassesController();
const ConnectionControllers = new ConnectionController();

 routes.post('/classes', ClassesControllers.create )
 routes.get('/classes', ClassesControllers.index )

 routes.post('/connections', ConnectionControllers.create)
 routes.get('/connections', ConnectionControllers.index)

 export default routes;