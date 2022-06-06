import { verifyBody } from "../../../src/services/user"

test('should verify authentication body request information and return true', () => {
    const response = verifyBody('mock-login', 'mock-password')
    expect(response).toBe(true)
})

test('should not verify authentication body request information and return true', () => {
    const response = verifyBody('mock-password')
    expect(response).toBe(undefined)
})