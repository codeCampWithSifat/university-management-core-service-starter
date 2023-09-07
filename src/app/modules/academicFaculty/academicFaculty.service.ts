/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicFacultyFilterRequest } from './acdemicFaculty.interface';

const insertIntoDB = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({ data });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'id'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.academicFaculty.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingelDataFromDB = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  insertIntoDB,
  getAllFromDB,
  getSingelDataFromDB,
  updateIntoDB,
  deleteFromDB,
};
