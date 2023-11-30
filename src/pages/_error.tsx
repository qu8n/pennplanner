import { NextPage, NextPageContext } from 'next'

interface Props {
  statusCode?: number
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <p>
      {`An error ${statusCode ? `${statusCode} ` : ''}occurred ${
        statusCode ? 'server' : 'client'
      }-side. Try clearing your cookies and refreshing the page.`}
    </p>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
