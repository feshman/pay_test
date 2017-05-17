import { expect } from 'chai'
import { context } from '../../context'
import request from '../../lib/request'

let user, account

describe('获取充值记录', () => {
  before(async () => {
    // let { services } = context
    // user = await services.user.register()
    // account = await services.user.openAccount(user, 'liqi')
    // await services.user.setTradePassword(user, '111111')
  })

  it('无充值时获取充值记录', done => {
    done()
    // let mock = {
    //   newPassWord1: 111112,
    //   newPassWord2: 111112,
    //   oldPassWord: 111111,
    //   userId: user.userId,
    //   userType: "01",
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