
module.exports = class UserDto {
    email;
    id;
    role;
    first_name;
    last_name;

     constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.role = model.role_id;
        this.first_name = model.first_name;
        this.last_name = model.last_name;
    }
}