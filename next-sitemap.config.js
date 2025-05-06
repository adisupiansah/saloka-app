// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://saloka.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/404'],
  additionalPaths: async (params) => {
    return [
      { loc: '/', changefreq: 'daily', priority: 0.9 },
      { loc: '/auth', changefreq: 'weekly', priority: 0.8 },
      { loc: '/disposisi', changefreq: 'monthly', priority: 0.7 },
      { loc: '/notadinas', changefreq: 'monthly', priority: 0.6 },
      { loc: '/disposisi/input', changefreq: 'monthly', priority: 0.5 },
      { loc: '/notadinas/input', changefreq: 'monthly', priority: 0.4 },
      { loc: '/notadinas/arsip', changefreq: 'monthly', priority: 0.3 },
      { loc: '/notadinas/pengajuan', changefreq: 'monthly', priority: 0.2 },
    ];
  },
};