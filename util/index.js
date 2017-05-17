import cryptUtil from './crypt'

const util = {
  genId: len => {
    let res = ''
    for (let i=0; i<len; i++) {
      res += (Math.random(0, 1) * 9).toFixed().toString()
    }
    return res
  },

  genUserHeader: user => ({
    'content-type' : 'application/json',
    'X-Toon-User-Agent': user.agent,
    'X-Toon-User-ID': user.userId,
    'X-Toon-User-Token': user.token
  })

}
export default util