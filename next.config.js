/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ['image.tmdb.org'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w500/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-sexy-blog/:path*',
        permanent: false, // 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정됨
      },
    ];
  },
  async rewrites() {
    console.log(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}`
    );
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=9a6f3cb7a0030a8e92c5120f48b69dba`,
      },
      {
        source: '/abc/:path*',
        destination: '/infinite/:path*',
      },
      {
        source: '/api/movies/:id',
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=9a6f3cb7a0030a8e92c5120f48b69dba`,
      },
    ];
  },
};

module.exports = nextConfig;
