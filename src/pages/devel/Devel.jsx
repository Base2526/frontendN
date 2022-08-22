import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PopupSnackbar from "../home/PopupSnackbar";
import { useQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import { gqlUsers, gqlPosts, gqlRoles, 
        gqlCreatePost, 
        gqlBanks, 
        gqlCreateAndUpdateBookmark, 
        gqlCreateUser,
        gqlCreateRole,
        gqlCreateShare } from "../../gqlQuery"

const { faker } = require("@faker-js/faker");

let total = 10;
const Devel = (props) => {

  let {user} = props
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const valueUsers = useQuery(gqlUsers, {
    variables: {page: 0, perPage: 1000},
    notifyOnNetworkStatusChange: true,
  });

  // console.log("valueUsers :", valueUsers)

  const valueBanks = useQuery(gqlBanks, { notifyOnNetworkStatusChange: true });

  console.log("valueBanks :", valueBanks)

  const valuePosts = useQuery(gqlPosts, {
    variables: {userId: _.isEmpty(user) ? "" : user.id, page: 0, perPage: 100},
    notifyOnNetworkStatusChange: true,
  });

  console.log("valuePosts :", valuePosts)

  const valueRoles = useQuery(gqlRoles, { notifyOnNetworkStatusChange: true });
  console.log("valueRoles :", valueRoles)

  const [onCreatePost, resultCreatePost] = useMutation(gqlCreatePost, {
    variables: {
      taskId: 1,
    },
    refetchQueries: () => [{
      query: gqlUsers,
      variables: { 
        // status: 'OPEN',
      },
    }],
  });

  console.log("resultCreatePost :", resultCreatePost)

  const [onCreateBookmark, resultCreateBookmark] = useMutation(gqlCreateAndUpdateBookmark, {
    variables: {
      taskId: 1,
    },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  });

  console.log("resultCreateBookmark :", resultCreateBookmark)


  const [onCreateUser, resultCreateUser] = useMutation(gqlCreateUser, {
    variables: {
      taskId: 1,
    },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  });

  console.log("resultCreateUser :", resultCreateUser)


  // 
  const [onCreateRole, resultCreateRole] = useMutation(gqlCreateRole, {
    variables: {
      taskId: 1,
    },
    // refetchQueries: () => [{
    //   query: gqlUsers,
    //   variables: { 
    //     // status: 'OPEN',
    //   },
    // }],
  });
  console.log("resultCreateRole :", resultCreateRole)

  const [onCreateShare, resultCreateShare] = useMutation(gqlCreateShare, {
    variables: {
      taskId: 1,
    }
  });
  console.log("resultCreateShare :", resultCreateShare)
  
  const makeText = (length) => {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
  
  const makeNumber = (length)=> {
      var result           = '';
      var characters       = '0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  const makeFile = (length) =>{
      let files = []
      for ( var i = 0; i < length; i++ ) {
          files.push({
                          base64: faker.image.avatar(),
                          fileName: faker.name.firstName(),
                          lastModified: '1651919605486',
                          size: 45901,
                          type: 'image/png'
                      })
      }
      return files
  }
  
  const makeBank = (length) =>{
      let banks = []
      for ( var i = 0; i < length; i++ ) {

          const min = 0;
          const max = valueBanks.data.banks.data.length;
          const rand = min + Math.random() * (max - min);

          banks.push({
                    bankAccountName: makeNumber(11),
                    bankId:valueBanks.data.banks.data[Math.floor(rand)].id
                  })
      }
      return banks
  }

  const makeTels = (length) =>{
    let tels = []
    for ( var i = 0; i < length; i++ ) {
        tels.push(makeNumber(11))
    }
    return tels
  }

  /*
  const makeFollow = (length) =>{
      let follows = []
      for ( var i = 0; i < length; i++ ) {

          const minUser = 1;
          const maxUser = dataUsers.length;
          const randUser = minUser + Math.random() * (maxUser - minUser);

          let user = dataUsers[Math.floor(randUser)]

          console.log("suer :", user, dataUsers, totalUsers)
          follows.push(user.id)
      }


      return  Array.from(new Set(follows))
  }
  */

  const makePostId = () =>{
      const minPost = 1;
      const maxPost = valuePosts.data.posts.data.length;
      const randPost = minPost + Math.random() * (maxPost - minPost);

      let Post = valuePosts.data.posts.data[Math.floor(randPost)]
      return Post.id
  }

  // makeUserId
  const makeUserId = () =>{
    const minUser = 1;
    const maxUser = valueUsers.data.Users.data.length;
    const randUser = minUser + Math.random() * (maxUser - minUser);

    let User = valueUsers.data.Users.data[Math.floor(randUser)]

    return User.id
  }
  
  const makeRole = () =>{
      const min = 0;
      const max = valueRoles.data.Roles.data.length;
      const rand = min + Math.random() * (max - min);

      let roles = []
      for ( var i = 0; i < rand; i++ ) {

          const minRole = 1;
          const maxRole = valueRoles.data.Roles.data.length;
          const randRole = minRole + Math.random() * (maxRole - minRole);

          let rols = valueRoles.data.Roles.data[Math.floor(randRole)]

          roles.push(rols.id)
      }

      return  Array.from(new Set(roles))
  }

  const makeDestination = () =>{
    const minDest = 1;
    const maxDest = 4;
    const randDest = minDest + Math.random() * (maxDest - minDest);

    let items = ["facebook", "twitter", "intagram", "pinterest"]

    return items[Math.floor(randDest)]
  }

  return (
    <Box>
      <Button
        onClick={() => {
          console.log("POST [Auto Create]");

          let start = Date.now();

          {
            
            for (var i = 0; i < 2000; i++) {

                    //////////// bank
                    const min = 0;
                    const max = total;
                    const rand = min + Math.random() * (max - min);

                    onCreatePost({ variables: { input: {
                          title: faker.lorem.lines(1),
                          nameSubname: faker.name.firstName() +" "+ faker.name.firstName(),
                          idCard: makeNumber(6),
                          amount: makeNumber(6),
                          tels: makeTels(rand),
                          banks: makeBank(rand),
                          description: faker.lorem.paragraph(),
                          dateTranfer:  faker.date.past(),
                          files:makeFile(rand),
                          ownerId: makeUserId(),
                        }
                      }
                    });     
                }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);
          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        POST [Auto Create]
      </Button>

      {/* <Button
        onClick={() => {
          console.log("COMMENT [Auto Create]");

          let start = Date.now();

          {
           
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        COMMENT [Auto Create]
      </Button> */}

      <Button
        onClick={() => {
          console.log("USER [Auto Create]");

          let start = Date.now();

          {
            for (var i = 0; i < 1000; i++) {
              onCreateUser({ variables: { input: {
                    // displayName: faker.name.firstName() ,
                    username: faker.name.firstName() ,
                    email: faker.internet.email(),
                    password: makeText(10),
                    roles: makeRole(),
                    isActive: 'active',
                    image: [{
                      base64: faker.image.avatar(),
                      fileName: faker.name.firstName() ,
                      lastModified: faker.date.past(),
                      size: 5255,
                      type: 'image/jpeg'
                    }],
                  }
                } 
              });

              /*
                displayName: 'mem',
                username: 'mem',
                password: '11',
                email: 'pgadmin@bigc.co.th',
                isActive: 'active',
                image: [
                    {
                        _id: ObjectId('62a2f3a3cf7946010d3c74d5'),
                        base64: 'data:image/jpeg;base64,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',
                        fileName: 'logo_bigc.jpg',
                        lastModified: ISODate('2010-06-23T13:06:24.561Z'),
                        size: 5255,
                        type: 'image/jpeg'
                    }
                ],
                roles: [
                    '62a2ccfbcf7946010d3c74a2',
                    '62a2ccfbcf7946010d3c74a4'
                ],
              */
                    
            }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        USER [Auto Create]
      </Button>

      <Button
        onClick={() => {
          let start = Date.now();
          {
            for (var i = 0; i < 1000; i++) {
              onCreateBookmark({ variables: { input: {
                    postId: makePostId(),
                    userId: makeUserId(),
                    status: i%2 == 0 ? true : false
                  }
                }
              });     
            }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        Bookmark [Auto Create]
      </Button>

      <Button
        onClick={() => {
          let start = Date.now();
          {
            for (var i = 0; i < 1000; i++) {
              onCreateShare({ variables: { input: {
                    postId: makePostId(),
                    userId: makeUserId(),
                    destination: makeDestination()
                  }
                }
              });     
            }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        Share [Auto Create]
      </Button>

      {/* <Button
        onClick={() => {
          let start = Date.now();
          {

            let roles = [
                      {
                        name: "administrator",
                        description: ""
                      },
                      {
                        name: "authenticated",
                        description: ""
                      },
                      {
                        name: "anonymous",
                        description: ""
                      }
                    ]

            // for (var i = 0; i < roles.length; i++) {
            //   onCreateRole({ variables: { input: {
            //         name: roles[i].name,
            //         description: ""
            //       }
            //     } 
            //   });
            // }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        Bank [Auto Create]
      </Button>  */}

      {/* <Button
        onClick={() => {
          let start = Date.now();
          {

            let roles = [
                      {
                        name: "administrator",
                        description: ""
                      },
                      {
                        name: "authenticated",
                        description: ""
                      },
                      {
                        name: "anonymous",
                        description: ""
                      }
                    ]

            for (var i = 0; i < roles.length; i++) {
              onCreateRole({ variables: { input: {
                    name: roles[i].name,
                    description: ""
                  }
                } 
              });
            }
          }

          let executionTime = `Time to execute = ${
            (Date.now() - start) / 1000
          } seconds`;

          setSnackbarOpen(true);

          console.log("executionTime : ", executionTime);
        }}
        variant="contained"
        color="primary"
      >
        Role [Auto Create]
      </Button> */}

      {snackbarOpen && (
        <PopupSnackbar
          isOpen={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
};

export default connect( mapStateToProps, null )(Devel);
