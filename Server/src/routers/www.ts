export {};
const Router = require('koa-router');

const Path = require('path');

const DAL = require(Path.resolve(__dirname, '../libs/dal'));

const router = new Router();
router.get('news', async (ctx) => {
  ctx.body = 'bbb';
});

router.get('/', async (ctx) => {
  ctx.body = '<p>WWW Root Test</p>';
});

module.exports = router.routes();
