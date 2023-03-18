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

#### 01. Next.js 기본 1 (프레임워크 구조)

- public 폴더는 컴포넌트 내에서 루트 경로로 접근 가능
  - ex) 파일 경로: `/public/favicon.ico`
  - ex) 접근 경로: `<link rel="icon" href="/favicon.ico" />`

#### 02. Next.js 기본 2 (Data Fetching)

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
      paths: [
        {params: { boardID: "1", postID: "1002" }},
        {params: { boardID: "2", postID: "1006" }},
      ],
      fallback: false, //false | true | blocking
    }
  }

  export async function getStaticProps({ params }) {
    const response = await fetch(`https://example.com/${params.boardID}/${params.postID}`);
    const post = response.json();

    return {
      props: { post }
    }
  }

  export default function Post({ post }) {
    return (
      <>
        {post}
      </>
    );
  }
  ```

