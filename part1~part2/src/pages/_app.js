import Layout from 'components/Layout'

export default function App({ Component, pageProps }) {
  /**
   * Compontnt: 서버에 요청된 페이지(컴포넌트)
   * pageProps: getInitialProps, getStaticProps, getServerSideProps 중 하나를 통해 페칭한 초기 속성값
   * _app에서도 getInitialProps를 사용해 모든 페이지에서 사용할 공통 속성값을 지정할 수 있으나, 이럴 경우 자동 정적 최적화(Automatic Static Optimization)이 비활성화되어 모든 페이지가 서버 사이드 렌더링을 통해 제공됨.
   */

  // return(
  //   <Layout>
  //     <Component {...pageProps} />
  //   </Layout>
  // );

  /**
   * SubLayout 사용을 위한 코드.
   * 컴포넌트마다 getLayout을 선언/리턴했다면, 해당 layout을 사용하도록.
   */

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout(<Component {...pageProps} />)
}
