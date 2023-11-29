import { Link } from '@nextui-org/react'

function Disclaimer() {
  return (
    <>
      <div>
        PennPlanner is still in early development and may contains errors or
        inaccuracies. Please refer to the Penn Engineering Online&apos;s{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://online.seas.upenn.edu/student-knowledge-base/"
        >
          Student Knowledge Base
        </Link>{' '}
        for official information.
      </div>

      <div>
        This application references reviews from{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://mcitcentral.com/"
        >
          MCIT Central
        </Link>
        , which is no longer maintained and may contain outdated information.
      </div>

      <div>
        Please refer to the Penn Engineering Online&apos;s Slack channel{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://penn-eng-onl-students.slack.com/archives/C02ADHGAL93"
        >
          #course-planning-advice
        </Link>
        , the{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/3HDZ2FNJaG"
        >
          MCIT Discord server
        </Link>
        , and the{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://discord.gg/S4KQKCXdvv"
        >
          MSE-DS Discord server
        </Link>{' '}
        to gather the latest student experiences.
      </div>

      <div>
        See an error? Let me know by creating an issue on GitHub{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://github.com/qu8n/pennplanner/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
        >
          here
        </Link>
        . Contributions are also welcome! I&apos;m happy to help you get started
        over{' '}
        <Link
          className="text-blue-700"
          isExternal={true}
          underline="hover"
          href="https://penn-eng-onl-students.slack.com/team/U029YJF17LG"
        >
          Slack.
        </Link>
      </div>
      <p>-Quan</p>
    </>
  )
}

export function Tutorial() {
  return <Disclaimer />
}
