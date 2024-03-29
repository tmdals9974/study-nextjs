# Part 5. Final Project : 커머스 서비스 만들기

## Ch 01. 개요

### 01. 커머스 서비스를 만드는 이유 ?

- 다양한 기능을 담을 수 있음 (회원/상품/검색/구매/게시판)

### 02. 프로젝트 생성 및 환경 설정

- 프로젝트 생성 명령어

  ```bash
  npx create-next-app@12.2.2 commerce --typescript
  ```

- 프로젝트 세팅
  - `npm i -D prettier`
  - github repository 생성 및 연동 **(강의내용엔 있으나, 내가 원하지 않아 적용하지 않음)**
  - lint-staged와 husky를 이용하여 깃 커밋 전 eslint & prettier 적용 설정 **(강의내용엔 있으나, 내가 원하지 않아 적용하지 않음)**

## Ch 02. 포트폴리오 실습 시작하기

### 01. Notion Public API 활용 (1)

- [Notion Developers](https://developers.notion.com/)
  - Developers API를 이용해 Workspace에 접근하여 CRUD 가능
    1. Workspace에 `새로운 페이지 추가` > `데이터베이스 - 전체 페이지`로 DB 생성
    2. [Integrations](https://www.notion.so/my-integrations) 생성 (API 토큰)
    3. Workspace > 연결 추가 > 생성한 Integrations 연결
    4. npm `@notionhq/client` 을 이용하여 CRUD 가능

### 01. Notion Public API 활용 (2)

- Notion CRUD API를 이용하여 예시 페이지 생성

### 02. Prisma & PlanetScale 활용 (1)

- [PlanetScale](https://planetscale.com)

  - MYSQL을 이용한 serverless database platform
  - [DB 생성 튜토리얼](https://docs.planetscale.com/docs/tutorials/planetscale-quick-start-guide)
  - [Nextjs와 연결 방법](https://docs.planetscale.com/docs/tutorials/connect-nextjs-app)

- [Prisma](https://www.prisma.io)
  - ORM 객체와 DB 맵핑 도구
  - [Prisma를 이용한 Nextjs Fullstack 예시](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes)

1. DB 생성 튜토리얼을 따라하여 categories, products 테이블 생성
2. `npm i -D prisma`
3. `npm i @prisma/client`
4. PlanetScale에서 Prisma용 Connect 생성 후 .env 파일 내용 복사
5. 아래와 같이 schema.prisma 파일 작성

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

model categories {
  id Int @id @default(autoincrement())
  name String
}

model products {
  id Int @id @default(autoincrement())
  name String
  image_url String?
  category_id Int

  @@index([category_id])
}
```

6. `npx prisma generate`
7. 아래 코드를 이용하여 사용 가능

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const products = await prisma.products.findMany();
```

### 02. Prisma & PlanetScale 활용 (2)

- PlanetScale Branch 활용법 소개
- Prisma API 소개

### 03. 스타일링 관련 라이브러리 살펴보기 TailwindCSS, Emotion

- [tailwind + nextjs](https://tailwindcss.com/docs/guides/nextjs)를 보고 tailwind 설치/설정 가능
- [Emotion](https://emotion.sh/docs/introduction)을 이용하여 CSS in JS 테스트

## Ch 03. 커머스 기능 구현하기

### 01. 상세 페이지 구현 (이미지 다루기) (1)

- 상세페이지 이미지를 위해 `react-image-gallery`와 `nuka-carousel` 라이브러리 비교

### 01. 상세 페이지 구현 (이미지 다루기) (2)

- `nuka-carousel`을 이용한 상세페이지 구현

### 02. 상세 페이지 구현 (콘텐츠 다루기) (1)

- SEO: robots.txt, sitemap ([next-sitemap](https://www.npmjs.com/package/next-sitemap)), meta og
- Editor: `npm i draft-js react-draft-wysiwyg`

### 02. 상세 페이지 구현 (콘텐츠 다루기) (2)

- Editor를 이용한 수정 기능 구현

### 03. 상품 목록 구현 (1)

- 상품 리스트를 가져오는 api와 페이지 구현

### 03. 상품 목록 구현 (2)

- 상품 리스트를 가져오는 3가지 방법 안내 (더보기 버튼/페이지네이션/인피니트 스크롤)
- 더보기/페이지네이션 구현, 인피니트 스크롤은 주의점 설명만

### 04. 카테고리 구현

- 페이지네이션 상품 목록에서, 카테고리를 필터링 하는 기능 구현

### 05. 검색 구현 (1)

- 검색 기능 구현
- `npx ts-node prisma/product-with-category.ts` 명령어로 데이터 주입

### 05. 검색 구현 (2)

- debounce 기능을 구현하여 타이핑이 끝난 후 검색 API 호출
- react-query 활용

### 06. 회원 체계 다루기

- 회원등급: 비회원/회원/휴면회원/탈퇴회원
- 로그인/회원가입의 단순화 필요 (OAuth)

### 07. 회원 가입 구현 (1)

- `@react-oauth/google` 라이브러리를 이용한 Google OAuth 기능 구현

### 07. 회원 가입 구현 (2)

- Google OAuth 로그인 시 Prisma Upsert로 유저정보 저장/업데이트 기능 구현

### 08. 로그인 구현 (1)

- [NextAuth.js](https://next-auth.js.org/)
- [NextAuth.js - Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- 위 두 라이브러리를 이용한 Google OAuth 로그인 구현. `@react-oauth/google`는 삭제.
- NextAuth 이용 시 User, Session, Account, VerificationToken 테이블이 필수임.
- cookie로 token을 보관하여 인증정보를 관리함.
- session은 db에 보관함.

### 08. 로그인 구현 (2)

- PlanetScale과 Prisma의 다양한 사용법 안내

### 09. 찜하기 구현 (1)

- WishList 테이블 생성
- 아이템 상세 페이지 구현

### 09. 찜하기 구현 (2)

- 아이템 상세 페이지에 찜하기 기능 구현

### 09. 찜하기 구현 (3)

- 아이템 상세 페이지에 찜하기 기능 최종 구현
