const { describe, it } = require('mocha');
const apiRequest = require('./endpoints.js');
const chai = require('chai');
const { expect } = require('chai');
const chaiJsonPattern = require("chai-json-pattern").default;
const _ = require('lodash');
const payload = require('./requestPayloads.js');

chai.use(chaiJsonPattern);
let bookingid;
let token;

before('Generate token for API request', async () => {
    const response = await apiRequest.generateToken();
    expect(response.status).to.equal(200);
    token = response.data.token;
});

describe('Create a new booking, and retrieve the booking details', async () => {
    it('Should create a new booking', async () => {
        //Act
        const response = await apiRequest.createBooking(payload.bookingDetails);

        //Assert
        expect(response.status).to.equal(200);
        expect(response.data).to.matchPattern(`{
            "bookingid": Number,
            "booking": {
                "firstname": "${ payload.bookingDetails.firstname }",
                "lastname": "${ payload.bookingDetails.lastname }",
                "totalprice": ${ payload.bookingDetails.totalprice },
                "depositpaid": ${ payload.bookingDetails.depositpaid },
                "bookingdates": {
                    "checkin": "${ payload.bookingDetails.bookingdates.checkin }",
                    "checkout": "${ payload.bookingDetails.bookingdates.checkout }",
                },
                "additionalneeds": "${ payload.bookingDetails.additionalneeds }"
            }
        }`);
        bookingid = response.data.bookingid;
    });

    it('Should retrieve the details of the newly created booking', async () => {
        const response = await apiRequest.getBooking(bookingid);
        expect(response.status).to.equal(200);
        expect(response.data).to.matchPattern(`{
            "firstname": "${ payload.bookingDetails.firstname }",
            "lastname": "${ payload.bookingDetails.lastname }",
            "totalprice": ${ payload.bookingDetails.totalprice },
            "depositpaid": ${ payload.bookingDetails.depositpaid },
            "bookingdates": {
                "checkin": "${ payload.bookingDetails.bookingdates.checkin }",
                "checkout": "${ payload.bookingDetails.bookingdates.checkout }",
            },
            "additionalneeds": "${ payload.bookingDetails.additionalneeds }"
        }`);
    });

    it('Should return the newly created booking on the booking list', async() => {
        const response = await apiRequest.getBookingList();
        expect(response.status).to.equal(200);
        const newBooking = _.find(response.data, _.matchesProperty('bookingid', bookingid));
        expect(newBooking).to.not.equal(undefined);
    });

    after('Delete booking', async() => {
        const response = await apiRequest.deleteBooking(bookingid, token);
        expect(response.status).to.equal(201);
    });
});

// describe('Updating an existing booking', async() => {
//     before('Create a booking', async () => {
//         const response = await apiRequest.createBooking(payload.bookingDetails);
//         expect(response.status).to.equal(200);
//         bookingid = response.data.bookingid;
//     });

//     it('Should allow users to update an existing booking', async() => {

//     });

//     it('Should show that the booking details has been updated', async() => {

//     });

//     it('Should allow users to partially update an existing booking', async() => {

//     });

//     it('Should show that the booking details has been updated', async () => {

//     });

//     after('Delete booking', async () => {
//         const response = await apiRequest.deleteBooking(bookingid, token);
//         expect(response.status).to.equal(201);
//     });
// });

describe('Deleting an existing booking', async () => {
    before('Create a booking', async () => {
        const response = await apiRequest.createBooking(payload.bookingDetails);
        expect(response.status).to.equal(200);
        bookingid = response.data.bookingid;
    });

    it('Should delete an existing booking', async () => {
        const response = await apiRequest.deleteBooking(bookingid, token);
        expect(response.status).to.equal(201);
        expect(response.data).to.equal('Created');
    });

    it('Should not return the deleted booking on the booking list', async () => {
        const response = await apiRequest.getBookingList();
        expect(response.status).to.equal(200);
        const newBooking = _.find(response.data, _.matchesProperty('bookingid', bookingid));
        expect(newBooking).to.equal(undefined);
    });

    it('Should not return any booking details after a booking is deleted', async () => {
        const response = await apiRequest.getBooking(bookingid);
        expect(response.status).to.equal(404);
        expect(response.data).to.equal('Not Found');
    });
});
