import Taro from '@tarojs/taro'
export function getParams(url){
  var obj = {}
  if(url.indexOf('?') == -1) return
  url = url.split('?')[1].split('&')
  for(var i in url){
    var name = url[i].split('=')[0]
    var val = url[i].split('=')[1]
    obj[name] = val
  }
  return obj
}

export function toast(msg){
  Taro.showToast({
    title: msg,
    icon: 'none'
  })
}
