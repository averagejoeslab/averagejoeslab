import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Average Joes Lab',
  tagline: 'Democratizing research for citizen researchers - Open science by ordinary people',
  favicon: 'img/favicon.ico',
  
  // Custom title template for browser tabs
  titleDelimiter: '•',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://averagejoeslab.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain, use root path
  baseUrl: '/',

  // Ignore broken anchors for footer links that only exist on homepage
  onBrokenAnchors: 'warn',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'averagejoeslab', // Usually your GitHub org/user name.
  projectName: 'averagejoeslab', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/averagejoeslab/averagejoeslab/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/averagejoeslab/averagejoeslab/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // Blog configuration
          blogTitle: 'Average Joes Lab Research Blog',
          blogDescription: 'Insights, updates, and research from the Average Joes Lab community',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          authorsMapPath: 'authors.yml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Custom scripts for client-side fixes
  scripts: [
    {
      src: '/js/blogSidebarFix.js',
      async: true,
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ajlabs-logo-light.png',
    navbar: {
      title: 'Average Joes Lab',
      logo: {
        alt: 'Average Joes Lab Logo',
        src: 'img/ajlabs-logo-light.png',
        srcDark: 'img/ajlabs-logo-dark.png',
      },
      items: [

        {
          type: 'doc',
          docId: 'research-engineering/getting-started',
          position: 'left',
          label: 'Learning Path',
        },

        {
          type: 'dropdown',
          label: 'Research',
          position: 'left',
          items: [
            {
              label: 'Internal Papers',
              to: '/internal-papers',
            },
            {
              label: 'External Papers',
              to: '/external-papers',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://discord.gg/7gzZMAPuGr',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://github.com/averagejoeslab',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Research',
          items: [
            {
              label: 'Research Engineering Path',
              to: '/docs/intro',
            },

            {
              label: 'Internal Papers',
              to: '/internal-papers',
            },
            {
              label: 'External Papers',
              to: '/external-papers',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/7gzZMAPuGr',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/averagejoeslab',
            },
          ],
        },
        {
          title: 'Content',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'About Us',
              href: '/#story',
            },
            {
              label: 'Mission',
              href: '/#mission',
            },
          ],
        },
      ],
      copyright: `Copyright © 2025 Average Joes Lab - All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
