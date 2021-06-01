import {Cookies, Notify} from "quasar";
import {apiInternal} from "src/router";

export function fetch_s(input, init) {
  let token = Cookies.get('token')
  if (token != null) {
    if (init.headers != null) {
      init.headers.Authorization = token
    } else {
      init.headers = {
        'Authorization': token
      }
    }
  }
  return fetch(input, init).then(promise => promise.json())
}

export function checkLogin(fail) {
  let userId = Cookies.get('user_id')
  if (userId) {
    let api = apiInternal.api.user.check_login
    fetch_s(api.url, {method: api.method}).then(result => {
      if (result.code === 0 && result.data === true) {
        console.log('login check pass.')
        return
      } else {
        console.log('login check failed.')
        Notify.create('登录信息失效或未登录，请先登录后再进行操作')
        Cookies.remove('token');
        Cookies.remove('user_id')
        Cookies.remove('username')
        Cookies.remove('portrait_url')
        fail()
      }
    })
  } else {
    console.log('not login.')
    Notify.create('请登录后进行操作')
    Cookies.remove('token');
    Cookies.remove('user_id')
    Cookies.remove('username')
    Cookies.remove('portrait_url')
    fail()
  }

}
