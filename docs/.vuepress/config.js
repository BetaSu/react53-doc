const {description} = require('../../package.json');

module.exports = {
  lang: 'zh-CN',
  title: '5年React三年模拟',
  base: '/react53-doc/',
  description,
  themeConfig: {
    logo: 'https://ftp.bmp.ovh/imgs/2021/07/8ca4fe5532804c16.jpeg',
    repo: 'https://github.com/BetaSu/react-homework',
    sidebar: [
      {
        text: '本文档解决的问题',
        link: '/index.md'
      },
      {
        text: '第一课：框架工作原理',
        link: '/chart1.md'
      },
      {
        text: '第二课：组件遍历顺序',
        link: '/chart2.md'
      },     
      {
        text: '第二课：状态更新',
        link: '/chart3.md'
      },
      {
        text: '第四课：性能优化',
        link: '/chart4.md'
      },
    ],
    navbar: [
      {
        text: '🙋‍♂️一起学习',
        link: '/extra/me.md',
      },
    ],
  },
}