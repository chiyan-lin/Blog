/**
 * Created by zhuliang on 2018/4/17.lien-upload
 */
module.exports = {
  base: '/doc/',
  title: '智仔的文档集合',
  description: '知识在于积累 滴水可穿石',
  port:8888,
  themeConfig: {
    repo: 'Jiazhi-Lin/doc',
    sidebar: [
      ['/', '前言'],
      ['/example/', '文章1'],
      ['/getstart/', '文章2'],
      ['/api/', '文章3'],
      ['/function/', '文章4']
    ],
  }
}
