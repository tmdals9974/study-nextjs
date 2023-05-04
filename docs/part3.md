# Part 3. Practice : 블로그 프로젝트

## Ch 01. 연습 프로젝트 실습

### 01. 프로젝트 시작 (Link Component - Client-Side Navigation)

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

### 02. Layouts - Styling

- CSS Modules를 이용한 Layout Styling 소개

### 03. Pre-rendering - Data Fetching

- md 파일들의 메타데이터를 읽어서 게시글 목록으로 보여주는 기능 구현 (`/pages/index.js`, `/lib/posts.js`, `npm i gray-matter`)

### 04. Dynamic Routes

- md 파일의 내용을 보여주는 게시글 상세 페이지 구현 (`pages/posts/[id].js`, `/lib/posts.js`, `npm i remark remark-html`)
- `fallback` 옵션 (`getStaticPaths` 함수 리턴 값)
  - false: `getStaticPaths`의 리턴값에 있는 주소만 미리 생성. 그 외 주소는 모두 404 페이지 리턴.
  - true: `getStaticPaths`에 없는 주소로 요청이 들어올 경우, 첫 요청 시 생성을 시도한다. (`getStaticProps`를 실행해줌. 페이지 생성 중일 때 fallback 버전 렌더링.) (주로 정적파일이 많아 빌드시간이 오래걸릴 때 사용.)
  - 'blocking': true와 동일하지만, fallback 버전 렌더링을 하지 않고 로딩될 때까지 렌더링이 멈춘다.

### 05. API Routes - 배포하기(1)

- 게시글 작성 기능 구현

### 06. API Routes - 배포하기(2)

- Vercel에 Github repository를 연동하여 배포하는 과정 실습
- 단, Vercel에서는 File Write 권한이 없음.

### 07. 연습 정리

- 1~6강 강의 내용 정리/요약 설명.

## Ch 02. 블로그 커스텀해보기

### 01. 나만의 블로그 만들기(UI) (1)

- [블로그 테마 저장소](https://jamstackthemes.dev)에서 여러 블로그 테마 참고 가능
- [TailwindCSS 적용 가이드](https://tailwindcss.com/docs/guides/nextjs)를 참고하여 프로젝트 셋업 (**VSCode Extensions - Tailwind CSS Intellisense, PostCSS Language Support 설치 필요**)
- 요구사항
  - [TailwindCSS](https://tailwindcss.com/)를 사용해본다. (npm: `tailwindcss`, `postcss`, `autoprefixer`)
  - [무료 SVG를 다운로드](https://www.iconpacks.net/)하여 사용해본다.
  - 다크모드/라이트모드 전환 가능해야하며, Icon button을 누르면 mode 바뀐다. 새로고침을 유지되어야 한다.
  - posts 폴더에 .md 뿐 아니라 .mdx (md + jsx)도 지원하게 한다. (npm: `next-mdx-remote`)
  - code block 은 스타일링을 통해 이쁘게 노출시켜주며 우상단 copy 버튼을 클릭하면 코드 내용이 복사된다. (npm: `react-syntax-highlighter`)

### 02. 나만의 블로그 만들기(UI) (2)

- Component를 만들고 mdx에서 호출하여 화면에 보여주는 기능 완성.

### 03. 나만의 블로그 만들기(기능) (1)

- SEO를 위한 도구

  - robots.txt : 검색엔진/크롤러 등이 이 사이트의 내용을 수집해가도 되는지 권한 체크를 하는 페이지
  - sitemap.xml : 도메인 내 페이지 목록
  - `next-sitemap` 라이브러리 사용하여 위 두가지 파일 모두 자동화 가능 (`next-sitemap.config.js` 파일 참고)

- 댓글 기능
  - [`utterances`](https://utteranc.es/)를 이용해 Github 기반 댓글기능 구현 가능
  - Github의 Issues와 Comments 기능을 활용하기에 Github Public Repsitory가 필요하다.
  - [`Github Markeplace`](https://github.com/marketplace)에서 Utterances 설치 필요
  - `Utterances` 세팅 후 기능 구현 (`Utterances.js` 파일 참고, 세팅 내용은 강의영상 참고)

### 04. 나만의 블로그 만들기(기능) (2)

- ESLint
  - eslint 패키지 설치 (`npm i -D eslint`)
  - `package.json` > `scripts` > `eslint --init` 등록 후 실행 (실행 후 삭제)
  - `.eslintrc.json` > `rules` > 오류 예외처리 항목 추가
  - tailwind plugin 설치 (`npm i -D eslint-plugin-tailwindcss`) > `.eslintrc.json` 수정
  - [next.js 설정](https://nextjs.org/docs/basic-features/eslint) (`npm i -D @next/eslint-plugin-next`) > `.eslintrc.json` 수정

## Ch 03. 프론트엔드 개발자를 위한 꿀팁

### 01. 프론트엔드 개발자가 알아야 할 기술

1. 좋은 프론트엔드 개발자가 되기 위해서는 어떤 부분을 신경써야 할까요?

- 개방적인 자세, 꾸준한 학습

2. 프론트엔드 개발자가 퍼블리싱/알고리즘/배포/백엔드 등에 대한 지식이 필요한가?

- 필요하다. [프론트엔드 개발자 로드맵](https://roadmap.sh/frontend), [리액트 개발자 로드맵](https://roadmap.sh/react)
- 패러다임이 빠르게 변하기에 항상 공부하는 것이 중요하다.

### 02. 부족한 부분을 채우는 방법

1. 무엇을 모르는 지 아는 것이 중요하다.

- 로드맵을 통해 큰 그림 안에서 모르는 부분을 찾거나 풀 수 없는 문제를 만나봐야 한다.
- 비슷한 라이브러리들을 찾아본다 (ex: moment와 비슷한 라이브러리 찾는 방법 : 1. npm trends, 2. moment alternatives 검색)

2. 꾸준히 배운 것을 프로젝트로 만들어봐야 한다.

## Ch 04. React 프로젝트 마이그레이션

### 01. React Project Next.js로 마이그레이션 1

- CRA를 next.js로 마이그레이션 [공식문서](https://nextjs.org/docs/migrating/from-create-react-app), 자세한 내용은 강의 영상 참고.

### 02. React Project Next.js로 마이그레이션 2

- CRA로 만든 react-router 프로젝트를 next.js로 마이그레이션 [공식문서](https://nextjs.org/docs/migrating/from-react-router), 자세한 내용은 강의 영상 참고.
