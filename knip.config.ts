import type { KnipConfig } from 'knip';

export default {
  ignore: ['tests/**', 'public/sw.js'],
  ignoreDependencies: [],
  exclude: [],
  workspaces: {},
} satisfies KnipConfig;
