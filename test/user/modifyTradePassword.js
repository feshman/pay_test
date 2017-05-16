import { expect } from 'chai'
import { context } from '../../context'
import request from 'supertest'

describe('修改交易密码', () => {
  before(async done => {
    console.warn(context.services.user)
    let x = await context.services.user.openAccount(context.user, 'liqi')
    console.warn(x)
  })

  it('成功修改交易密码', done => {
    // let mock = {
    //   newPassWord1: 111112,
    //   newPassWord2: 111112,
    //   oldPassWord: 111111,
    //   userId: context.user.userId,
    //   userType: "01"
    // }
    
    // request('http://172.28.32.13:8081')
    //   .post('/user/modifyTradePassword')
    //   .set(context.user.headers)
    //   .send(mock)
    //   .expect(function(res) {
    //     console.warn(res.text)
    //     // expect(res.body.meta.code).to.be.not.equal(100010)
    //   })
    //   .end(function(err, res) {
    //     if (err) throw err;
    //     done()
    //   });
  })
})