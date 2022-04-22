import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', { email, password })
    }

    static async registration(first_name, last_name, email, password) {
        return $api.post('/registration', { first_name, last_name, email, password })
    }

    
}