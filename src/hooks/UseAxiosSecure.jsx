import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

const UseAxiosSecure = () => {

    return instance;
};

export default UseAxiosSecure;