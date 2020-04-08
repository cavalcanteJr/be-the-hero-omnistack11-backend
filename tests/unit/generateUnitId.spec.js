const generateUniqueId = require('../../src/utils/generateUniqueId')
const generateToken = require('../../src/utils/generateToken')
const jwt = require('jsonwebtoken')
const { promisify } = require("util")


describe('Generate Unique ID', () => {
    it ('should generate an unique ID', () => {
        const id = generateUniqueId()
        expect(id).toHaveLength(8)
    })
})
describe('Generate Unique Token', () => {
    it ('should generate an unique JWT', async () => {
        const id = generateToken()
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmOGFlZTBlIiwiaWF0IjoxNTg1ODc3MDYyLCJleHAiOjE1ODU5NjM0NjJ9.g45t4YXstTn7hecP3p1Q3fb1q5kWGMWaRlLuQfHFzKQ"

        const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
        console.log(decoded)

        expect(id).toHaveLength(8)
    })
})