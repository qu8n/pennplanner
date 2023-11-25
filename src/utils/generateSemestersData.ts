import { coursesData } from '@/data/coursesData'
import { Course, Semester, DbSemester } from '@/shared/types'

const MIN_SEMESTERS = 8 // three years of semesters: 0-8

export function generateSemestersData(
  firstYearData: number,
  dbSemesters: DbSemester[] | null,
): Semester[] {
  const semestersData: Semester[] = [
    {
      semester_index: 0,
      semester_year: firstYearData,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 0,
    },
    {
      semester_index: 1,
      semester_year: firstYearData + 1,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 0,
    },
    {
      semester_index: 2,
      semester_year: firstYearData + 1,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 0,
    },
    {
      semester_index: 3,
      semester_year: firstYearData + 1,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 1,
    },
    {
      semester_index: 4,
      semester_year: firstYearData + 2,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 1,
    },
    {
      semester_index: 5,
      semester_year: firstYearData + 2,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 1,
    },
    {
      semester_index: 6,
      semester_year: firstYearData + 2,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 2,
    },
    {
      semester_index: 7,
      semester_year: firstYearData + 3,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 2,
    },
    {
      semester_index: 8,
      semester_year: firstYearData + 3,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 2,
    },
    {
      semester_index: 9,
      semester_year: firstYearData + 3,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 3,
    },
    {
      semester_index: 10,
      semester_year: firstYearData + 4,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 3,
    },
    {
      semester_index: 11,
      semester_year: firstYearData + 4,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 3,
    },
    {
      semester_index: 12,
      semester_year: firstYearData + 4,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 4,
    },
    {
      semester_index: 13,
      semester_year: firstYearData + 5,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 4,
    },
    {
      semester_index: 14,
      semester_year: firstYearData + 5,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 4,
    },
    {
      semester_index: 15,
      semester_year: firstYearData + 5,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 5,
    },
    {
      semester_index: 16,
      semester_year: firstYearData + 6,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 5,
    },
    {
      semester_index: 17,
      semester_year: firstYearData + 6,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 5,
    },
    {
      semester_index: 18,
      semester_year: firstYearData + 6,
      semester_season: 'Fall',
      semester_courses: [],
      year_index: 6,
    },
    {
      semester_index: 19,
      semester_year: firstYearData + 7,
      semester_season: 'Spring',
      semester_courses: [],
      year_index: 6,
    },
    {
      semester_index: 20,
      semester_year: firstYearData + 7,
      semester_season: 'Summer',
      semester_courses: [],
      year_index: 6,
    },
  ]

  if (!dbSemesters || dbSemesters.length === 0) {
    return semestersData.filter((s) => s.semester_index <= MIN_SEMESTERS)
  }

  dbSemesters.forEach((dbSemester) => {
    const semesterCourses = dbSemester.semester_course_ids.map((id: string) =>
      coursesData.find((c) => c.course_id === id),
    )
    semestersData[dbSemester.semester_index].semester_courses =
      semesterCourses as Course[]
  })

  const maxDbSemesterIndex = dbSemesters.reduce((max, obj) =>
    max.semester_index > obj.semester_index ? max : obj,
  ).semester_index

  let maxSemesterIndex = Math.ceil((maxDbSemesterIndex + 1) / 3) * 3 - 1

  maxSemesterIndex =
    maxSemesterIndex < MIN_SEMESTERS ? MIN_SEMESTERS : maxSemesterIndex

  return semestersData.filter((s) => s.semester_index <= maxSemesterIndex)
}
