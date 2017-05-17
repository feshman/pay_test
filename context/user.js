import _ from '../util'
import request from 'request'
import Promise from 'bluebird'
import md5 from 'blueimp-md5'
import { baseUrl } from './config'
import sign from '../util/sign'
import { des } from '../util/encryption'

function UserService() { }

UserService.prototype.register = async function () {
  let mockUser = {
    channel: "2001",
    deviceName: "vivo X7",
    deviceToken: "862819034202192",
    imei: "862819034202192",
    mobile: "15210383276",
    password: md5('12345678a'),
    teleCode: "0086",
    uuid: "862819034202192",
    agent: 'platform:android,deviceId:862819034202192,appVersion:3.3.2,platformVersion:22,toonType:100'
  }
  let body = {
    status: '1',
    userId: _.genId(7),
    userName: '15210383276',
    token: 'ddbdae7e-f80d-4d02-a846-4e50c8a8336f',
    ticket: '7B7D5CE2FB28957CC8BED621D3E20AB4',
    returnMsg: '登录成功',
    userInfo:
    {
      userId: 2766517,
      password: 'DE88E3E4AB202D87754078CBB2DF6063',
      email: '',
      emailStatus: 2,
      teleCode: '0086',
      mobilePhone: '15210383276',
      status: 1,
      loginProtectStatus: 1,
      birthday: '',
      answerToSecretQuestion: ''
    },
    loginErrorTimes: '5',
    userTopic: 's_2766517',
    version: 1494937572509
  }
  return Object.assign(mockUser, { userId: body.userId, token: body.token, username: body.userName })
}

UserService.prototype.openAccount = Promise.promisify(function (user, accountName, callback) {
  request.post({
    headers: _.genUserHeader(user),
    url: `${baseUrl}/user/openAccount`,
    json:  { userID: user.userId + 1, accountName }
  }, function(err, res, body) {
    callback(err, body)
  })
})

UserService.prototype.setTradePassword = Promise.promisify(function (user, password, callback) {
  let data = {
    password1: password,
    password2: password,
    userId: user.userId, 
    userType: '01'
  }
  let encodedPassword = des.encrypt(password, user.userId)
  request.post({
    headers: _.genUserHeader(user),
    url: `${baseUrl}/user/setTradePassword`,
    json: Object.assign(data, { password1: encodedPassword, password2: encodedPassword }, { sign: sign(data, ['password1', 'password2'], user.userId) })
  }, (err, res, body) => {
    console.warn(body)
    callback(err, body)
  })
})

UserService.prototype.getAccountInfo = Promise.promisify(function (user, accountName, callback) {
  request(
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'X-Toon-User-Token': user.token,
        'X-Toon-User-ID': user.userId,
        'X-Toon-User-Agent': user.agent,
      },
      url: `${baseUrl}/user/getAccountInfo`,
      qs: {
        userId: user.userId,
        userName: user.username,
        userType: '01'
      }
    },
    (err, res, body) => {
      callback(err, body)
    }
  )
})

export default new UserService();