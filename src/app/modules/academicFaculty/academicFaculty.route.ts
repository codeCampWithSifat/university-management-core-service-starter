import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademiFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademiFacultyZodValidation.create),
  AcademicFacultyController.insertIntoDB
);

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getSingelDataFromDB);

export const AcademicFacultyRoutes = router;
