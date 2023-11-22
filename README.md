# PennPlanner

A drag-and-drop course planner for students in the online Master of Computer and Information Technology (MCIT) and Master of Science in Engineering in Data Science (MSE-DS) at the University of Pennsylvania.

<div align="center">
<kbd>
  <img src="https://github.com/qu8n/PennPlanner/blob/main/public/screenshot.png" />
</kbd>
</div>

### Features

- Drag and drop courses to plan your entire degree journey
- View full details of each course, including ratings from and link to [MCIT Central](https://mcitcentral.com/)
- View, filter, sort, and search the entire Penn Engineering Online course catalog
- Receive warnings for missing prerequisites or corequisites in your planner

### Built with

- Typescript
- React
- Next.js
- Tailwind CSS
- Supabase Auth with Google OAuth
- Supabase's PostgreSQL database

## Getting started

### Prerequisites

- Node.js
- NPM
- Supabase account

### Supabase's PostgreSQL database schema

`users` table:
| Name | Data Type | Format |
| -------------- | ------------------------ | ------------ |
| id | uuid | uuid |
| created_at | timestamp with time zone | timestamptz |
| username | text | text |
| full_name | text | text |
| first_year | smallint | int2 |
| program | text | text |
| waived_courses | ARRAY | \_text |

`semesters` table:
| Name | Data Type | Format |
| ------------------ | ------------------------ | ------------ |
| id | bigint | int8 |
| created_at | timestamp with time zone | timestamptz |
| semester_index | smallint | int2 |
| semester_course_ids| ARRAY | \_text |
| user_id | uuid | uuid |

### Running locally

1. Clone the repo

```sh
git clone
```

2. Install NPM packages

```sh
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```sh
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_DEV_SITE_URL=
NEXT_PUBLIC_PROD_SITE_URL=
```

4. Run the development server

```sh
npm run dev
```

## Contributing

Contributions are welcome! Feel free to open a pull request or submit an issue. If you need help getting started, please contact me on Slack [here](https://penn-eng-onl-students.slack.com/team/U029YJF17LG).
