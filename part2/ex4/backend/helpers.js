const fs = require('fs')
const path = require('path')
const axios = require('axios')
const dir = path.join('/', 'usr', 'app', 'files')

const getFileName = () => {
  return `${new Date().toLocaleString("en-US").split(",")[0].replaceAll('/', '-')}.jpg`
}

const fetchImage = async () => {
  const filePath = path.join(dir, getFileName())
  if (fs.existsSync(filePath)) return

  const writer = fs.createWriteStream(filePath)
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream'
  })
  file = response.data.pipe(writer)
}

module.exports = { getFileName, fetchImage }