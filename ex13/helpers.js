const getFileName = () => {
  return `${new Date().toLocaleString("en-US").split(",")[0].replaceAll('/', '-')}.jpg`
}

module.exports = { getFileName }