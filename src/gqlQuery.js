import { gql } from "@apollo/client";

export const gqlHomes = gql`
    query Homes($page: Int, $perPage: Int, $keywordSearch: String, $category: String) {
        Homes(
            page: $page
            perPage: $perPage
            keywordSearch: $keywordSearch
            category: $category
        ){
            status
            total
            executionTime
            data{
                id: _id
                title
                nameSubname
                idCard
                amount
                dateTranfer
                description
                tels
                banks {
                    id: _id
                    bankAccountName
                    bank {
                        id: _id
                        name
                        description
                        isPublish
                    }
                }
                follows
                files {
                    id: _id
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

export const gqlPosts = gql`
    query Posts($page: Int, $perPage: Int) {
        Posts(
            page: $page
            perPage: $perPage
        ){
            status
            total
            executionTime
            data {
                id: _id
                title
                nameSubname
                idCard
                amount
                dateTranfer
                description
                tels
                follows
                isPublish
                owner_id
                createdAt
                updatedAt
                banks {
                    id: _id
                    bankAccountName
                    bank {
                    _id
                    name
                    description
                    isPublish
                    }
                }
                files {
                    id:_id
                    base64
                    fileName
                    lastModified
                    size
                    type
                }
            }
        }
    }`;

export const gqlPost = gql`
    query Post($id: ID!) {
        Post(_id: $id) {
            status 
            executionTime
            data {
                id: _id
                title
                nameSubname
                idCard
                amount
                dateTranfer
                # body
                description
                banks{
                    bankAccountName
                    bank{
                        id: _id
                        name
                        description
                        isPublish
                    }
                }
                follows
                files{
                    id: _id
                    base64
                    fileName
                    lastModified
                    size
                    type
                }
                tels
                isPublish
                owner_id
                createdAt
                updatedAt
            }
        }
    }`;

export const gqlUsers = gql`
    query Users($page: Int, $perPage: Int){
        Users(
            page: $page
            perPage: $perPage
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

export const gqlUser = gql`
    query User($id: ID!) {
        User(_id: $id) {
            status 
            executionTime
            data {
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

export const gqlRoles = gql`
    query Roles($page: Int, $perPage: Int){
        Roles(
            page: $page
            perPage: $perPage
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
 
export const gqlBanks = gql`
    query Banks($page: Int, $perPage: Int){
        Banks(
            page: $page
            perPage: $perPage
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

export const gqlSockets = gql`
    query Sockets($page: Int, $perPage: Int){
        Sockets(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                socketId
                description
            }
        }
    }`;

export const gqlThemeMails = gql`
    query Mails($page: Int, $perPage: Int){
        Mails(
            page: $page
            perPage: $perPage
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

export const gqlReports = gql`
    query Reports($page: Int, $perPage: Int){
        Reports(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                userId
                description
            }
        }
    }`;


//////////////////  mutation  ///////////////////
export const gqlCreateUser = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id: _id
    }
  }`;

export const gqlCreatePost = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      id: _id
    }
  }`;

export const gqlUpdatePost = gql`
  mutation UpdatePost($id: ID!, $input: PostInput) {
    updatePost(_id: $id, input: $input) {
      id: _id
    }
  }`;

//////////////////  mutation  ///////////////////