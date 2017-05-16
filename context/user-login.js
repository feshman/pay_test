const md5 = require('blueimp-md5')
const request = require('request')
const R = require('ramda')

export default function userLogin(context, done) {

  let mockUser = {
    channel: "2001",
    deviceName: "vivo X7",
    deviceToken: "862819034202192",
    imei: "862819034202192",
    mobile: "15210383276",
    password: md5('12345678a'),
    teleCode: "0086",
    uuid: "862819034202192"
  }

  let user = {
    agent: 'platform:android,deviceId:862819034202192,appVersion:3.3.2,platformVersion:22,toonType:100'
  }

  request
    .post({
      headers: {
        'content-type' : 'application/json',
        'X-Toon-User-Agent': user.agent
      },
      url:     'http://p100.api.new.user.systoon.com/user/loginWithPassword',
      json:    mockUser
    }, function(error, response, body){
      let { userInfo, token, ticket } = body.data
      Object.assign(user, userInfo)
      user['token'] = token
      user['ticket'] = ticket
      user.headers = {
        'X-Toon-User-ID': user.userId,
        'X-Toon-User-Token': user.token,
        'X-Toon-User-Agent': user.agent
      }
      user.plain = () => {
        return R.omit(['headers', 'plain'], user)
      }
      context.user = user
      done()
  });
}




