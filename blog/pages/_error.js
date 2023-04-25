import ErrorNext from 'next/error';
import NotFound from './errors/404';

function Error({ statusCode }) {
  if (statusCode === 404) {
    return <NotFound />;
  } else {
    return <ErrorNext statusCode={statusCode} />;
  }
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
