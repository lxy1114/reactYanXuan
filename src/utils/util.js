const getParams = (url) => {
  var obj = {}
  url = url.split('?')[1].split('&')
  for(var i in url){
    var name = url[i].split('=')[0]
    var val = url[i].split('=')[1]
    obj[name] = val
  }
  return obj
}

export default getParams
