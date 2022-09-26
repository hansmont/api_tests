const { faker } = require('@faker-js/faker');

const generateBookingDetails = async () => {
    return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        totalprice: faker.commerce.price(100, 1000, 0),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: faker.lorem.sentence()
    }
}

const partialBookingDetails = {
    firstname: faker.name.firstName(),
    totalprice: faker.commerce.price(100, 1000, 0),
    additionalneeds: faker.lorem.sentence()
}

module.exports = {
    generateBookingDetails,
    partialBookingDetails
}