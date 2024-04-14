import express from 'express'; 
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import eczemaRoute from './routes/eczemaRoutes.js';

const app = express(); 

//Middleware
app.use(express.json());
app.use(cors());
// app.use(cors(
//   {
//     origin: 'http://localhost:5555', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ["Content-Type"]
//   }
// ))

app.get('/', (req,res) => {
  res.send("FRONTEND TBA");
})


app.use('/eczema', eczemaRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log("Connected to the Database!");
      console.log(`Connected to Port ${PORT}`);
    })
  }).catch((err) => {
    console.log(err); 
  })
