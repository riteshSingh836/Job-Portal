

export default class userModel {
    constructor (id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser (name, email, password) {
        let newUser = new userModel(users.length+1, name, email, password);
        users.push(newUser);
    }

    static isValidUser(email, password) {
        const result = users.find((u) => u.email == email && u.password == password);
        return result;
    }
}

var users = [];