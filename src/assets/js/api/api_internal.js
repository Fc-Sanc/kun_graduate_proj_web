export const base_url = 'http://localhost:7734'

export function get_image_url(image_url) {
  return `http://localhost:7734/open/get_uploaded_image?imagePath=${image_url}`
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
  book: {
    best_sales: {
      url: `${base_url}/open/books/bestSales`,
      method: 'GET',
    },
    get(page, pageSize, type) {
      return {
        url: `${base_url}/open/books/get?page=${page}&pageSize=${pageSize}&type=${type}`,
        method: 'GET',
      }
    },
    search(keyword, page, pageSize) {
      return {
        url: `${base_url}/open/books/search/${keyword}/${page}/${pageSize}`,
        method: 'GET',
      }
    }
  },
  type: {
    get_all: {
      url: `${base_url}/open/type/get_all`,
      method: 'GET',
    }
  },
  fav: {
    get_by_user_id(userId) {
      return {
        url: `${base_url}/fav/user/${userId}`,
        method: 'GET',
      }
    },
    is_liked_by_user(userId, bookId) {
      return {
        url: `${base_url}/fav/user/${userId}/book/${bookId}`,
        method: 'GET',
      }
    },
    add: {
      url: `${base_url}/fav/add`,
      method: 'POST',
      body: {
        userId: '',
        bookId: '',
      }
    },
    remove: {
      url: `${base_url}/fav/remove`,
      method: 'DELETE',
      body: {
        userId: '',
        bookId: '',
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
