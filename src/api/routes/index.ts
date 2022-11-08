import { Application } from "express";
import student from "./student";

export const setup = (app: Application) => {
  app.use("/student", student);

};
