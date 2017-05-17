import mysql from 'mysql'
import Promise from 'bluebird'

const poolAccount  = mysql.createPool({
  connectionLimit : 10,
  host            : '172.28.32.18',
  user            : 'syswinpay',
  password        : 'syswinpay',
  database        : 'syswin_pay_account',
  port            : 3316
});

let pools = {
  account: poolAccount,
  // channel: poolChannel,
  // trade  : poolTrade
}

Object.keys(pools).map(k => {
  Promise.promisifyAll(pools[k])
})

function dump(isOnlyTableStructure) {
  
}

function restore() {

}

export default pools
