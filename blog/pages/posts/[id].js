import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { MDXRemote } from 'next-mdx-remote';
import CodeBlock from '../../components/CodeBlock';
import { siteTitle } from '../_document';
import { useState } from 'react';

export async function getStaticPaths() {
  let paths = getAllPostIds();

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg px-5"
      onClick={() => alert(`thanks to ${children}`)}
    >
      {children}
    </button>
  );
};
const components = { Button, CodeBlock };
const ErrorComponent = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error occured');
  }

  return (
    <button className="rounded px-2 bg-gren-500" onClick={() => setError(true)}>
      Error fire
    </button>
  );
};

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{`${siteTitle} - ${postData.title}`}</title>
      </Head>
      <ErrorComponent/>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </>
  );
}
