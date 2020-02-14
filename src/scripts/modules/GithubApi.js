class GithubApi {
  constructor () {
    this.url = 'https://api.github.com/repos/EugeneTsy/NewsAnalyzer/commits';
  }

  
  getResponseJson(res) {
    if (res.ok) {
      return res.json()
    } else return Promise.reject(res.status);
  }
  
  getAllCommits () {
  return fetch(this.url, {
    method: 'GET',
  })
  .then(res => this.getResponseJson(res))
}
}