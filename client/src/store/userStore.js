import axios from "axios";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { API_URL } from "../http/index";
export default class UserStore {
    user = {}
    isAuth = false
    isInstructor = false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool;
    }
    setInstructor(bool) {
        this.isInstructor = bool;
    }
    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
           
            if(response.data.user.role === 2) {
                this.setInstructor(true)
            }
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async registration(first_name, last_name, email, password) {
        try {
            const response = await AuthService.registration(first_name, last_name, email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        }
    }
    async instructorRegistration(contactEmaill, telephone, biography, university, userId) {
        try {
            const response = await UserService.instructorRegistration(contactEmaill, telephone, biography, university, userId);
            this.setInstructor(true);
        } catch (error) {
            
        }
    }
    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        }
    }
    async logout() {
        try {
            const response  = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({})
        } catch (error) {
            console.log(error)
        }
    }
}