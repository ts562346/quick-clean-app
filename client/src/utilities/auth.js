import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        const previousPath = localStorage.getItem('previousPath');

        if (previousPath) {
            localStorage.removeItem('previousPath');
            window.location.assign(previousPath);
        } else {
            window.location.assign('/');
        }


    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('totalPrice');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;