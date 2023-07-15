const request = require('supertest')
const app = require('../src/app')

describe('GET /launches',()=>{
    test('Should return 200 success',async()=>{
        const response = await request(app)
        .get('/launches')
        .expect('Content-type',/json/) //check if content type is json
        .expect(200)
    })
})

describe('POST /launches',()=>{

    test('Should return 200 success',()=>{


    })

    test('Should catch missing required properties',()=>{})

    test('Should catch invalid date',()=>{})

})

