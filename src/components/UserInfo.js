// USER INFO CLASS
export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._profileTitleSelector = document.querySelector(profileTitleSelector);
    this._profileSubtitleSelector = document.querySelector(profileSubtitleSelector);
  }
  // GET USER INFO METHOD
  getUserInfo() {
    const userData = {
      name: this._profileTitleSelector.textContent,
      profession: this._profileSubtitleSelector.textContent
    }
    return userData;
  }
  // SET USER INFO METHOD
  setUserInfo(userData) {
    this._profileTitleSelector.textContent = userData.name;
    this._profileSubtitleSelector.textContent = userData.profession;
  }
}
