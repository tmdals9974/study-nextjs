import Link from 'next/link'

export async function getServerSideProps() {
  return {
    props: { time: new Date().toISOString() },
  }
}

export default function Home({ time }) {
  return (
    <>
      <h1 className="title">{time}</h1>
      <h1>
        <Link href="/csr">CSR로 이동</Link>
        <br />
        <Link href="/ssg">SSG로 이동</Link>
        <br />
        <Link href="/isr">ISR로 이동</Link>
        <br />
      </h1>
    </>
  )
}
