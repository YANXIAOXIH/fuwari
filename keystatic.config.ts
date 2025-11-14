import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO,
  },

  // ===============================================
  // 单例：用于全站唯一的配置，如网站设置
  // ===============================================
  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'src/config/settings.json',
      format: { data: 'json' },
      schema: {
        site: fields.object({
          title: fields.text({ label: 'Site Title' }),
          subtitle: fields.text({ label: 'Site Subtitle' }),
          lang: fields.text({ label: 'Language Code', description: "例如 'en', 'zh_CN', 'ja'" }),
          themeColor: fields.object({
            hue: fields.integer({ label: 'Theme Color Hue', description: "色相值，从 0 到 360" }),
            fixed: fields.checkbox({ label: 'Fix Theme Color', description: "为访客隐藏主题颜色选择器" }),
          }, { label: 'Theme Color' }),
          banner: fields.object({
            enable: fields.checkbox({ label: 'Enable Banner' }),
            src: fields.image({ label: 'Banner Image', directory: 'public/images/site', publicPath: '/images/site/' }),
            position: fields.select({
              label: 'Banner Position',
              options: [{ label: 'Top', value: 'top' }, { label: 'Center', value: 'center' }, { label: 'Bottom', value: 'bottom' }],
              defaultValue: 'center'
            }),
            credit: fields.object({
              enable: fields.checkbox({ label: 'Enable Image Credit' }),
              text: fields.text({ label: 'Credit Text' }),
              url: fields.url({ label: 'Credit URL' }),
            }, { label: 'Banner Credit' }),
          }, { label: 'Banner' }),
          toc: fields.object({
            enable: fields.checkbox({ label: 'Enable Table of Contents' }),
            depth: fields.integer({ label: 'TOC Depth', defaultValue: 2, validation: { min: 1, max: 3 } }),
          }, { label: 'Table of Contents' }),
          favicon: fields.array(
            fields.object({
                src: fields.text({ label: 'Path', description: "相对于 /public 目录的路径" }),
                theme: fields.select({ label: 'Theme', options: [{label: 'Light', value: 'light'}, {label: 'Dark', value: 'dark'}], defaultValue: 'light', }),
                sizes: fields.text({ label: 'Sizes', description: "例如 '32x32'" }),
            }), { label: 'Favicon', itemLabel: props => props.fields.src.value }
          )
        }, { label: 'Site Config' }),

        navBar: fields.object({
          links: fields.array(
            fields.object({
              name: fields.text({ label: 'Link Name' }),
              url: fields.text({ label: 'URL' }),
              external: fields.checkbox({ label: 'External Link?' }),
            }),
            {
              label: 'Navigation Links',
              itemLabel: props => props.fields.name.value
            }
          ),
        }, { label: 'Navigation Bar' }),
        
        profile: fields.object({
          avatar: fields.image({ label: 'Avatar', directory: 'public/images/site', publicPath: '/images/site/' }),
          name: fields.text({ label: 'Profile Name' }),
          bio: fields.text({ label: 'Bio', multiline: true }),
          links: fields.array(
            fields.object({
              name: fields.text({ label: 'Social Link Name' }),
              icon: fields.text({ label: 'Icon Code', description: "来自 icones.js.org 的代码" }),
              url: fields.url({ label: 'URL' }),
            }),
            {
              label: 'Social Links',
              itemLabel: props => props.fields.name.value
            }
          ),
        }, { label: 'Profile' }),

        license: fields.object({
          enable: fields.checkbox({ label: 'Enable License' }),
          name: fields.text({ label: 'License Name' }),
          url: fields.url({ label: 'License URL' }),
        }, { label: 'License' }),
        
        expressiveCode: fields.object({
            theme: fields.select({
                label: 'Code Block Theme',
                options: [
                    { label: 'GitHub Dark', value: 'github-dark' },
                    { label: 'Night Owl', value: 'night-owl' },
                    { label: 'Dracula', value: 'dracula' },
                ],
                defaultValue: 'github-dark'
            })
        }, {label: 'Expressive Code'})
      },
    }),
  },

  // ===============================================
  // 集合：用于博客文章等重复性内容
  // ===============================================
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/**',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        published: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
        updated: fields.date({ label: 'Updated Date' }),
        draft: fields.checkbox({ label: 'Draft' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/'
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value }),
        category: fields.text({ label: 'Category' }),
        lang: fields.text({ label: 'Language' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),

    pages: collection({
      label: 'About Pages',
      path: 'src/content/spec/*',
      format: 'frontmatter',
      schema: {
        content: fields.markdoc({ label: 'Page Content' }),
      },
    }),
  },
});
