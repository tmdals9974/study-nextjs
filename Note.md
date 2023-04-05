## Part 1. 오리엔테이션

### Ch 02. Next.js 소개

#### 01. Next.js 소개 및 도구 - 환경 설정

- `npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"` 명령어로 프로젝트 생성. (https://github.com/vercel/next-learn/tree/master/basics/learn-starter)

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

- 1~3강 내용 정리/요약 설명.

#### **`05. Next.js 기본 4 (Routing)`**

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

#### **`06. Next.js 기본 5 (Shallow Routing)`**

- `slug` 값 사용법

  ```javascript
  // pages/[category]/[id].js
  import { useRouter } from "next/router";
  const router = useRouter();
  const { category, id } = router.query;
  ```

  ```javascript
  /**
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

#### **`07. Next.js 기본 6 (API Routes)`**

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

#### **`08. 정리 2`**

- 5~7강 강의 내용 정리/요약 설명.

## Part 3. Practice : 블로그 프로젝트

### Ch 01. 연습 프로젝트 실습

#### **`01. 프로젝트 시작 (Link Component - Client-Side Navigation)`**

- `npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"` 명령어로 프로젝트 생성. (https://github.com/vercel/next-learn/tree/master/basics/learn-starter)

- `Code Splitting`

  - Next.js는 성능 최적화를 위해 Automatic Code Splitting을 제공한다.
    - 최초 페이지 접근 시 해당 페이지를 그릴 때 `필요한 chunk만 로드`한다.
    - 페이지 이동 시 목적지 페이지에 `필요한 chunk만 추가 로드`한다.

- `Link Component`

  - `Client Side Navigate`

    - browser에서 url을 직접 쳐서 이동하는 것과 달리, JS 상에서 화면 컴포넌트를 교체하는 것을 Client side Navigate라 한다.
    - Link 컴포넌트는 Client Side Navigate를 지원하는 컴포넌트이다.

  - `Prefetching`
    - Link 컴포넌트를 이용하면, Viewport에 Link 컴포넌트가 노출되었을 때 href로 연결된 페이지의 chunk를 로드한다.
    - 예를 들어, `<Link href="/posts/1">링크</Link>` 컴포넌트가 Viewport에 노출되어 있다면 빠른 페이지 이동을 위해 `/posts/1 페이지의 리소스를 미리 로드`해둔다.

  ```javascript
  import Link from "next/link";

  export default function Link() {
    return (
      <>
        <Link href="/posts/1">첫번째 글</Link> //해당 페이지의 파일만 불러오며 페이지 이동 (네트워크 리소스 비용 적음),
        내부 링크 연결 시 사용 추천. //<a href="/posts/1">첫번째 글</a> //모든 파일을 새로 불러오며 페이지 이동
        (네트워크 리소스 비용 큼), 외부 링크로 연결 시 사용 추천.
      </>
    );
  }
  ```

#### **`02. Layouts - Styling`**

- CSS Modules를 이용한 Layout Styling 소개

#### **`03. Pre-rendering - Data Fetching`**

- md 파일들의 메타데이터를 읽어서 게시글 목록으로 보여주는 기능 구현 (`/pages/index.js`, `/lib/posts.js`, `npm i gray-matter`)

#### **`04. Dynamic Routes`**

- md 파일의 내용을 보여주는 게시글 상세 페이지 구현 (`pages/posts/[id].js`, `/lib/posts.js`, `npm i remark remark-html`)
- `fallback` 옵션 (`getStaticPaths` 함수 리턴 값)
  - false: `getStaticPaths`의 리턴값에 있는 주소만 미리 생성. 그 외 주소는 모두 404 페이지 리턴.
  - true: `getStaticPaths`에 없는 주소로 요청이 들어올 경우, 첫 요청 시 생성을 시도한다. (`getStaticProps`를 실행해줌. 페이지 생성 중일 때 fallback 버전 렌더링.) (주로 정적파일이 많아 빌드시간이 오래걸릴 때 사용.)
  - 'blocking': true와 동일하지만, fallback 버전 렌더링을 하지 않고 로딩될 때까지 렌더링이 멈춘다.

#### **`05. API Routes - 배포하기(1)`**

- 게시글 작성 기능 구현

#### **`06. API Routes - 배포하기(2)`**

- Vercel에 Github repository를 연동하여 배포하는 과정 실습
- 단, Vercel에서는 File Write 권한이 없음.

#### **`07. 연습 정리`**

- 1~6강 강의 내용 정리/요약 설명.


### Ch 02. 블로그 커스텀해보기

#### **`01. 나만의 블로그 만들기(UI) (1)`**

- [블로그 테마 저장소](https://jamstackthemes.dev)에서 여러 블로그 테마 참고 가능
- [TailwindCSS 적용 가이드](https://tailwindcss.com/docs/guides/nextjs)를 참고하여 프로젝트 셋업 (**VSCode Extensions - Tailwind CSS Intellisense, PostCSS Language Support 설치 필요**)
- 요구사항
  - [TailwindCSS](https://tailwindcss.com/)를 사용해본다. (npm: `tailwindcss`, `postcss`, `autoprefixer`)
  - [무료 SVG를 다운로드](https://www.iconpacks.net/)하여 사용해본다.
  - 다크모드/라이트모드 전환 가능해야하며, Icon button을 누르면 mode 바뀐다. 새로고침을 유지되어야 한다.
  - posts 폴더에 .md 뿐 아니라 .mdx (md + jsx)도 지원하게 한다. (npm: `next-mdx-remote`)
  - code block 은 스타일링을 통해 이쁘게 노출시켜주며 우상단 copy 버튼을 클릭하면 코드 내용이 복사된다. (npm: `react-syntax-highlighter`)

#### **`02. 나만의 블로그 만들기(UI) (2)`**

- Component를 만들고 mdx에서 호출하여 화면에 보여주는 기능 완성.