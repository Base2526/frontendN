import "./message.css";
// import { format } from "timeago.js";
// import { connect } from "react-redux";
import { useEffect, useState } from "react";

var _ = require("lodash");

const Message = (props) => {
  // export default function Message({ message }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("Message :", props.message);

    setMessage(props.message);
  }, [props.message]);

  return (
    <div /*className={message.own ? "message own" : "message"}*/>
      {_.isEmpty(message) ? (
        <div />
      ) : (
        <div
          className={
            props.user.uid === message.senderId ? "message own" : "message"
          }
        >
          <div className={"message"}>
            <div className="messageTop">
              <img
                className="messageImg"
                src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <p className="messageText">{message.data.text}</p>
            </div>
            <div className="messageBottom">{message.createdAt}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { user: state.user.data };
};

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(Message);
export default Message