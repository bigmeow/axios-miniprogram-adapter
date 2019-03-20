function getPlatForm () {
  switch (true) {
    case typeof wx === 'object':
      return wx
    case typeof swan === 'object':
      return swan
    case typeof my === 'object':
      return my
    default:
      return wx
  }
}
export default getPlatForm()
