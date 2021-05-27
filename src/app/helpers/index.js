import queryString from "qs";
import {reactLocalStorage} from "reactjs-localstorage";
import moment  from "moment";
import { get } from "idb-keyval";
import config  from "../../config";

export const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export function aclCheck(event) {
    let ACL = reactLocalStorage.getObject("acl");
    if(ACL && ACL.length){
        let  index = ACL.findIndex(x => x.value === event);
        if(index !== -1)
            return true
        else 
            return false  
    }else{
        return false
    }
}
export function camelize(str) {
    return str.split(" ").map(function(word,index){
    // If it is the first word make sure to lowercase all the chars.
        if(index === 0){
            return word.toLowerCase();
        }
        // If it is not the first word only upper case the first char and lowercase the rest.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
}


export function SetCartItems(data){
    reactLocalStorage.set("cartItems", JSON.stringify(data));
}  
export function GetCartItems(){
    let cart = reactLocalStorage.get("cartItems")
    if(cart)
        return JSON.parse(cart);
    else
        return []; 
} 
export function setCart(data){
    reactLocalStorage.setObject("cart", data);
}  
export function getCarts(){
    let cart = reactLocalStorage.getObject("cart")
    if(cart)
        return cart
    else
        return {}; 
}   

export const objToUrlParams = obj => {
    return queryString.stringify(cleanObject(obj));
};
export const generateRandomKey = obj => {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const capitalize = str => {  
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDate = date => {  
    return moment(date).format("DD MMMM  YYYY");
};

export function cleanObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}
export function generateURL(modules,fileName,type) {
    let URL = config.cloudFront
    if(URL && URL[modules] && URL[modules][type]){
        let cloudfrontUrl = URL[modules][type]
        return `${cloudfrontUrl}${fileName}`;
    }else{
        return ""
    }
}

export function orderCode(sorter) {
    let order = {};
    if (sorter && sorter.field)
        order = {
            [sorter.field]: [sorter.order]
        };
    return order;
}

export function orderMap(order) {
    const orderKeys = { descend: "DESC", ascend: "ASC" };
    return Object.keys(order).map(key => [key, orderKeys[order[key]]]);
}

export function getInexdata(modules){
    return new Promise((resolve, reject) => {
        get(modules)
            .then(val => { 
                resolve(val)
            }).catch(err => {
                reject(err)
            })
    });
}  