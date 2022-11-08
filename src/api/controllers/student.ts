import { celebrate } from "celebrate";
import { Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import { getRepository } from "typeorm";
import APIResponse from "../../utils/apiResponse";
import { Student } from "../entity/Student";

const getStudentList = {
  validator: celebrate({
    query: Joi.object().keys({
      search_term: Joi.string().allow(null, ""),
      status: Joi.string().allow(null, ""),
      per_page: Joi.number().required(),
      page_number: Joi.number().required(),
    }),
  }),

  controller: async (req: any, res: Response): Promise<any> => {
    try {
      const studentRepo = getRepository(Student);
     console.log("req.query.search_term", req.query.search_term);
      let conditions: any = [];
      Object.keys(req.query).map((query) => {
        switch (query) {
          case "search_term":
            if (!req.query.search_term) break;
            if (req.query.search_term) {
              req.query.search_term.split(" ").map((x: any) => {        
                conditions.push(`(student.firstName like '%${x}%')`);
              });
            } else {
              conditions.push(
                `(student.firstName like '%${req.query.search_term}%')`
              );
            }
            break;
          case "status":
            if (!req.query.status) break;
            conditions.push(`(student.status = '${req.query.status}')`);
            break;
        }
      });

      let query: any;

      query = studentRepo.createQueryBuilder("student").select(["student"]);

      conditions.map((x: any, i: any) => {
        if (!i) {
          query = query.where(x);
        } else {
          query = query.andWhere(x);
        }
      });
      const [student, count] = await query
        .orderBy("student.created_at", "DESC")
        .skip(req.query.per_page * (req.query.page_number - 1))
        .take(req.query.per_page)
        // .where("student.firstName like :name", { name:`%${req.query.search_term}%` })
        .getManyAndCount();

      const AllCount = await query.getCount();

      const result = {
        question: student.map((student: Student) => {
          return {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            city: student.city,
            dateOfBirth: student.dateOfBirth,
            age: student.age,
            standard: student.standard,
            skills: student.skills,
            briefIntro: student.briefIntro,
            enrollmentFrom: student.enrollmentFrom,
            enrollmentTo: student.enrollmentTo,
            status: student.status,
            isActive: student.isActive,
            created_at: student.created_at,
            updated_at: student.updated_at,
          };
        }),
        count: count,
        AllCount: AllCount,
      };
      if (result) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(result, "Student get successfully.", true));
      }
    } catch (err) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json(new APIResponse({}, "Error in getting Student", false));
    }
  },
};

const postStudent = {
  validator: celebrate({
    query: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      city: Joi.string(),
      standard: Joi.number(),
      dateOfBirth: Joi.string(),
      skills: Joi.array(),
      briefIntro: Joi.string(),
      enrollmentFrom: Joi.string(),
      enrollmentTo: Joi.string(),
      status: Joi.string(),
      isActive: Joi.boolean(),
    }),
  }),
  controller: async (req: any, res: Response): Promise<any> => {
    try {
      let newStudent = req.body;
      newStudent.dateOfBirth = new Date(req.body.dateOfBirth);
      newStudent.enrollmentFrom = new Date(req.body.enrollmentFrom);
      newStudent.enrollmentTo = new Date(req.body.enrollmentTo);
      let age =
        new Date(Date.now()).getFullYear() -
        newStudent.dateOfBirth.getFullYear();
      newStudent["age"] = age;
      let studentRepo = getRepository(Student);
      const student = await studentRepo.create(newStudent);
      console.log("result", student);
      let result = await studentRepo.save(student);
      console.log("result", result);
      result = JSON.parse(JSON.stringify(result));
      if (result) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(result, " Student Add Succesfully", true));
      }

      throw new Error("Student Add Error");
    } catch (err) {
      console.log("Error", err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse({}, "Student Add Error", false));
    }
  },
};

const updateStudent = {
  validator: celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      city: Joi.string(),
      standard: Joi.number(),
      dateOfBirth: Joi.string(),
      skills: Joi.array(),
      briefIntro: Joi.string(),
      enrollmentFrom: Joi.string(),
      enrollmentTo: Joi.string(),
      status: Joi.string(),
      isActive: Joi.boolean(),
    }),
  }),
  controller: async (req: any, res: Response): Promise<any> => {
    try {
      let updateStudent = req.body;
      updateStudent.dateOfBirth = new Date(req.body.dateOfBirth);
      updateStudent.enrollmentFrom = new Date(req.body.enrollmentFrom);
      updateStudent.enrollmentTo = new Date(req.body.enrollmentTo);
      let age =
        new Date(Date.now()).getFullYear() -
        updateStudent.dateOfBirth.getFullYear();
      updateStudent["age"] = age;

      let studentRepo = getRepository(Student);
      const checkStudent = await studentRepo.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (checkStudent) {
        studentRepo.merge(checkStudent, updateStudent);
        let result = await studentRepo.save(checkStudent);
        result = JSON.parse(JSON.stringify(result));
        if (result) {
          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse(result, " Student Updated Succesfully", true)
            );
        }
      }

      throw new Error("Student Update Error");
    } catch (err) {
      console.log("Error", err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse({}, "Student Update Error", false));
    }
  },
};

const getUniqueStudent = {
  validator: celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller: async (req: any, res: Response): Promise<any> => {
    try {
      let studentRepo = getRepository(Student);
      const checkStudent = await studentRepo.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (checkStudent) {
        let result = JSON.parse(JSON.stringify(checkStudent));
        return res
          .status(httpStatus.OK)
          .json(new APIResponse(result, " Student Fetched Succesfully", true));
      }
      throw new Error("Student Fetch Error");
    } catch (err) {
      console.log("Error", err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse({}, "Student Fetch Error", false));
    }
  },
};

const DeleteStudent = {
  validator: celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller: async (req: any, res: Response): Promise<any> => {
    try {
      let studentRepo = getRepository(Student);
      const deleteStudent = await studentRepo
        .createQueryBuilder()
        .delete()
        .from(Student)
        .where("id = :id", { id: req.params.id })
        .execute();
      if (deleteStudent) {
        let result = JSON.parse(JSON.stringify(deleteStudent));
        return res
          .status(httpStatus.OK)
          .json(new APIResponse({}, " Student Deleted Succesfully", true));
      }
      throw new Error("Student Fetch Error");
    } catch (err) {
      console.log("Error", err);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse({}, "Student Delete Error", false));
    }
  },
};

export {
    getStudentList,
    postStudent,
    updateStudent,
    getUniqueStudent,
    DeleteStudent,
};

