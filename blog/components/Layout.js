import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Utterances from './Utterances';

const NAME = '이승민';
export const siteTitle = 'Next.js Sample Website';
const DARK = 'dark';
const LIGHT = 'light';

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === DARK
        ? DARK
        : LIGHT
      : LIGHT
  );
  const [themeBtnImg, setThemeBtnImg] = useState(LIGHT);

  const handleClick = () => {
    const theme = localStorage.getItem('theme');
    if (theme === DARK) {
      localStorage.setItem('theme', LIGHT);
      setTheme(LIGHT);
    } else {
      localStorage.setItem('theme', DARK);
      setTheme(DARK);
    }
  };

  useEffect(() => {
    if (theme === DARK) {
      document.querySelector('body').classList.add(DARK);
      setThemeBtnImg(LIGHT);
    } else {
      document.querySelector('body').classList.remove(DARK);
      setThemeBtnImg(DARK);
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 h-screen">
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <button className="w-12 px-2" onClick={handleClick}>
          <img src={`/${themeBtnImg}-mode.svg`} alt={themeBtnImg} />
        </button>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
              />
              <h1 className={utilStyles.heading2Xl}>{NAME}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt=""
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {NAME}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <>
            <Utterances />
            <div className={styles.backToHome}>
              <Link href="/">← Back to home</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
