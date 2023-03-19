// USER INFO CLASS
export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._profileTitleSelector = profileTitleSelector;
    this._profileSubtitleSelector = profileSubtitleSelector;
  }
  // GET USER INFO METHOD
  getUserInfo() {
    const userData = {
      name: document.querySelector(this._profileTitleSelector).textContent,
      profession: document.querySelector(this._profileSubtitleSelector).textContent
    }
    return userData;
  }
  // SET USER INFO METHOD
  setUserInfo(userData) {
    document.querySelector(this._profileTitleSelector).textContent = userData.name;
    console.log(userData)
    document.querySelector(this._profileSubtitleSelector).textContent = userData.profession;
  }
}
