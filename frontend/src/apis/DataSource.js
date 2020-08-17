// TODO: implement functions to interface with your api here
// You can either use the standard fetch API, or install axios or any other 3rd party library.

// You can also feel free to just do the API request in your component

// Also feel free to either use .then(response => ...).catch(e => ...) or async/await and try/catch syntax

// To interface correctly with CORS, make sure to use the base URL of http://localhost:5000

import axios from 'axios'

const baseUrl = "http://localhost:5000/";

const axiosConfig = {
    headers: {
        withCredentials: false,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};

export async function getMenu(){
    const res = await axios.get(baseUrl + 'api/menu/');
    console.log("items", typeof(res.data.results), res.data.results);
    return res.data.results;
}
export async function getTags(){
    const res = await axios.get(baseUrl + 'api/tags/');
    console.log("tags", typeof(res.data.results), res.data.results);
    return res.data.results;
}
export async function addItem(item){
    console.log("item", item)
    const res = await axios.post(baseUrl + 'api/menu/add/', item, axiosConfig);
    console.log("addItem", res.data);
}
export async function addTag(tag){
    const res = await axios.post(baseUrl + 'api/tags/add/', {name: tag}, axiosConfig);
    console.log("addTag", res.data);
}
