const fs = require('fs')
const path = require('path')

const writeTimestamp = async (timeStamp) => new Promise(res => {
  fs.appendFile('./files/time.txt', `${timeStamp}`, (error) => res())
})

const deleteFile = async () => new Promise(res => {
  fs.unlink('./files/time.txt', (error) => res())
})

const repeat = async () => {
  try {
    await deleteFile()
    await writeTimestamp(new Date().toISOString())
  } catch (error) { }
  setTimeout(() => repeat(), 5000)
}

repeat()