import LoginAssert from '../asserts/loginAssert.ts'



describe("Login", () => {
    for(const user of LoginAssert.USERS) {
        it(`${user.isValid ? "allows":"denies"} ${user.username} to log in`, async () => {
            await LoginAssert.assertLogin(user)
        })
    }
})
