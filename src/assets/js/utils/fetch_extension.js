import {Cookies} from "quasar";

function fetch_s(input, init) {
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

export {
  fetch_s
}
