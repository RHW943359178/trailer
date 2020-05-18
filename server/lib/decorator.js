const Router = require('koa-router')
const { reaolve, resolve } = require('path')
const glob = require('glob')

/**
 * ES6新增数据类型 Symbol，字符标识，一旦创建就不能修改
 */
const symbolPrefix = Symbol('prefix')

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, '.**/*.js')).forEach(require)
  }
}

const controller = path => target => (target.prototype[symbolPrefix] = path)