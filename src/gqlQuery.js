import { gql } from "@apollo/client";

export const gqlHomes = gql`
    query Homes( $userId: ID,  $page: Long, $perPage: Long, $keywordSearch: String, $category: String) {
        homes(
            userId: $userId
            page: $page
            perPage: $perPage
            keywordSearch: $keywordSearch
            category: $category
        )
    }`;

export const gqlPosts = gql`query Posts( $userId: ID, $page: Int, $perPage: Int ) { posts( userId: $userId page: $page perPage: $perPage ) }`;

export const gqlPost = gql`query Post($id: ID!) { post(_id: $id) }`;

export const gqlPostsByUser =  gql`
    query PostsByUser($userId: ID!) {
        postsByUser(
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
    query users($page: Int, $perPage: Int){
        users(
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
    query User($id: ID) {
        user(_id: $id) {
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
    query roles{
        roles{
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
    query role($id: ID!){
        role(_id: $id){
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
    query banks{
        banks{
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
    query bank($id: ID!){
        bank(_id: $id){
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
    query sockets($page: Int, $perPage: Int){
        sockets(
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
                status
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
    query IsBookmark($userId: ID, $postId: ID!){
        isBookmark(
            userId: $userId
            postId: $postId
        ){
            status
            executionTime
            data{
                id: _id
                userId
                postId
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
    query ShareByPostId($postId: ID!){
        shareByPostId(
            postId: $postId
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

export const gqlConversations = gql`query conversations($userId: ID){ conversations(userId: $userId) }`;

export const gqlNotifications = gql`query notifications($userId: ID){ notifications(userId: $userId) }`;

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

export const gqlFollower = gql`
    query Follower($userId: ID!){
        follower(
            userId: $userId
        ){
            status
            executionTime
            total
            data {
                _id
                username
                password
                email
                displayName
                isActive
                roles
                bookmarks {
                  _id
                  userId
                  postId
                  status
                }
                image {
                  _id
                  base64
                  fileName
                  lastModified
                  size
                  type
                }
                lastAccess
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

export const gqlFetchMessage = gql`query fetchMessage( $conversationId: ID ){ fetchMessage( conversationId: $conversationId ) }`;
export const gqlPhones = gql`query phones($userId: ID, $page: Int, $perPage: Int) { phones(userId: $userId, page: $page, perPage: $perPage) }`;
export const gqlPhone = gql`query phone($id: ID!){ phone(_id: $id) }`;

//////////////////  mutation  ///////////////////

export const gqlLogin = gql`
    mutation Login($input: LoginInput) {
        login(input: $input) {
            status
            messages
            executionTime
            token
            data {
                id: _id
                username
                password
                email
                displayName
                isActive
                roles
                bookmarks{
                    _id
                    userId
                    postId
                    status
                }
                image {
                    _id
                    base64
                    fileName
                    lastModified
                    size
                    type
                }
                lastAccess
            }
        }
    }`;

export const gqlLoginWithSocial = gql`
    mutation LoginWithSocial($input: LoginWithSocialInput) {
        loginWithSocial(input: $input) {
        id: _id
        }
    }`;

export const gqlCreateUser = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id: _id
    }
    }`;

export const gqlCreatePost = gql`mutation CreatePost($input: JSON) { createPost(input: $input) }`;

export const gqlCreateAndUpdateBookmark = gql`
    mutation CreateAndUpdateBookmark($input: BookmarkInput) {
        createAndUpdateBookmark(input: $input) {
            id: _id
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

export const gqlCreateAndUpdateComment = gql`
    mutation CreateAndUpdateComment($input: CommentInput) {
        createAndUpdateComment(input: $input) {
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
    mutation CreateConversation($input: ConversationInput!) {
        createConversation(input: $input)
    }`;

export const gqlCreateAndUpdateFollow = gql`
    mutation CreateAndUpdateFollow($input: FollowInput) {
        createAndUpdateFollow(input: $input) {
            _id
            status
        }
    }`;

// gqlCreatePhone
export const gqlCreatePhone = gql`mutation CreatePhone($input: PhoneInput) { createPhone(input: $input) }`;
export const gqlUpdatePhone = gql`mutation updatePhone($id: ID!, $input: PhoneInput) { updatePhone(_id: $id, input: $input) }`;
   
export const gqlAddMessage = gql`
    mutation AddMessage( $userId: ID!, $conversationId: ID! , $input: MessageInput ) {
        addMessage( userId: $userId, conversationId: $conversationId, input: $input )
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
export const gqlCurrentNumber = gql`
    mutation Query {
        currentNumber
      }`;

export const gqlUpdateMessageRead = gql`
        mutation UpdateMessageRead($userId: ID!, $conversationId: ID!) {
            updateMessageRead(userId: $userId, conversationId: $conversationId)
        }`;
  
export const gqlFileUpload = gql`
        mutation fileUpload($text: String!, $file: [Upload]!) {
            fileUpload(text: $text, file: $file) {
                filename
                mimetype
                encoding
            }
        }`

//////////////////  mutation  ///////////////////


//////////////////  subscription  ///////////////////

export const subNumberIncremented = gql`
  subscription OnnumberIncremented($postIDs: String) {
    numberIncremented(postIDs: $postIDs)
  }
`;

export const subPostCreated = gql`
    subscription Subscription {
    postCreated
  }
`;

// subPost
export const subPost = gql`
    subscription subPost($postIDs: String) {
        subPost(postIDs: $postIDs) {
            mutation
            data {
              id: _id
              title
              nameSubname
              idCard
              amount
              dateTranfer
              description
              tels
              banks {
                _id
                bankAccountName
                bankId
              }
              follows
              shares {
                _id
                userId
                postId
                destination
              }
              files {
                _id
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
    }
`;

export const subComment = gql`
    subscription subComment($commentID: String) {
        subComment(commentID: $commentID) {
            mutation
            commentID
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
    }
`;

export const subBookmark = gql`
    subscription subBookmark($userId: ID!, $postId: ID!) {
        subBookmark(userId: $userId, postId: $postId) {
        mutation
        data {
            id: _id
            userId
            postId
            status
        }
        }
    }
`;

export const subShare = gql`
    subscription subShare( $postId: ID! ) {
        subShare( postId: $postId ) {
            mutation
            data {
                id: _id
                userId
                postId
                destination
            }
        }
    }`;

export const subConversation = gql`subscription subConversation($userId: ID) { subConversation( userId: $userId ) }`;

export const subNotification = gql`subscription subNotification($userId: ID) { subNotification( userId: $userId ) }`;

export const subMessage = gql`subscription subMessage($userId: ID!, $conversationId: ID!) { subMessage( userId: $userId, conversationId: $conversationId)  }`;

//////////////////  subscription  ///////////////////