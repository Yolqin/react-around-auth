class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return (res.ok ? res.json() : Promise.reject('Error!' + res.statusText));
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._handleResponse(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._handleResponse(res))
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._handleResponse(res))
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "PUT"
    })
      .then(res => this._handleResponse(res))
  }

  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
      .then(res => this._handleResponse(res))
  }

  updateLikes(cardId, liked) {
    let method= 'DELETE';
    if(liked) method= 'PUT';

    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: method,
      headers: this._headers
    }).then(res => this._handleResponse(res));
  }

    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        })
            .then(res => this._handleResponse(res))
    }

  setUserAvatar({avatar}) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => this._handleResponse(res))
  }
}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "0b0810cc-19b7-4496-ab2f-26f1fe242520",
    "Content-Type": "application/json"
  }
});