import { expect } from 'chai'
import { context } from '../../context'
import request from '../../lib/request'
import _ from '../../util'
import R from 'ramda'
import sign from '../../util/sign'

let user, account

describe('修改交易密码', () => {
  before(async () => {
    let { services } = context
    user = await services.user.register()
    account = await services.user.getAccountInfo(user, 'liqi')
    await services.user.setTradePassword(user, '111111')
  })

  it('成功修改交易密码', done => {
    let mock = {
      newPassWord1: 111112,
      newPassWord2: 111112,
      oldPassWord: 111111,
      userId: user.userId,
      userType: "01",
    }
    // encode
    // encodeUtil.encode(mock, ['newPassWord1', 'newPassWord2'])
    request
      .post('/user/modifyTradePassword')
      .set(_.genUserHeader(user))
      .set('sign', sign(mock, key, token))
      .send(mock)
      .expect(function(res) {
        console.warn(res.text)
        // expect(res.body.meta.code).to.be.not.equal(100010)
      })
      .end(function(err, res) {
        if (err) throw err;
        done()
      });


    
  })
})

