export default () => ({
  URL: process.env.REDIS_URL || 'redis://localhost:6379',
});
