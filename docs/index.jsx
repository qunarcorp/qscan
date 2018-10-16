---
banner:
  name: '高度可定制的扫码工具'
  desc: '基于 appium 的扫码方案，可灵活配置'
  btns: 
    - { name: '开 始', href: './documents/index.html', primary: true }
    - { name: 'Github >', href: 'https://github.com/qunarcorp' }
  caption: '当前版本: v0.0.1'
features: 
  - { name: '纯粹', desc: '为了保证核心代码的纯粹，我们只提供最纯粹的自动扫码功能' }
  - { name: '灵活', desc: '它可以作为一个 node 模块使用、作为一个 koa/express 中间件使用，因此使用起来非常灵活' }

footer:
  copyRight:
    name: 'YMFE Team'
    href: 'https://ymfe.org/'
  links:
    团队网址:
      - { name: 'YMFE', href: 'https://ymfe.org/' }
      - { name: 'YMFE Blog', href: 'https://blog.ymfe.org/' }
    Git仓库:
      - { name: 'Github', href: 'https://github.com/YMFE/ydoc' }
      - { name: 'Github Issue', href: 'https://github.com/YMFE/ydoc/issues' }

---

<Homepage banner={banner} features={features} />
<Footer distPath={props.page.distPath} copyRight={props.footer.copyRight} links={props.footer.links} />