const { expect } = require('chai');
const axios = require('./axiosConfig.js');
let token;

const generateToken = async () => {
    try {
        await axios.post('/auth', {
            username: 'admin',
            password: 'password123'
        }).then(async (response) => {
            expect(response.status).to.equal(200);
            return token = await response.data.token;
        })
    } catch (error) {
        return error.response;
    }
}

const getBookingList = async () => {
    try {
        return await axios.get('/booking')
    } catch (error) {
        return error.response;
    }
}

const getBooking = async(id) => {
    try {
        return await axios.get(`/booking/${id}`);
    } catch (error) {
        return error.response;
    }
}

const createBooking = async(body) => {
    try {
        return await axios.post('/booking', body);
    } catch (error) {
        return error.response;
    }
}

const updateBooking = async(bookingid, body) => {
    try {
        return await axios.put(`/booking/${ bookingid }`, body, {
            headers: {
                Cookie: `token=${ token }`
            }
        });
    } catch (error) {
        return error.response;
    }
}

const partialUpdateBooking = async(bookingid, body) => {
    try {
        return await axios.patch(`/booking/${ bookingid }`, body, {
            headers: {
                Cookie: `token=${ token }`
            }
        });
    } catch (error) {
        return error.response
    }
}

const deleteBooking = async(id) => {
    try {
        return await axios.delete(`/booking/${id}`, {
            headers: {
                Cookie: `token=${ token }`
            }
        });
    } catch (error) {
        return error.response;
    }
}

module.exports = {
    generateToken,
    getBookingList,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking,
    partialUpdateBooking
}