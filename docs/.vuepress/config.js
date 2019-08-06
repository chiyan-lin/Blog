module.exports = {
  base: '/Blog/',
  title: 'Gaidy Blog',
  description: '知识在于积累 滴水可穿石',
  serviceWorker: true,
  port: 8888,
  head: [
    ['link', { rel: 'icon', href: 'logo.ico' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': './src/'
      }
    }
  },
  themeConfig: {
    repo: 'Jiazhi-Lin/Blog',
    sidebar: [
      {
        title: '读书笔记',
        collapsable: true,
        children: [
          '/src/reading/decortaor.md'
        ]
      },
      {
        title: '服务器',
        collapsable: true,
        children: [
          '/src/tech/linux.md',
          '/src/tech/docker.md'
        ]
      },
      {
        title: 'css杂烩',
        collapsable: true,
        children: [
          '/src/cssDoc/linux.md'
        ]
      },
      {
        title: 'js小视',
        collapsable: true,
        children: [
          '/src/jsDoc/cros.md',
          '/src/jsDoc/post-get.md'
        ]
      },
      {
        title: 'node工具',
        collapsable: true,
        children: [
          '/src/tech/linux.md'
        ]
      },
      {
        title: 'vue组件及小记',
        collapsable: true,
        children: [
          '/src/vueDoc/vue-scroll-helper.md'
        ]
      }
    ]
  }
}
