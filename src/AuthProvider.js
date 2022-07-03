import { gql } from "@apollo/client";
// import { client } from './components/provider/ApolloClient';

const _  = require('lodash')

// in src/authProvider.js
// export default {
//     // called when the user attempts to log in
//     login: async({ username, password }) => {
//         // localStorage.setItem('username', username);
//         // // localStorage.setItem('token', "token");
//         // // localStorage.setItem('permissions', 'admin');
//         // // accept all username/password combinations
//         // return Promise.resolve();

//         let query = gql`
//                         query Login{
//                             Login(username: "${username}", password: "${password}"){
//                                 status
//                                 messages
//                                 executionTime
//                                 data{
//                                     id: _id
//                                     username
//                                     password
//                                     email
//                                     displayName
//                                     roles
//                                 }
//                             }
//                         }`;

//         console.log("login gql :", query, username, password )
//         let json1 = await client().query({ query });

//         let {status, data, messages} = json1.data.Login

//         console.log("status, data : ", status, data, json1.data.Login)

        
//         if(status){

//             let login = json1.data.Login.data
//             let roles = login.roles

//             console.log("roles : ", JSON.stringify(roles))

//             localStorage.setItem('login', 'login');
//             localStorage.setItem('user',  JSON.stringify(data));
//             localStorage.setItem('username', username);
//             localStorage.setItem('permissions', JSON.stringify(roles))

//             return Promise.resolve({"status": true});
//         }
//         return Promise.reject(messages);
//         // accept all username/password combinations
//     },
//     // called when the user clicks on the logout button
//     logout: () => {
//         localStorage.removeItem('username');
//         localStorage.removeItem('user')
//         localStorage.removeItem('permissions');
//         return Promise.resolve();
//     },
//     // called when the API returns an error
//     checkError: ({ status }) => {
//         if (status === 401 || status === 403) {
//             localStorage.removeItem('username');
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     },
//     // called when the user navigates to a new location, to check for authentication
//     checkAuth: () => {
//         let user =localStorage.getItem("user");
//         if(!_.isEmpty(user)){
//             user =  JSON.parse(user)
//             return Promise.resolve(user)
//         }

//         console.log("checkAuth :", user)
//         return Promise.resolve();
//     },
//     // called when the user navigates to a new location, to check for permissions / roles
//     // getPermissions: () => Promise.resolve(),

//     getPermissions: () => {
//         const role = localStorage.getItem('permissions');
//         console.log("role :", role)
//         return role ? Promise.resolve(role) : Promise.resolve(['guest']);
//     },
//     getRoles: () => {
//         const role = localStorage.getItem('permissions');
//         console.log("getRoles :", role)
//         return role ? Promise.resolve(role) : Promise.reject();
//     },
//     register:() =>{
//        return Promise.resolve({"register" : 'bn'}) 
//     }
// };

const auth= (data) => {
    localStorage.setItem('user',  JSON.stringify(data));
    return true; 
}

// const register= async({ username, password }) => {
//     return Promise.resolve({"register" : 'bn'}) 
// }

const logout = () => {
    localStorage.removeItem('user')
    return true;
}

const getRoles = () => {
    return Promise.reject();
}

const checkAuth = () => {
    let user = localStorage.getItem("user");
    if(user != null){
        return JSON.parse(user);
    }
    return null;
}

// anonymous, authenticated, administrator
const getPermissions =() => {
    // localStorage.setItem('permissions', JSON.stringify(['anonymous']))
    // const role = JSON.parse(localStorage.getItem('permissions'));
    // console.log("role :", role)

    let user = checkAuth();
    if(user != null){
       return user.roles;
    }else{
        return [];
    }
    //? Promise.resolve(role) : Promise.resolve(['anonymous', 'administrator']);
}

const isAuth = () =>{

    /*
    62a2ccfbcf7946010d3c74a4: anonymous
    62a2ccfbcf7946010d3c74a6: authenticated
    62a2ccfbcf7946010d3c74a2: administrator
    */
    let permissions =  getPermissions();
    if( permissions && ( permissions.includes("administrator") || permissions.includes("authenticated") )){
       return true;
    }
    
    if( permissions && permissions.includes("anonymous")){
        return false;
    }
}

export {auth, logout, getRoles, getPermissions, checkAuth, isAuth};