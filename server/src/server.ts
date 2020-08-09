import express from 'express'
import cors from 'cors'
import routes from './routes'

 const app = express();

 app.use(express.json());
 app.use(cors());
 app.listen(3333)
 app.use(routes)


 app.get('/teste' , (req,res) => {
    return res.json({teste: "s"})
     console.log('e')
 })