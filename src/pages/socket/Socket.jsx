import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish
} from "@material-ui/icons";
import "./Socket.styled";
import {
  UserContainer,
  TitleContainer,
  UserWrapper,
  UserForm,
  FormLeft,
  FormRight,
  UserUpdateImage
} from "./Socket.styled";
import { UserContext } from "../../Store";

import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

function Socket() {
  const [userData, setUserData] = useContext(UserContext);
  const { id } = useParams();
  const [user] = userData.filter((user) => user.id === parseInt(id));

  return (
    <UserContainer>
      <TitleContainer>
        <h2>Edit User</h2>
        <Link to="/newUser">
          <button>Create</button>
        </Link>
      </TitleContainer>

      <UserWrapper>
        <div className="userDisplay">
          <div className="userDisplayTop">
            <img src={user.avatar} alt="" />
            <div className="userDisplayTopTitle">
              <span className="userDisplayJobTitle">{user.job}</span>
            </div>
          </div>
          <div className="userDisplayBottom">
            <span className="detailTitle">Account Details</span>
            <div className="userInfo">
              <PermIdentity className="userDisplayIcon" />
              <span className="userInfoTitle">{user.userName}</span>
            </div>
            <div className="userInfo">
              <CalendarToday className="userDisplayIcon" />
              <span className="userInfoTitle">{user.date}</span>
            </div>
            <span className="detailTitle">Contact Details</span>
            <div className="userInfo">
              <PhoneAndroid className="userDisplayIcon" />
              <span className="userInfoTitle">{user.phone}</span>
            </div>
            <div className="userInfo">
              <MailOutline className="userDisplayIcon" />
              <span className="userInfoTitle">{user.email}</span>
            </div>
            <div className="userInfo">
              <LocationSearching className="userDisplayIcon" />
              <span className="userInfoTitle">{user.location}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <UserForm>
            <FormLeft>
              <div className="item">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.userName}
                  className="userUpdateInput"
                />
              </div>
              <div className="item">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.userName}
                  className="userUpdateInput"
                />
              </div>
              <div className="item">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="item">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                />
              </div>
              <div className="item">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.location}
                  className="userUpdateInput"
                />
              </div>
            </FormLeft>
            <FormRight>
              <div className="userUpdateUpload">
                <UserUpdateImage src={user.avatar} alt="" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateBtn">Update</button>
            </FormRight>
          </UserForm>
        </div>
      </UserWrapper>
    </UserContainer>
  );
}

export default Socket;
