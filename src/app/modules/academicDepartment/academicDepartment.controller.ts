import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { AcademicDepartmentService } from './academicDepartment.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicDepartment created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicDepartmentService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicDepartments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicDepartment fetched successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete A Academic Department Successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AcademicDepartmentService.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update A Academic Department Successfully',
    data: result,
  });
});
export const AcademicDepartmentController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
  updateIntoDB,
};
