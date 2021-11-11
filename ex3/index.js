const randomStr = require('randomstring')

const value = randomStr.generate(32)

const repeat = () => {
  console.log(new Date().toISOString(), value)
  setTimeout(() => repeat(), 5000)
}

repeat()