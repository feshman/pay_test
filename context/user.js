const request = require('request')
const Promise = require('bluebird')

function UserService(){}

UserService.prototype.openAccount = Promise.promisify(function openAccount(user, accountName, callback){
  // request.get(
  //   {
  //     url: 'http://172.28.32.13:8081/user/getAccountInfo',
  //     qs: {
  //       userId: 'liqi',
  //       userName: 'liqi',
  //       userType: '01'
  //     }
  //   },
  //   function(err, res, body) {
  //     callback(err, body)
  //   }
  // )
  request.post({
    headers: {
      'content-type' : 'application/json',
      'X-Toon-User-Agent': user.agent
    },
    url: 'http://172.28.32.13:8081/user/openAccount',
    json:  { userID: user.userId, accountName }
  }, function(err, res, body) {
    callback(err, body)
  })
})

export default new UserService();