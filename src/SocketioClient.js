import { deviceDetect } from "react-device-detect";
import io from "socket.io-client";
import axios from "axios";
var _ = require("lodash");

let {
  REACT_APP_DEBUG,
  REACT_APP_VERSIONS,
  REACT_APP_URL_SERVER,
  REACT_APP_GEOLOCATION,
} = process.env;

let soc = undefined;
const socketIO = async (props) => {
  /*
  let { user } = props;

  console.log("props >> user :", props, user._id);

  if (_.isEmpty(user)) {
    if (!_.isEmpty(socket)) {
      if (socket.query.auth_token !== 0) {
        socket.disconnect();
        socket = null;
      }
    }
  } else {
    if (!_.isEmpty(socket)) {
      if (socket.query.auth_token === 0) {
        socket.disconnect();
        socket = null;
      }
    }
  }
  */
 /*

  if (_.isEmpty(socket)) {
    socket = io(REACT_APP_DEBUG ? REACT_APP_URL_SERVER : "" + "/", {
      "sync disconnect on unload": true,
      // query: {
      //   version: REACT_APP_VERSIONS,
      //   device_detect: JSON.stringify(deviceDetect()),
      //   geolocation: JSON.stringify(await geolocation()),
      //   auth_token: _.isEmpty(user) ? 0 : user._id,
      // },
    });
  }

  if (socket.connected === false && socket.connecting === false) {
    // use a connect() or reconnect() here if you want
    socket.connect();
  }

  return socket;
  */

  console.log("socket.socket.options.query :", soc.socket.options.query)

  if(!_.isEmpty(soc)){
    return soc;
  }

  let token = _.isEmpty(localStorage.getItem('token')) ? "" : localStorage.getItem('token')

  soc = io("http://localhost:4040" , { transports : ['websocket'], query: {  x: 42, xxxx: "23453", token } })

  if (soc.connected === false && soc.connecting === false) {
      // use a connect() or reconnect() here if you want
      soc.connect();
      console.log("socket")
  }

  return soc;
};


const socket = () => {
  
  let newToken = _.isEmpty(localStorage.getItem('token')) ? "" : localStorage.getItem('token')

  if( soc !== undefined){

    // console.log("socket #1 :", soc.io.opts.query)

    // socket.disconnect().connect();
    
    let {token} = soc.io.opts.query;

    if( newToken != token ){
      soc.io.opts.query = {token: newToken}

      console.log("socket #2 :", soc.io.opts.query)
      return soc.disconnect().connect();
    }

    return soc;
  }

  soc = io( process.env.HOST_GRAPHAL , { transports : ['websocket'], query: {token: newToken} })

  if (soc.connected === false && soc.connecting === undefined) {
    // use a connect() or reconnect() here if you want
    soc.connect();
  }

  // console.log("socket #1 ", soc, soc.connecting)
  return soc;
}

const geolocation = async () => {
  let data = JSON.parse(localStorage.getItem("geolocation"));
  if (_.isEmpty(data)) {
    const res = await axios.get(REACT_APP_GEOLOCATION);
    if (res.status === 200) {
      data = res.data;
    }

    localStorage.setItem("geolocation", JSON.stringify(data));
  }
  return data;
};

export { socketIO, socket};
