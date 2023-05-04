# Part 2. Next.js 시작하기

## Ch 01. Nextjs 기본 기능

### 01. Next.js 기본 1 (프레임워크 구조)

- public 폴더는 컴포넌트 내에서 루트 경로로 접근 가능
  - ex) 파일 경로: `/public/favicon.ico`
  - ex) 접근 경로: `<link rel="icon" href="/favicon.ico" />`

### 02. Next.js 기본 2 (Data Fetching)

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

### 03. Next.js 기본 3 (Layouts - Pages - Image)

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
    /
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
    /
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

### 04. 정리 1

- 1~3강 내용 정리/요약 설명.

### 05. Next.js 기본 4 (Routing)

- Next.js의 Router는 file-system 기반

  - 우선순위
  - 1.`pages/`
  - 2.`src/pages/`

- Dynamic Routing
  - `slug`
    - 대괄호 내 값을 변수로 받게됨.
    - pages/category/[slug].js => /category/:slug (ex. /category/food)
    - pages/[username]/info.js => /:username/info (ex. /jimmy/info)
    - if. `/category/info`로 요청한다면? `/category:slug`로 대응됨. (명시된 값 우선)
  - `...slug`
    - 무한한 depth를 가지는 slug 생성
    - pages/cart/[...slug].js => /cart/\* (ex. /cart/2022/06/24)

### 06. Next.js 기본 5 (Shallow Routing)

- `slug` 값 사용법

  ```javascript
  // pages/[category]/[id].js
  import { useRouter } from "next/router";
  const router = useRouter();
  const { category, id } = router.query;
  ```

  ```javascript
  /
   * file: pages/cart/[...date].js
   * url : cart/2022/06/25
   */

  import { useRouter } from "next/router";
  const router = useRouter();
  const { date } = router.query;
  //date = ["2022", "06", "25"]
  ```

- `QueryString` 값 사용법

  ```javascript
  // localhost:3000/search?key=test
  import { useRouter } from "next/router";
  const router = useRouter();
  const { key } = router.query;
  ```

- `Optional Slug`

  - `pages/posts/[id].js` 만 생성되어있고, `pages/posts/index.js`가 없다면 `/posts/` 로 접근 시 404 페이지가 반환된다.
  - 이 때, Optional로 생성한다면 빈 값으로 접근이 가능하다. (`pages/posts/[[...id]].js`)

- `Shallow Routing`
  - `getServerSideProps` / `getStaticProps` 등을 다시 실행시키지 않고, 현재 상태를 잃지 않고 url을 바꾸는 방법
    - ex) 사용자가 어떤 동작을 했고, 그 기록을 QueryString으로 남기고 싶을 때
    - 1. `location.replace(url)` : 로컬 state 유지 안됨 (리렌더)
    - 2. `router.push(url)` : 로컬 state 유지 / data fetching은 일어남
    - 3. `router.push(url, as, { shallow: true})` : 로컬 state 유지 / data fetching 하지 않음

### 07. Next.js 기본 6 (API Routes)

- API 생성
  - `pages/api/` 하위 폴더에 파일 생성 시, 파일 이름으로 API가 생성됨.
  - `slug`를 이용하여 pages와 동일하게 dynamic routing이 가능하다.
  - 기본으로 `handler` 함수를 반환해주어야함.
  - `request` 객체에서 cookies, query 등 다양한 Middle Ware를 활용/추가 할 수 있다.
  - `response` 함수 종류
    - res.status(code)
    - res.json(body): serializable object
    - res.redirect(code, url)
    - res.send(body): string/object/Buffer
    ```javascript
    // pages/api/user-info/[uid].js
    export default function handler(req, res) {
      const { uid } = req.query;
      res.status(200).json(uid ? userDetail[uid] : {});
    }
    ```

### 08. 정리 2

- 5~7강 강의 내용 정리/요약 설명.
