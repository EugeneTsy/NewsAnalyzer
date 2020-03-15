import { errorPopup } from "../../utils/ErrorPopup.js";

class GithubApi {
  constructor() {
    this.url = "https://api.github.com/repos/EugeneTsy/NewsAnalyzer/commits";
  }

  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject({ Error: res.status, Reason: res.statusText });
  }

  getAllCommits() {
    return fetch(this.url, {
      method: "GET"
    })
      .then(res => this.getResponseJson(res))
      .catch(err => {
        errorPopup.error = err;
        errorPopup.showError();
      });
  }
}

export const githubApi = new GithubApi();
