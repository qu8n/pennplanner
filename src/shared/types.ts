export type Semester = {
  id?: number // different from DbSemester.id
  semester_index: number
  semester_year: number
  semester_season: string
  semester_courses: Course[]
  year_index: number
}

export type Course = {
  course_id: string
  course_name: string
  course_unit: number
  course_description: string
  course_prereqs_text: string
  course_prereq_ids: (string | string[])[]
  course_coreq_ids: (string | string[])[]
  course_rec_ids: (string | string[])[]
  mcit_core_course: boolean
  mcit_open_elective: boolean
  mse_ds_core_course: boolean
  mse_ds_technical_elective: boolean
  mse_ds_open_elective: boolean
  review_count: number | null
  avg_difficulty: number | null
  avg_hours_per_week: number | null
  avg_rating: number | null
  semesters_not_offered: string[]
}

export type DbSemester = Database['public']['Tables']['semesters']['Row']

export type DbUser = Database['public']['Tables']['users']['Row']

// From https://supabase.com/dashboard/project/wgusduhubrpononyltwn/api?page=tables-intro
export interface Database {
  public: {
    Tables: {
      semesters: {
        Row: {
          created_at: string
          id: number
          semester_course_ids: string[]
          semester_index: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          semester_course_ids?: string[]
          semester_index: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          semester_course_ids?: string[]
          semester_index?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'semesters_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          first_year: number
          full_name: string
          id: string
          planner_privacy: string
          program: string
          username: string
          waived_courses: string[]
        }
        Insert: {
          created_at?: string
          first_year: number
          full_name: string
          id: string
          planner_privacy?: string
          program: string
          username: string
          waived_courses?: string[]
        }
        Update: {
          created_at?: string
          first_year?: number
          full_name?: string
          id?: string
          planner_privacy?: string
          program?: string
          username?: string
          waived_courses?: string[]
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
