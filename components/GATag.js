import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GATag = () => {
  const router = useRouter();
  useEffect(() => {
    ReactGA.pageview(router.pathname);
  }, []);

  // TODO not sure GA works for page load.
  return null;
};

export default GATag;
