module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pages/auth/login",
        permanent: true,
      },
    ];
  },
};
