import Login, { USERS } from '../pageobjects/login'


describe("Login", () => {
    USERS.forEach(user => {
        describe(`as ${user.username}`, () => {
            it(`should ${user.isValid ? "allow":"deny"} login`, async () => {
                await Login.open()
                await Login.login(user,true)
            })
        })
    });
})
