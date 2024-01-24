import { ApplicationError } from "../../errorHandler/applicationError.js"

export default class UserModel {

    constructor(name, email, password, id) {
        this.name = name
        this.email = email
        this.password = password
        this.id = id
    }

    static signup(name, email, password) {
        const newUser = new UserModel(name, email, password, users.length + 1)
        users.push(newUser)
        return newUser
    }

    static signin(email, password) {
        const user = users.find( u => u.email == email && u.password == password)
        if(!user) {
            throw new ApplicationError('Incorrect credentials', 401)
        }
        return user
    }

    static getAll() {
        return users
    }

    static get(userId) {
        const user = users.find( u => u.id == userId)
        return user
    }
}

let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'j',
    },
    {
        id: 2,
        name: 'Steve Smith',
        email: 'steve@gmail.com',
        password: 's',
    }
];