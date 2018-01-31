import Koa from 'koa';
import router from 'koa-simple-router';
import co from 'co';
import path from 'path';
import render from 'koa-swig';
import server from 'koa-static';
import config from './config/config.js';
import log4js from 'log4js';
import errorHandler from './meddleware/errorHandler';

import { createContainer, Lifetime, asValue } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

const app = new Koa();
const logDir = path.join(__dirname, 'logs') //配置目标路径 logs
// 1、灵魂 IOC容器
const container = createContainer();
// 2、关键点 将所有的container的service 服务到每一个路由中去 DI
container.loadModules(['servers/*.js'], {
    formatName: 'camelCase',
    registrationOptions: {
        lifetime: Lifetime.SCOPED
    }
})
// 3、Service中心注入到对应Controller中去！！！
app.use(scopePerRequest(container));
// 注入一个贯穿值，可以验证是否登录
app.use((ctx, next) => {
    ctx.state.container.register({
        user: asValue("di")
    })
    return next();
});

app.use(server(config.staticDir));
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));

log4js.configure({
    appenders: {
        index: {
            type: 'dateFile',
            filename: logDir + '/log4',
            "maxLogSize": 1024,
            "backups": 3,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    categories: {
        default: {
            appenders: ['index'],
            level: 'debug'
        }
    }
});
const logger = log4js.getLogger('index');
app.context.logger = logger;
logger.info('server started')
errorHandler.error(app); //处理页面错误的处理句柄
// 初始化所有路由 ctx 上下文顺利的传输
app.use(loadControllers('routers/*.js', { cwd: __dirname }))

app.listen(config.port, () => {
    console.log('Server is start, listening on port %s', config.port);
});