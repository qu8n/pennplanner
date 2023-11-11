export interface Semester {
  id?: number
  semester_index: number
  semester_year: number
  semester_season: string
  semester_courses: Course[]
  year_index: number
}

export interface Course {
  course_id: string
  course_name: string
  course_unit: number
  course_description: string
  course_prereqs: string
  mcit_core_course: boolean
  mcit_open_elective: boolean
  mse_ds_core_course: boolean
  mse_ds_technical_elective: boolean
  mse_ds_open_elective: boolean
  review_count?: number | null
  avg_difficulty?: number | null
  avg_hours_per_week?: number | null
  avg_rating?: number | null
}

export interface dbSemester {
  id: number
  user_id: string
  created_at: string
  semester_index: number
  semester_course_ids: string[]
}
