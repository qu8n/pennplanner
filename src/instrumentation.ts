export async function register() {
  const { registerHighlight } = await import('@highlight-run/next/server')

  const projectID = process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID
  if (projectID) {
    registerHighlight({
      projectID: projectID,
      serviceName: 'my-nextjs-backend',
    })
  }
}
