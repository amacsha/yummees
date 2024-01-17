class Auth {
  // Store the token in localStorage
  storeToken(token) {
    localStorage.setItem("accessToken", token);
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem("accessToken");
  }

  // Remove the token from localStorage
  clearToken() {
    localStorage.removeItem("accessToken");
  }

  // Check if the user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

 

    return true;
  }

  // Call this method when user logs in
  login(token, cb) {
    this.storeToken(token);
    cb?.();
  }

  // Call this method when user logs out
  logout(cb) {
    this.clearToken();
    cb?.();
  }
}

export default new Auth();
