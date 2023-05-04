# Part 4. Next.js 심화

## Ch 01. Next.js 공식문서 뜯어보기

### 01. Next.js 공식문서 살펴보기

- 공식문서를 통해 오피셜한 내용을 학습할 수 있음. 혼자 공부하는 습관 필요 강조.

## Ch 02. 심화 Step 1

### 01. Next.js 심화 1 (Compiler & Preview Mode)

- [Compiler](https://nextjs.org/docs/advanced-features/compiler)

  - 고급 프로그래밍 언어(사람이 이해하기 쉬운 언어)를 실행 프로그램으로 만들기 위해 저급 프로그래밍 언어(컴퓨터가 이해하기 쉬운 언어)로 바꾸는 데 사용된다.
  - Next.js는 `SWC` Compiler를 사용하여, transform/minify 역할을 한다. (Babel, Terser 대체)
    - SWC는 Rust로 제작되어 다른 번들러들과 달리 훨씬 빠른 속도를 가진다.
    - `Terser`: A Javascript mangler/compressor toolkit for ES6+ (보통 웹팩 등 번들러에 내장되어있음)

- [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
  - 배포 이후 동적으로 추가/수정되는 데이터를 화면에서 미리볼 수 있게 할 수 있는 기능
    - ex: SSG로 Post들을 보여주는 블로그의 경우, 글을 추가/수정 후 Preview Mode를 이용하여 변경된 글을 볼 수 있다. 단, 다른 사용자에게도 노출되니 Preview-Clear를 통해 초기화해주어야 한다.

### 02. Next.js 심화 2 (Dynamic Import & Static Export)

- [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)
  - 사용하는 시점에 리소스 로드하는 기능
  - Component Lazy Load: `dynamic(() => import("../components/Button"), {suspense: true})`
  - React 18 미만 버전에선, suspense 대신 loading 값으로 로딩 중 노출할 컴포넌트 설정 가능
  - ssr: false를 주면 client-side 에서만 dynamically load하게 된다. (window 등 존재여부 판단하지 않아도 됨)
  - 외부라이브러리도 import 함수를 이용하여 dynamic import가 가능하다
- Automatic Static Optimization
  - 빌드 시 정적인 페이지는 html로, 동적인 파일은 js로 자동으로 생성해준다.
- 정적인 파일일 경우, 초기 로딩시에는 router의 query값을 불러오지 못하고 hydration 이후에 query 값을 읽을 수 있다.
- [Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
  - Next.js 프로젝트를 정적인 파일들만으로 Build 하는 기능.
  - 단, Node.js 서버가 있어야지만 동작하는 기능들은 포기해야함 (ex: Dynamic route, Dynamic Import, getStaticProps, getStaticPaths, Image Component, etc..)

### 03. Next.js 심화 3 (Custom App & Document & Error Page)

- [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases)
  - `jsconfig.js` 내 `baseUrl`, `paths` 값을 이용하여 Import 시 Module Path를 축약하여 입력할 수 있다.
- [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app)
  - `_app.js`에는 아래와 같은 내용으로 커스텀 추천
    - 페이지가 바뀌어도 달라지지 않는 레이아웃을 설정
    - 페이지가 바뀌어도 유지할 상태를 설정
    - 에러핸들링 설정
    - GlobalCSS 설정
- [Custom `Document`](https://nextjs.org/docs/advanced-features/custom-document)

  - `pages/_document.js` 파일 커스텀 가능. 최초 도큐먼트를 설정.
  - \_document는 server에서 동작하기에 onClick과 같은 브라우저 이벤트는 동작하지 않는다.
  - not Data Fetching methods

  ```javascript
  //pages/_document.js
  import { Html, Head, Main, NextScript } from "next/document";

  export default function Documnet() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Learn how to build a personal website using Next.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  ```

- [custom `Error Page`](https://nextjs.org/docs/advanced-features/custom-error-page)
  - Error Code에 해당되는 컴포넌트를 만들어두면 자동으로 매칭해서 반환해줌.

### 04. Next.js 정리 1

- 1~3강 내용 정리/요약 설명.

## Ch 03. 심화 Step 2

### 01. Next.js 심화 4 (Performance 측정)

- [Web Performance](https://web.dev/vitals/)
  - Web Peroformance 측정 기준
    - Largest Contentful Paint (최대 콘텐츠풀 페인트, `LCP`): 페이지가 처음으로 로딩된 후 2.5초 이내에 발생
    - First Input Delay (최초 입력 지연, `FID`): 상호 작용을 측정 (100밀리초)
    - Cumulative Layout Shift (누적 레이아웃 시프트, `CLS`): 시각적 안정성을 측정 (페이지에서 0.1 이하 유지)
- Google을 활용한 Performance 측정
  - Web Performance 측정 페이지
    - [https://developers.google.com/speed](https://developers.google.com/speed)
    - [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
- [Measuring Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
  - Next.js에서 제공하는 함수를 이용하여 소스내에서 자체적으로 퍼포먼스 측정이 가능하다.
    - reportWebVitals
    - metric.name
    - custom metrics

### 02. Next.js 심화 5 (Error Handling)

- [Error Handling](https://nextjs.org/docs/advanced-features/error-handling)
  - Handling Errors in Development => Overlay
  - Handling Server Erros => Custom Error Page
    - `pages/404.js`와 같이 에러코드로 파일명 정의 시, 해당 에러코드로 에러 발생 시 자동 반환.
    - `pages/_error.js` 로 파일 생성 시, 별도 에러 핸들링이 없다면 자동 반환.
  - Handling Client Erros => [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

### 03. Next.js 심화 6 (React 18과 함께 살펴보기)

- [React 18](https://reactjs.org/blog/2022/03/29/react-v18.html)
  - 동시성: 기존에는 상태가 변경되면 update와 렌더링까지 react가 알아서 처리했으나, v18부터는 update와 렌더링 과정에 간섭이 간으하다.
  - [React 18 with Next.js](https://nextjs.org/docs/advanced-features/react-18/overview)
  - React 18에서의 `Suspense` 컴포넌트나 `ServerSideRender`를 이용하여, Nextjs에서 한 페이지를 그리더라도, `컴포넌트별로 CSR과 SSR을 분리`할 수 있게되었다.
    - ex) 기존에서는 하나의 페이지를 통짜 SSR로 만들어야했지만, 현재는 헤더/사이드바/검색창까지는 CSR로, 검색결과창은 SSR로 그리는 식으로 가능하다.
    - https://nextjs.org/docs/advanced-features/react-18/server-components
    - https://github.com/vercel/next-react-server-components

### 04. Next.js 정리 2

- 1~3강 내용 정리/요약 설명.

## Ch 04. 심화 Step 3

### 01. Next.js 심화 7 (Data Fetching API)

- [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)
  - 이전 버전의 SSR 지원 함수. 현재는 getStaticProps와 getServerSideProps로 대체되었다.
  - Children component에서 사용하면 안되고 Page에서 사용해야함.
- [getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)
  - SSR 지원 함수
- [getStaticProps](https://nextjs.org/docs/api-reference/data-fetching/get-static-props)
  - SSG 지원 함수
- [getStaticPaths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)
  - Dynamic Route 지원 함수

### 02. Next.js 심화 8 (Router & Link API)

- [Router](https://nextjs.org/docs/api-reference/next/router)
  - **Usage**
    - useRouter: functional component only, hooks
    - withRouter: class component only
  - **Properties**
    - pathname
    - query
    - isReady: isReady가 true일 때 router가 준비되어 query 등 속성이 정상적으로 들어
    - etc...
  - **Methods**
    - push: history가 쌓이면서 페이지 이동
    - replace: history가 쌓이지 않으면서 페이지 이동
    - prefetch: 미리 페이지 내용을 받아옴. ex) 페이지 로딩 시, 다음 이동할 수 있는 페이지들을 미리 prefetch 해둔다.
    - back
    - reload
  - **Events**
    - Usage: router.events.on('eventName', function), router.events.off('eventName', function)
    - routeChangeStart
    - routeChangeComplete
    - routeChangeError
    - beforeHistoryChange
    - hashChangeStart
    - hashChangeComplete

### 03. Next.js 심화 9 (기타 advanced)

- [next/image](https://nextjs.org/docs/api-reference/next/image)
  - 하는 역할이 많아 서버 없이 동작하지 않음.
  - 10버전 이상에서 사용 가능한 future-image가 있음.
- [next/script](https://nextjs.org/docs/api-reference/next/script)
  - sciprt Load 객체. 다양한 전략 설정 가능.
- [next/amp](https://nextjs.org/docs/api-reference/next/amp)
  - accelerated mobile pages (모바일에서 훨씬 더 빠른 페이지를 위한 컴포넌트)
- [next/server](https://nextjs.org/docs/api-reference/next/server)
  - 서버 헬퍼 객체

### 04. Next.js 정리 3

- 1~3강 내용 정리/요약 설명.

## Ch 05. 심화 Step 4

### 01. Next.js 심화 10 (Configuration)

- [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
  - 각종 옵션 설정 가능, 변경 후 서버 재시작 필요
  - 주요 옵션 : env variables, base path, rewrites, redirects, webpack config, headers, page extension, cdn support with asset prefix, 등

### 02. Next.js 심화 11 (배포 관련 심화)

- Vercel을 이용한 배포 옵션 설정에 대한 설명

### 03. Next.js 정리 4

- 1~2강 내용 정리/요약 설명.
