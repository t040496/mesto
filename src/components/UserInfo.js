export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profilePictureSelector }) {
    this._profileTitleSelector = document.querySelector(profileTitleSelector);
    this._profileSubtitleSelector = document.querySelector(profileSubtitleSelector);
    this._profilePictureSelector = document.querySelector(profilePictureSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._profileTitleSelector.textContent,
      about: this._profileSubtitleSelector.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    this._profileTitleSelector.textContent = userData.name;
    this._profileSubtitleSelector.textContent = userData.about;
    this._profilePictureSelector.src = userData.avatar;
    this._userId = userData._id;
  }

  getUserId() {
    return this._userId;
  }
}
