const {description} = require('../../package.json');

module.exports = {
  lang: 'zh-CN',
  title: 'React53的配套教科书',
  // base: '/react53-doc/',
  dest: './dist',
  description,
  themeConfig: {
    logo: 'https://ftp.bmp.ovh/imgs/2021/07/8ca4fe5532804c16.jpeg',
    repo: 'https://github.com/BetaSu/react53',
    repoLabel: "点亮⭐不迷路",
    sidebar: [
      {
        text: '本课程解决的问题',
        link: '/index.md'
      },
      {
        text: '第一课：工作原理概览',
        link: '/chart1.md'
      },
      {
        text: '第二课：render阶段概览',
        link: '/chart2.md'
      },     
      {
        text: '第三课：状态更新原理',
        link: '/chart3.md'
      },
      {
        text: '第四课：性能优化原理',
        link: '/chart4.md'
      },
    ],
    navbar: [
      // {
      //   text: '🙋‍♂️一起学习',
      //   link: '/extra/me.md',
      // },
    ],
  },
}