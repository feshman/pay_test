import db from '../../context/db'
import Promise from 'bluebird'

before(async () => {
  let connection = null
  try {
    connection = await db.account.getConnectionAsync()
  } catch(e) {
    console.error(e)
  }  
})

describe('商户开户', () => {
  it('', async () => {
    
  })
})