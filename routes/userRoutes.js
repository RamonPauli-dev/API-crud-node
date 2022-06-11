const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : []

    try {
        return JSON.parse(data)
    } catch (err) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()

            res.send({
                users
            })
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.sendStatus(201).send("user cadastrado!")
        })
        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {
                if(user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user;
            }))

            res.status(200).send("ok")
        })
        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            res.sendStatus(201).send("ok")
        })
}

module.exports = userRoute