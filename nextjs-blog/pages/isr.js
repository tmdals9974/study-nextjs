import Head from "next/head";

export async function getStaticProps() {
  return {
    props: { time: new Date().toISOString() },
    revalidate: 1 //1초마다 페이지 재생성
  };
}

export default function ISR({ time }) {
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
