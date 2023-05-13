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