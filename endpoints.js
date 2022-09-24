const axios = require('./axiosConfig.js');

const generateToken = async () => {
    try {
        return await axios.post('/auth', {
            username: 'admin',
            password: 'password123'
        });
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

//need to improve this, remove the token creation somewhere else, dont pass as param
const deleteBooking = async(id, token) => {
    try {
        return await axios.delete(`/booking/${id}`, {
            headers: {
                Cookie: `token=${token}`
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
    deleteBooking
}