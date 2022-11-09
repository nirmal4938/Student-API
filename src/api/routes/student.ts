import express from "express";
import {
    DeleteStudent,
    getStudentList,
    getUniqueStudent,
    postStudent,
    updateStudent
} from "../controllers/student";

const router = express.Router();

/**
 * @swagger
 * /student:
 *  get:
 *    tags: [Student]
 *    description: Get Student List
 *    security: []
 *    parameters:
 *    - in: query
 *      name: search_term
 *      required: false
 *      type: string
 *    - in: query
 *      name: status
 *      required: false
 *      type: string
 *      enum: ["Live", "Suspended"]
 *    - in: query
 *      name: per_page
 *      type: number
 *      required: true
 *    - in: query
 *      name: page_number
 *      type: number
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
router.get("/", getStudentList.validator, getStudentList.controller);

/**
 * @swagger
 * /student/add:
 *  post:
 *    tags: [Student]
 *    description: Add New Student
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          firstName:
 *            type: string
 *            example: "Test"
 *            required: true
 *          lastName:
 *            type: string
 *            example: "Test"
 *            required: true
 *          city:
 *            type: string
 *            example: "city"
 *            required: true
 *          standard:
 *            type: number
 *            example: 10
 *            required: true
 *          dateOfBirth:
 *            type: string
 *            example: "12/30/1996"
 *          status:
 *            type: string
 *            enum: [Live, Suspended]
 *          enrollmentFrom:
 *            type: string
 *            example: "4/28/2008"
 *          enrollmentTo:
 *            type: string
 *            example: "4/30/2008"
 *          isActive:
 *            type: boolean
 *            example: true
 *            required: true
 *          briefIntro:
 *            type: string
 *            example: "Please enter briefIntro"
 *            required: true
 *          skills:
 *            type: array
 *            example: ["sk1", "sk2"] 
 *            required: true
 *          subjects:
 *            type: array
 *            example: [{subjectName: "Sub1"}, {subjectName: "Sub2"}]
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */



router.post("/add",postStudent.validator, postStudent.controller);

/**
 * @swagger
 * /student/edit/{id}:
 *  put:
 *    tags: [Student]
 *    description: Edit Student
 *    parameters:
 *    - in: path
 *      name: id
 *      type: string
 *      required: true
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          firstName:
 *            type: string
 *            example: "Test"
 *            required: true
 *          lastName:
 *            type: string
 *            example: "Test"
 *            required: true
 *          city:
 *            type: string
 *            example: "city"
 *            required: true
 *          standard:
 *            type: number
 *            example: 10
 *            required: true
 *          dateOfBirth:
 *            type: string
 *            example: "12/30/1996"
 *          status:
 *            type: string
 *            enum: [Live, Suspended]
 *          enrollmentFrom:
 *            type: string
 *            example: "4/28/2008"
 *          enrollmentTo:
 *            type: string
 *            example: "4/30/2008"
 *          isActive:
 *            type: boolean
 *            example: true
 *            required: true
 *          briefIntro:
 *            type: string
 *            example: "Please enter briefIntro"
 *            required: true
 *          skills:
 *            type: array
 *            example: ["sk1", "sk2"] 
 *            required: true
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
router.put("/edit/:id", updateStudent.validator, updateStudent.controller);

/**
 * @swagger
 * /student/{id}:
 *  get:
 *    tags: [Student]
 *    description: Get Student By Id
 *    security:
 *    - Token: []
 *    parameters:
 *    - in: path
 *      name: id
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
router.get("/:id", getUniqueStudent.validator, getUniqueStudent.controller);

/**
 * @swagger
 * /student/{id}:
 *  delete:
 *    tags: [Student]
 *    description: Delete Student By Id
 *    security:
 *    - Token: []
 *    parameters:
 *    - in: path
 *      name: id
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 */
router.delete("/:id", DeleteStudent.validator, DeleteStudent.controller);
export default router;
