import Login, {  USERS } from '../pageobjects/login.ts'


describe("Login", () => {
    for(const user of USERS) {
        before(`reset`, () => {
            Login.quickReset()
        })
        it(`${user.isValid ? "allows":"denies"} ${user.username} to log in`, async () => {
            await Login.assertLogin(user,)
        })
    }
})
