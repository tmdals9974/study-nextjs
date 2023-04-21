import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { siteTitle } from '../_document';

export default function write() {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);

  const [showLink, setShowLink] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Fetch Error');
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message);
        })
        .catch((err) => alert(`request error: ${err}`));
    }
  };
  return (
    <>
      <Head>
        <title>{`${siteTitle} - Write a post`}</title>
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="rounded bg-pink-50"
          name="id"
          placeholder="id"
          required
          ref={idRef}
        />
        <br />
        <br />
        <input
          type="text"
          className="rounded bg-pink-50"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <br />
        <textarea
          type="text"
          className="rounded bg-pink-50"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <br />
        <input
          className="rounded bg-pink-50 px-2"
          type="submit"
          value="Create"
        />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>Created Post</Link>
      )}
    </>
  );
}
