import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PopupSnackbar from "../home2/PopupSnackbar";

const { faker } = require("@faker-js/faker");

const Devel = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  /**
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
            const max = total;
            const rand = min + Math.random() * (max - min);

            let bank = data[Math.floor(rand)]

            banks.push({
                        user_bank: makeNumber(11),                  
                        banks: bank.id
                    })
        }
        return banks
    }

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

    const makePostId = () =>{
        const minPost = 1;
        const maxPost = dataPosts.length;
        const randPost = minPost + Math.random() * (maxPost - minPost);

        let Post = dataPosts[Math.floor(randPost)]

        return Post.id
    }
    
    const makeRole = () =>{
        const min = 0;
        const max = totalRoles;
        const rand = min + Math.random() * (max - min);

        let roles = []
        for ( var i = 0; i < rand; i++ ) {

            const minRole = 1;
            const maxRole = totalRoles;
            const randRole = minRole + Math.random() * (maxRole - minRole);

            let rols = dataRoles[Math.floor(randRole)]

            roles.push(rols.id)
        }

        return  Array.from(new Set(roles))
    }
  
*/

  return (
    <Box>
      <Button
        onClick={() => {
          console.log("POST [Auto Create]");

          let start = Date.now();

          {
            /* 
            for (var i = 0; i < 10; i++) {

                    //////////// bank
                    const min = 0;
                    const max = total;
                    const rand = min + Math.random() * (max - min);

                    let bank = data[Math.floor(rand)]
                    //////////// bank

                    //////////// user
                    const minUser = 0;
                    const maxUser = dataUsers.length;
                    const randUser = minUser + Math.random() * (maxUser - minUser);

                    let user = dataUsers[Math.floor(randUser)]
                    //////////// user

                    // const randomPhoneNumber = faker.phone.phoneNumber();
                    // const im = faker.image.avatar()
                    // console.log("randomPhoneNumber :", randomPhoneNumber, im, randomstring.generate(7) )

                    create('posts', { data: {
                        title:faker.lorem.lines(1),
                        nameSubname:faker.name.firstName() +" "+ faker.name.firstName(),
                        idCard:makeNumber(6),
                        number:makeNumber(6),
                        dateTranfer: faker.date.past(),                    
                        body:faker.lorem.paragraph(),
                        banks:makeBank(rand),
                        follows:makeFollow( 5),
                        files:makeFile(rand),
                        isPublish:0,
                        owner_id: user.id,
                        // createdAt: faker.date.past(),     
                        } })
                        
                }
          */
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

      <Button
        onClick={() => {
          console.log("COMMENT [Auto Create]");

          let start = Date.now();

          {
            /*
            
             for (var i = 0; i < 200; i++) {
                    create('comments', { 
                            data: {                    
                                    body:faker.lorem.paragraph(),
                                    postId: makePostId()
                                } 
                          })
                        
                }
            */
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
      </Button>

      <Button
        onClick={() => {
          console.log("USER [Auto Create]");

          let start = Date.now();

          {
            /*
            

                for (var i = 0; i < 1000; i++) {
                    create('users', { 
                            data: {                    
                                    username: faker.name.firstName() ,
                                    password: makeText(10),
                                    email: faker.internet.email(),
                                    displayName: faker.name.firstName(),
                                    // lastAccess: faker.date.past(),
                                    image: {
                                        base64: faker.image.avatar(),
                                        fileName: faker.name.firstName(),
                                        lastModified: '1651919605486',
                                        size: 45901,
                                        type: 'image/png'
                                    },
                                    roles: makeRole(),
                                    isActive: 'Active'
                                } 
                          })
                        
                }
            
            */
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

export default Devel;
