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