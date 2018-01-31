import { route, GET, POST, before } from 'awilix-koa' // or `awilix-router-core`
import authenticate from '../meddleware/authenticate'

@route('/users')
export default class UserAPI {
  constructor({ userService, user }) {
    this.userService = userService;
    this.user = user;
  }

  @route('/:id')
  @GET()
  @before([authenticate()])
  async getUser(ctx) {
    // console.log('贯穿值',this.user);
    const result = await this.userService.get(ctx.params.id);
    ctx.body = await ctx.render('index/pages/index.html', {
      title: 'index-title',
      content: 'this is a demo',
      message: "hello",
      data: result
    })
  }
}