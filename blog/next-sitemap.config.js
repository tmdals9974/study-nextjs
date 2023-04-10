/** @type {import('next-sitemap').ICnfig} */
// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: 'https://example.com', //프로젝트 배포 도메인 입력
  generateRobotsTxt: true,
};

//package.json scripts에 postbuild를 통해서 build 후 자동동작.
