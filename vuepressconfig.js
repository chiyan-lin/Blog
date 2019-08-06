module.exports = {
  title: 'this is jiazhi',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: 'http://makefriends.bs2dl.yy.com/bm1527318752610.png' }]
  ],
  host: '0.0.0.0',
  port: '8080',
  dest: 'public',
  base: 'Blog',
  serviceWorker: true,
  locales: {
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
  	/* 多语言的时候使用 */
    // locales: {
    //   '/': {
    //     // 多语言下拉菜单的标题
    //     selectText: '选择语言',
    //     // 该语言在下拉菜单中的标签
    //     label: '简体中文',
    //     // 编辑链接文字
    //     editLinkText: '在 GitHub 上编辑此页',
    //     // 当前 locale 的 algolia docsearch 选项
    //     algolia: {},
    //     nav: [
    //       { text: 'google一下', link: 'https://www.google.com/' }
    //     ],
    //     sidebar: {
    //       '/': [ { text: 'google一下', link: 'https://www.google.com/' }]
    //     }
    //   }
    // },
    nav: [
      { text: 'Home', link: 'https://google.com' },
      { text: 'Guide', link: 'https://google.com' },
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      },
      {
        text: 'Languages',
        items: [
          { text: 'Group1',
		        items: [
		          { text: 'Chinese', link: '/language/chinese' },
		          { text: 'Japanese', link: '/language/japanese' }
		        ]
          },
          { text: 'Group2',
		        items: [
		          { text: 'Chinese', link: '/language/chinese' },
		          { text: 'Japanese', link: '/language/japanese' }
				    ]
          }
        ]
      }
    ],
	  sidebar: [
	    ['/', '首页'],
	    ['/page1/', 'page1'],
	    {
        title: 'Group 1',
        // 控制这个分组展开状态
        collapsable: true,
        children: [
          ['/page1/', 'page1'],
          ['/page1/', 'page1'],
        ]
      }
	  ],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/algolia/docsearch-scraper.git',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  },
  markdown: {
  	lineNumbers: false
  },
  evergreen: true
}
