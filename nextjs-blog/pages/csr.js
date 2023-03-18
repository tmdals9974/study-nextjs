import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function CSR() {
  const [time, setTime] = useState();

  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Crate Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{time}</h1>
      </main>
    </div>
  );
}
