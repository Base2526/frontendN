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
                banks{
                    bankAccountName
                    bankId
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
                ownerId
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
                createdAt
                updatedAt
                banks{
                    bankAccountName
                    bankId
                }
                files {
                    id:_id
                    base64
                    fileName
                    lastModified
                    size
                    type
                }
                ownerId
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
                    bankId
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
                ownerId
                createdAt
                updatedAt
            }
        }
    }`;

export const gqlPostsByUserId =  gql`
    query PostsByUserId($userId: ID!) {
        postsByUserId(
            userId: $userId
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
                createdAt
                updatedAt
                banks{
                    bankAccountName
                    bankId
                }
                files {
                    id:_id
                    base64
                    fileName
                    lastModified
                    size
                    type
                }
                ownerId
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
                    id: _id
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

export const gqlRole = gql`
    query Role($id: ID!){
        Role(_id: $id){
            status
            executionTime
            data{
                id: _id
                name
                description
            }
        }
    }`;

export const gqlManyRoles = gql`
    query GetManyRoles($ids: [ID!]!){
        getManyRoles(_ids: $ids)
        {
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
            }
        }
    }`;

export const gqlBank = gql`
    query Bank($id: ID!){
        Bank(_id: $id){
            status
            executionTime
            data{
                id: _id
                name
                description
            }
        }
    }`;

export const gqlTContactUsList = gql`
    query TContactUsList($page: Int, $perPage: Int){
        TContactUsList(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                name
                description
            }
        }
    }`;

export const gqlTContactUs = gql`
    query TContactUs($id: ID!){
        TContactUs(_id: $id){
            status
            executionTime
            data{
                id: _id
                name
                description
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
                # description
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

export const gqlBookmarks = gql`
    query Bookmarks($page: Int, $perPage: Int){
        Bookmarks(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                userId
                postId
            }
        }
    }`;

export const gqlBookmarksByPostId = gql`
    query BookmarksByPostId($postId: ID!){
        bookmarksByPostId(
            postId: $postId
        ){
            status
            executionTime
            data {
                id: _id
                userId
                postId
                status
            }
        }
    }`;

export const gqlBookmarksByUserId = gql`
    query BookmarksByUserId($userId: ID!){
        bookmarksByUserId(
            userId: $userId
        ){
            status
            executionTime
            data {
                id: _id
                userId
                postId
                status
            }
        }
    }`;

export const gqlIsBookmark = gql`
    query IsBookmark($userId: ID!, $postId: ID!){
        isBookmark(
            userId: $userId
            postId: $postId
        ){
            status
            executionTime
            data{
                _id
                status
            }
        }
    }`;

export const gqlContactUs = gql`
    query ContactUsList($page: Int, $perPage: Int){
        ContactUsList(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                userId
                postId
                categoryId
                description
            }
        }
    }`;

export const gqlComment = gql`
    query Comment($postId: ID!) {
        comment(
            postId: $postId
        ){
            status
            executionTime
            data {
                userId
                comId
                fullName
                avatarUrl
                text
                replies {
                    userId
                    comId
                    fullName
                    avatarUrl
                    text
                }
            }
        }
    }`;

export const gqlShares = gql`
    query Shares($page: Int, $perPage: Int){
        Shares(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                userId
                postId
                destination
            }
        }
    }`;

export const gqlShareByPostId = gql`
    query ShareByPostId($postId: ID!, $page: Int, $perPage: Int){
        ShareByPostId(
            postId: $postId
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                userId
                postId
                destination
            }
        }
    }`;

export const gqlDblog = gql`
    query Dblog($page: Int, $perPage: Int){
        Dblog(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                level
                message
                timestamp
            }
        }
    }`;

export const gqlConversations = gql`
    query Conversations($userId: ID!){
        conversations(
            userId: $userId
        ){
            status
            executionTime
            data{
                id: _id
                members
            }
        }
    }`;

export const gqlMessage = gql`
    query Message($id: ID!){
        message(
            _id: $id
        ){
            status
            executionTime
            data{
                id: _id
                conversationId
                avatar
                date
                forwarded
                meeting
                position
                removeButton
                reply
                replyButton
                retracted
                status
                text
                theme
                title
                titleColor
                type
                view
            }
        }
    }`;

export const gqlBasicContent =  gql`
    query BasicContent($id: ID!){
        basicContent(_id: $id){
            status
            executionTime
            data{
                id: _id
                name
                description
            }
        }
    }`;

export const gqlBasicContents  = gql`
    query BasicContents($page: Int, $perPage: Int){
        basicContents(
            page: $page
            perPage: $perPage
        ){
            status
            executionTime
            data{
                id: _id
                name
                description
            }
        }
    }`;
    

export const gqlIsFollow = gql`
    query IsFollow($userId: ID!, $friendId: ID!){
        isFollow(
            userId: $userId
            friendId: $friendId
        ){
            status
            executionTime
            data{
                _id
                status
            }
        }
    }`;

export const gqlFollowerByUserId = gql`
    query FollowerByUserId($userId: ID!){
        followerByUserId(
            userId: $userId
        ){
            status
            executionTime
            data{
                id: _id
                userId
                status
            }
        }
    }`;

export const gqlFollowingByUserId = gql`
    query FollowingByUserId($userId: ID!){
        followingByUserId(
            userId: $userId
        ){
            status
            executionTime
            data{
                id: _id
                userId
                friendId
                status
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
            title
            nameSubname
            idCard
            amount
            dateTranfer
            description
            tels
            follows
            isPublish
            createdAt
            updatedAt
            banks{
                bankAccountName
                bankId
            }
            files {
                id:_id
                base64
                fileName
                lastModified
                size
                type
            }
            ownerId
        }
    }`;

export const gqlCreateBookmark = gql`
    mutation CreateBookmark($input: BookmarkInput) {
        createBookmark(input: $input) {
            _id
            userId
            postId
            status
        }
    }`;

export const gqlCreateRole = gql`
    mutation CreateRole($input: RoleInput) {
        createRole(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateBank = gql`
    mutation CreateBank($input: BankInput) {
        createBank(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateBasicContent = gql`
    mutation CreateBasicContent($input: BasicContentInput) {
        createBasicContent(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateContactUs = gql`
    mutation CreateContactUs($input: ContactUsInput) {
        createContactUs(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateTContactUs = gql`
    mutation CreateTContactUs($input: TContactUsInput) {
        createTContactUs(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateComment = gql`
    mutation CreateComment($input: CommentInput) {
        createComment(input: $input) {
            status
            executionTime
            data {
                userId
                comId
                fullName
                avatarUrl
                text
                replies {
                  userId
                  comId
                  fullName
                  avatarUrl
                  text
                }
            }
        }
    }`;

export const gqlCreateShare = gql`
    mutation CreateShare($input: ShareInput) {
        createShare(input: $input) {
            id: _id
        }
    }`;

export const gqlCreateConversation = gql`
    mutation CreateConversation($input: ConversationInput) {
        createConversation(input: $input) {
            id: _id
            members
        }
    }`;

export const gqlCreateAndUpdateFollow = gql`
    mutation CreateAndUpdateFollow($input: FollowInput) {
        createAndUpdateFollow(input: $input) {
            _id
            status
        }
    }`;

export const gqlAddMessage = gql`
    mutation AddMessage($input: MessageInput) {
        addMessage(input: $input) {
            id: _id
            conversationId
            avatar
            date
            forwarded
            meeting
            position
            removeButton
            reply
            replyButton
            retracted
            status
            text
            theme
            title
            titleColor
            type
            view
        }
    }`;

export const gqlUpdateUser = gql`
  mutation UpdateUser($id: ID!, $input: UserInput) {
    updateUser(_id: $id, input: $input) {
      id: _id
    }
    }`;

export const gqlUpdatePost = gql`
  mutation UpdatePost($id: ID!, $input: PostInput) {
        updatePost(_id: $id, input: $input) {
            id: _id
        }
    }`;
 
export const gqlUpdateRole = gql`
    mutation UpdateRole($id: ID!, $input: RoleInput) {
        updateRole(_id: $id, input: $input) {
            id: _id
        }
    }`;

export const gqlUpdateBank = gql`
    mutation UpdateBank($id: ID!, $input: BankInput) {
        updateBank(_id: $id, input: $input) {
            id: _id
        }
    }`;

export const gqlUpdateBasicContent = gql`
    mutation UpdateBasicContent($id: ID!, $input: BasicContentInput) {
        updateBasicContent(_id: $id, input: $input) {
            id: _id
        }
    }`;

export const gqlUpdateTContactUs = gql`
    mutation UpdateTContactUs($id: ID!, $input: TContactUsInput) {
        updateTContactUs(_id: $id, input: $input) {
            id: _id
        }
    }`;

    // createComment

//////////////////  mutation  ///////////////////