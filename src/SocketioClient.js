import { deviceDetect } from "react-device-detect";
import io from "socket.io-client";
import axios from "axios";
var _ = require("lodash");

//

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

  if(!_.isEmpty(soc)){
    return soc;
  }

  soc = io("http://localhost:4040" , { transports : ['websocket'], query: {  x: 42} })

  if (soc.connected === false && soc.connecting === false) {
      // use a connect() or reconnect() here if you want
      soc.connect();
      console.log("socket")
  }

  return soc;
};


const socket = () => {
    if(!_.isEmpty(soc)){
        return soc;
    }

    soc = io("http://localhost:4040" , { transports : ['websocket'], query: {  x: 42} })

    if (soc.connected === false && soc.connecting === false) {
        // use a connect() or reconnect() here if you want
        soc.connect();
        console.log("socket")
    }

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
