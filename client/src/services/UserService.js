import $api from "../http";

export default class UserService {
    

    static async instructorRegistration(contact_email, telephone, biography, univer_id, user_id) {
        return $api.post('/instructor-registration', { contact_email, telephone, biography, univer_id, user_id })
    }

    
}