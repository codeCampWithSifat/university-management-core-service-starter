import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: Prisma.PrismaClientKnownRequestError) => {
  // const errors: IGenericErrorMessage[] = [
  //   {
  //     path:"",
  //     message: error.message,
  //   },
  // ];

  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Fucking Record Not Found';
    errors = [
      {
        path: '',
        message: message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete() invocation:')) {
      message = 'Delete Failed';
      errors = [
        {
          path: '',
          message: message,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleCastError;
