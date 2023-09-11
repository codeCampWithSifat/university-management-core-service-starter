import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertIntoDB);

router.get('/', SemesterRegistrationController.getAllFromDB);
router.get('/:id', SemesterRegistrationController.getByIdFromDB);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteByIdFromDB
);

export const SemesterRegistrationRoutes = router;
