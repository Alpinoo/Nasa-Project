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


    const completedLaunchData = {
        mission: 'Starz',
        rocket: 'MicroIce',
        target: 'Mars',
        launchDate: 'October 3, 2033',

    }
    const launchDataWithoutDate = {
        mission: 'Starz',
        rocket: 'MicroIce',
        target: 'Mars',

    }

    const wrongDateLaunch = {
        mission: 'Starz',
        rocket: 'MicroIce',
        target: 'Mars',
        launchDate: 'Hello there',

    }

    test('Should return 201 created',async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(completedLaunchData)
        .expect(201)

        //check if converted string is equal to the upcoming one
        const requestDate = new Date(completedLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()

        expect(responseDate).toBe(requestDate)
        expect(response.body).toMatchObject(launchDataWithoutDate) //toMatchObject checks if the objdct is a subset of another
        


    })

    test('Should catch missing required properties',async()=>{
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect(400) //bad request

        expect(response.body).toStrictEqual({
            error: 'Some of the required fields are missing' //from launchesController
        })
    })

    test('Should catch invalid date',async()=>{
        const response = await request(app)
        .post('/launches')
        .send(wrongDateLaunch)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid date'
        })
    })

})

