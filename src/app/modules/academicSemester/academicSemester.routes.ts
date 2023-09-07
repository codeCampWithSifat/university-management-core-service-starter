import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterZodValidation.create),
  AcademicSemesterController.insertIntoDB
);

router.get('/', AcademicSemesterController.getAllFromDB);
router.get('/:id', AcademicSemesterController.getDataById);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterZodValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteByIdFromDB
);

export const AcademicSemesterRoutes = router;
