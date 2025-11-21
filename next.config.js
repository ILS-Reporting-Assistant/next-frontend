/* eslint-disable @typescript-eslint/no-var-requires */
const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  webpack(config) {
    return config
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/pro-components',
    '@ant-design/pro-layout',
    '@ant-design/pro-list',
    '@ant-design/pro-descriptions',
    '@ant-design/pro-form',
    '@ant-design/pro-skeleton',
    '@ant-design/pro-field',
    '@ant-design/pro-utils',
    '@ant-design/pro-provider',
    '@ant-design/pro-card',
    '@ant-design/pro-table',
    'rc-pagination',
    'rc-picker',
    'rc-util',
    'rc-tree',
    'rc-tooltip',
    'rc-table',
  ],
})
