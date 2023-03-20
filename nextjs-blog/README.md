# nextjs-blog

## Part 1. 오리엔테이션

### Ch 02. Next.js 소개

#### 01. Next.js 소개 및 도구 - 환경 설정

- `npx create-next-app nextjs-blog --use-npm --example` 명령어로 프로젝트 생성. (https://github.com/vercel/next-learn/tree/master/basics/learn-starter)

#### 02. Next.js로 만드는 사례 둘러보기 (showcase - examples)

- 브라우저 `Wappalyzer` Plugin을 이용하여 `각 사이트별 사용 라이브러리/프레임워크` 확인 가능
- [해당 페이지](https://nextjs.org/showcase)에서 `next.js를 이용하여 제작한 사이트` 확인 가능
- [해당 페이지](https://vercel.com/templates/next.js)에서 `코드 사용 예시` 확인 가능

## Part 2. Next.js 시작하기

### Ch 01. Nextjs 기본 기능

#### **`01. Next.js 기본 1 (프레임워크 구조)`**

- public 폴더는 컴포넌트 내에서 루트 경로로 접근 가능
  - ex) 파일 경로: `/public/favicon.ico`
  - ex) 접근 경로: `<link rel="icon" href="/favicon.ico" />`

#### **`02. Next.js 기본 2 (Data Fetching)`**

- 컴포넌트에서 `getServerSideProps` 함수를 통해 `Data Fetching` 가능 (`SSR`을 담당하는 함수. 브라우저가 아닌 서버에서 동작한다.)

  ```javascript
  //main.js
  export async function getServerSideProps() {
    return {
      props: {
        user: {
          name: 이승민,
        },
      },
    };
  }

  export default function Main({ user }) {
    return (
      <>
        <h1> 안녕하세요 {user.name}님 </h1>
        SSR입니다.
      </>
    );
  }
  ```

- 컴포넌트에서 `getStaticProps` 함수를 통해 `정적 페이지 생성` 가능 (`SSG`를 담당하는 함수. `dev`로 실행시 SSR과 같이 동작하나, `build`할 경우 SSG로 동작한다.)

  - 동적 라우팅 사용 시, `getStaticPaths` 함수와 함께 사용한다.
  - `ISR`을 원할 경우 `revalidate` 속성과 함께 사용한다.

    - ISR (Incremental Static Regeneration): 증분 정적 사이트를 재생성한다. (특정 주기로 데이터를 가져와서 정적 페이지를 재생성함.)

  - `SSG가 필요한 상황`
    1. 페이지에 필요한 데이터가 빌드 시에 사용 가능할 때
    2. 모든 사용자에게 같은 데이터를 보여줄 때
    3. SEO를 위해서 속도 빠른 페이지가 필요할 때

  ```javascript
  // pages/posts/[boardID]/[postID].js
  // 아래 params를 기반으로 static 파일 생성
  export async function getStaticPaths() {
    return {
      paths: [{ params: { boardID: "1", postID: "1002" } }, { params: { boardID: "2", postID: "1006" } }],
      fallback: false, //false | true | blocking
    };
  }

  export async function getStaticProps({ params }) {
    const response = await fetch(`https://example.com/${params.boardID}/${params.postID}`);
    const post = response.json();

    return {
      props: { post },
    };
  }

  export default function Post({ post }) {
    return <>{post}</>;
  }
  ```

#### **`03. Next.js 기본 3 (Layouts - Pages - Image)`**

- Pre-render와 SEO

  - Next.js는 모든 페이지를 기본적으로 pre-render 한다. (미리 그려둔다.)
  - Pre-render를 해두면 Client(브라우저)처럼 동작하지 않는 검색엔진에게 필요한 데이터를 제공 할 수 있다.
  - Next.js의 Pre-rendering 방식에는 SSG & SSR이 있다.
    - SSG는 빌드 타임에 pre-render (recommended)
    - SSR은 요청 타임에 pre-render

- `Pages` 폴더

  - Pages 폴더 하위 컴포넌트 파일들은 URL과 1대1 매칭이 된다.
  - 동적 라우팅은 파일명에 대괄호를 입력하여 사용할 수 있다.
    |파일경로|URL|
    |------|---
    |pages/index.js|/|
    |pages/ssg.js|/ssg|
    |pages/products/[slug].js|/products/\*|

- 공통 `Layout` 사용

  - `pages/_app.js`파일은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트로, 페이지에 적용할 공통 레이아웃의 역할을 한다. [공식 문서](https://nextjs.org/docs/advanced-features/custom-app)

  ```javascript
  //components/Layout.js
  export default function Layout({ children }) {
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
        </Head>

        <main>{children}</main>
      </div>
    );
  }
  ```

  ```javascript
  //pages/_app.js
  export default function App({ Component, pageProps }) {
    /**
     * Compontnt: 서버에 요청된 페이지(컴포넌트)
     * pageProps: getInitialProps, getStaticProps, getServerSideProps 중 하나를 통해 페칭한 초기 속성값
     * _app에서도 getInitialProps를 사용해 모든 페이지에서 사용할 공통 속성값을 지정할 수 있으나, 이럴 경우 자동 정적 최적화(Automatic Static Optimization)이 비활성화되어 모든 페이지가 서버 사이드 렌더링을 통해 제공됨.
     */

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
  ```

  ```javascript
  //pages/time.js
  export default function Post() {
    return <>현재 시각은...</>;
  }
  ```

  - 만약 여러개의 Layouts를 활용하고 싶은 경우 각 페이지마다 `getLayout` 함수를 제공하면 된다.

  ```javascript
  //components/SubLayout.js
  export default function SubLayout({ children }) {
    return (
      <div>
        <h1>
          <Link href="/">Home</Link>
        </h1>
        {children}
      </div>
    );
  }
  ```

  ```javascript
  //pages/_app.js
  export default function App({ Component, pageProps }) {
    /**
     * SubLayout 사용을 위한 코드.
     * 컴포넌트마다 getLayout을 선언/리턴했다면, 해당 layout을 사용하도록.
     */

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return getLayout(<Component {...pageProps} />);
  }
  ```

  ```javascript
  //pages/time.js
  export default function Post() {
    return <>현재 시각은...</>;
  }

  Post.getLayout = function getLayout(page) {
    return (
      <Layout>
        <SubLayout>{page}</SubLayout>
      </Layout>
    );
  };
  ```

- `Images` 컴포넌트
  - Next.js가 제공하는 최적화 Image Component
    - Improved Performance
    - Visual Stability (CLS - Cumulative Layout Shift 방지)
    - Faster Page Loads (viewport 진입 시 로드 / blur 처리)
    - Asset Flexibility (리사이징)
  - `npx create-next-app --example image-component image-app` 명령어를 통해 Image 예제 프로젝트 생성 가능. (responsive/color 위주 살펴보면 좋음)

#### **`04. 정리 1`**

- 현재까지의 강의 내용 정리/요약 설명.

