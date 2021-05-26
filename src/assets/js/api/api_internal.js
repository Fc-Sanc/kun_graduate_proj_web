export const base_url = 'http://localhost:7734'

export function get_image_url(image_url) {
  return `http://localhost:7734/test/get_uploaded_image?imagePath=${image_url}`
}

export const api = {
  register: {
    user: {
      url: `${base_url}/register/user`,
      method: 'POST',
      body: {
        username: '',
        password: '',
        portraitUrl: '',
      }
    }
  },
  login: {
    user: {
      url: `${base_url}/login/user`,
      method: 'POST',
      body: {
        username: '',
        password: '',
      }
    }
  },
  user_detail(id) {
    return {
      url: `${base_url}/user/detail/${id}`,
      method: 'GET',
    }
  },
  self_detail: {
    url: `${base_url}/user/detail`,
    method: 'GET',
  }

}
