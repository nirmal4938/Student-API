import BodyParser from "body-parser";
import { errors } from "celebrate";
import cors from 'cors';
import express, { Application } from "express";
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { setup } from './src/api/routes';
import { development } from "./src/database/config";
import { setSwagger } from './swagger';
const app: Application = express();
app.use(cors())
app.all("*", function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization ,Accept"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization"
        );
        next();
      });
      
      const port = 4300;
      app.use(express.json());
      app.use(BodyParser.json());
      
      setSwagger(app);
      setup(app);
      // app.use('/student', StudentRouter);
      app.use(errors());
    
    createConnection(development)
    .then(() => {
      console.log(`Database connected successfully`);
      
    app.listen(port, () => {
      console.log(`Server is lestening on ${port}`);
    });
  })
  .catch((err) => console.log(`Error Occured:: ${err}`));

