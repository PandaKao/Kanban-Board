import { jwtDecode, JwtPayload } from 'jwt-decode';


class AuthService {
  getProfile(): JwtPayload | null {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn(): boolean {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    if (!token || token.split('.').length !== 3) {
      console.log('Invalid token format');
      return true;
    }

    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      let expirationTime = 0;

      if (decoded.exp) {
        expirationTime = decoded.exp * 1000;
      }
      return Date.now() >= expirationTime;
    } catch (err) {
      console.log(err);
      return true;
    }
  }

  getToken(): string | null {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string, navigate: (path: string) => void) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    navigate('/'); 
  }

  logout(navigate: (path: string) => void) {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    navigate('/login');
  }
}

export default new AuthService();
