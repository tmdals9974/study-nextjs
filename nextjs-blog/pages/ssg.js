import Head from "next/head";

export async function getStaticProps() {
  return {
    props: { time: new Date().toISOString() },
  };
}

export default function SSG({ time }) {
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
