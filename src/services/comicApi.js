import axios from 'axios';

const timestamp = '1617803911';
const apikey = 'aa99639576e1a4a3469c32aede4d16bd';
const hash = 'e419cc9b5da7dce8bd014ec325efdf4b';
const url = 'https://gateway.marvel.com/v1/public/comics';
const limit = 20;

const comicApi = (comicId) => axios.create({
  baseURL: comicId
    ? `${url}/${comicId}?ts=${timestamp}&apikey=${apikey}&hash=${hash}&limit=${limit}`
    : `${url}?ts=${timestamp}&apikey=${apikey}&hash=${hash}&limit=${limit}`
});

export default comicApi;
