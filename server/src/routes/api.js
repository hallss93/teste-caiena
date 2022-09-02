import express from "express";
import validate from "express-validation";

import * as studentController from "../controllers/student/student.controller";
import * as studentValidator from "../controllers/student/student.validator";

const router = express.Router();
router.post("/", validate(studentValidator.create), studentController.create);
router.get(
  "/",
  validate(studentValidator.getAllStudents),
  studentController.allStudents
);
router.get(
  "/:ra",
  validate(studentValidator.getStudent),
  studentController.getOneStudent
);
router.put("/:ra", validate(studentValidator.update), studentController.update);
router.delete(
  "/:ra",
  validate(studentValidator.getStudent),
  studentController.remove
);

module.exports = router;
