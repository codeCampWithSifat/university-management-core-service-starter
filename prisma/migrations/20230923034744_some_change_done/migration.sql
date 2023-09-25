/*
  Warnings:

  - The primary key for the `student_semester_register_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "student_semester_register_courses" DROP CONSTRAINT "student_semester_register_courses_pkey",
ADD CONSTRAINT "student_semester_register_courses_pkey" PRIMARY KEY ("semesterRegistrationId", "studentId", "offeredCourseId");