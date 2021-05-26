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
  return fetch(input, init)
}

export {
  fetch_s
}
