import { gql } from "@apollo/client";

import _ from "lodash";
import deepdash from "deepdash";

import {apolloClient} from "./ApolloClient";

// add deepdash to lodash
deepdash(_);

const getList = async (resource, params) => {
  console.log("getList :", resource)

  let page = 1
  let perPage = 20
  let field = null
  let order = null
  
  switch (resource) {
    case "posts": {

      let query = gql`
                query Posts{
                    Posts(
                    page: ${page}
                    perPage: ${perPage}
                    sortField: "${field}"
                    sortOrder: "${order}"
                    filter: ${JSON.stringify(null).replace(/"(\w+)":/g, '$1:').replace(/"(\d+)"/g, '$1')}
                  ){
                    status
                    total
                    executionTime
                    data{
                        id: _id
                        title
                        nameSubname
                        idCard
                        number
                        dateTranfer
                        body
                        banks{
                          user_bank
                          banks
                        }
                        follows
                        files{
                          base64
                          fileName
                          lastModified
                          size
                          type
                        }
                        isPublish
                        owner_id
                        createdAt
                        updatedAt
                    }
                  }
                }`;

      console.log("query :", query)

      let json1 = await apolloClient().query({ query } , { errorPolicy: 'all' });

      let data = json1.data.Posts.data
                let total = json1.data.Posts.total

      console.log("json1.data.Posts :", json1.data.Posts)
      return {
          data:  data,
          total
      }
    }

    case "users": {

      let query = gql`
                query Users{
                    Users(
                        page: ${page}
                        perPage: ${perPage}
                        sortField: "${field}"
                        sortOrder: "${order}"
                        filter: ${JSON.stringify(null).replace(/"(\w+)":/g, '$1:').replace(/"(\d+)"/g, '$1')}
                    ){
                        status 
                        total
                        executionTime
                        data{
                            id: _id
                            username 
                            password
                            email
                            displayName
                            roles
                            isActive
                            image{
                              _id
                              size
                              type
                              lastModified
                              base64
                            }
                            lastAccess
                        }
                    }
                    }`;

      console.log("json1 query >> ", query) 
      let json1 = await apolloClient().query({ query } , { errorPolicy: 'all' });

      console.log("json1 >> ", query, resource, json1) 
      let data = json1.data.Users.data
      let total = json1.data.Users.total
      return {
          data:  data,
          total
      }
    }

    case "roles":{
      let query = gql`
      query Roles{
          Roles(
              page: ${page}
              perPage: ${perPage}
              sortField: "${field}"
              sortOrder: "${order}"
              filter: ${JSON.stringify(null).replace(/"(\w+)":/g, '$1:').replace(/"(\d+)"/g, '$1')}
          ){
              status
              executionTime
              data{
                  id: _id
                  name
                  description
                  isPublish
              }
          }
          }`;

      let json1 = await apolloClient().query({ query } , { errorPolicy: 'all' });

      console.log("json1 >> ", query, resource, json1) 
      let data = json1.data.Roles.data
      return {
          data:  data,
          total:  data.length
      }
    }

    case "banks":{
      let query = gql`
      query Banks{
          Banks(
              page: ${page}
              perPage: ${perPage}
              sortField: "${field}"
              sortOrder: "${order}"
              filter: ${JSON.stringify(null).replace(/"(\w+)":/g, '$1:').replace(/"(\d+)"/g, '$1')}
          ){
              status
              executionTime
              data{
                  id: _id
                  name
                  description
                  isPublish
              }
          }
          }`;

      let json1 = await apolloClient().query({ query } , { errorPolicy: 'all' });

      console.log("json1 >> ", query, resource, json1) 
      let data = json1.data.Banks.data
      return {
          data:  data,
          total:  data.length
      }
    }

    case "mails":{
      let query = gql`
      query Mails{
          Mails(
              page: ${page}
              perPage: ${perPage}
              sortField: "${field}"
              sortOrder: "${order}"
              filter: ${JSON.stringify(null).replace(/"(\w+)":/g, '$1:').replace(/"(\d+)"/g, '$1')}
          ){
              status
              executionTime
              data{
                  id: _id
                  name
                  description
                  isPublish
              }
          }
          }`;

      let json1 = await apolloClient().query({ query } , { errorPolicy: 'all' });

      console.log("json1 >> ", query, resource, json1) 
      let data = json1.data.Mails.data
      return {
          data:  data,
          total:  data.length
      }

    }
  }
  return { A: "function getList" };
};

const getOne = () => {
  return "getOne";
};

const getMany = () => {
  return "getMany";
};

const getManyReference = () => {
  return "getManyReference";
};

const update = async (resource, params) => {
  return "function update";
};

const updateMany = async (resource, params) => {
  return "function updateMany";
};

const create = async (resource, params) => {
  return "function create";
};

const deleteOne = async (resource, params) => {
  return "function deleteOne";
};

const deleteMany = async (resource, params) => {
  return "function deleteMany";
};

export {
  getList,
  getOne,
  getMany,
  getManyReference,
  update,
  updateMany,
  create,
  deleteOne,
  deleteMany
};
