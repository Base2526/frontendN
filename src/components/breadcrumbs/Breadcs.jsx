import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useRouteMatch } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";

const Breadcs = ({ title }) => {
  const homeMatches = useRouteMatch("/");
  const postsMatches = useRouteMatch("/posts");
  const newPostMatches = useRouteMatch("/post/new");
  const postMatches = useRouteMatch("/post/:jobid/edit");
  const commentsMatches = useRouteMatch("/comments");
  const newCommentMatches = useRouteMatch("/comment/new");
  const commentMatches = useRouteMatch("/comment/:jobid/edit");
  const usersMatches = useRouteMatch("/users");
  const newUserMatches = useRouteMatch("/user/new");
  const userMatches = useRouteMatch("/user/:jobid/:mode");
  const socketsMatches = useRouteMatch("/sockets");
  const newSocketMatches = useRouteMatch("/newSocket");
  const socketMatches = useRouteMatch("/socket/:jobid");
  const rolesMatches = useRouteMatch("/roles");
  const newRoleMatches = useRouteMatch("/role/new");
  const roleMatches = useRouteMatch("/role/:jobid/edit");
  const banksMatches = useRouteMatch("/banks");
  const newBankMatches = useRouteMatch("/bank/new");
  const bankMatches = useRouteMatch("/bank/:jobid/edit");
  const themeMailsMatches = useRouteMatch("/theme-mails");
  const newThemeMailMatches = useRouteMatch("/theme-mail/new");
  const themeMailMatches = useRouteMatch("/theme-mail/:jobid/edit");
  const develMatches = useRouteMatch("/devel");
  const notificationMatches =useRouteMatch("/notification")
  const messengerMatches =useRouteMatch("/message")
  const bookmarksMatches =useRouteMatch("/bookmarks")
  const reportsMatches =useRouteMatch("/reports")
  const sharesMatches =useRouteMatch("/shares")
  const contactUsMatches =useRouteMatch("/contact-us")
  const tcontactusListMatches =useRouteMatch("/tcontactus-list")
  const dblogMatches =useRouteMatch("/dblog")
  const detailMatches =useRouteMatch("/detail")
  const helpMatches =useRouteMatch("/help")
  const basicContentsMatches = useRouteMatch("/basic-contents");
  const newBasicContentMatches = useRouteMatch("/basic-content/new");
  const basicContentMatches = useRouteMatch("/basic-content/:id/edit");
  const profileMatches = useRouteMatch("/me")

  const newPhoneMatches = useRouteMatch("/phone/new");
  const phoneMatches = useRouteMatch("/phone/:jobid/edit");
  const phonesMatches = useRouteMatch("/phones");

  const handleClick = () => {};
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {homeMatches && (
          <MuiLink component={Link} to="/">
            Home
          </MuiLink>
        )}
        {postsMatches && (
          <MuiLink component={Link} to="/posts">
            Posts
          </MuiLink>
        )}
        {newPostMatches && (
          <MuiLink component={Link} to="/post/new">
            New post
          </MuiLink>
        )}
        {postMatches && (
          <MuiLink
            component={Link}
            to={`/post/${postMatches.params.jobid}/edit`}
          >
            Edit post {/*({postMatches.params.jobid}) */}
          </MuiLink>
        )}
        {commentsMatches && (
          <MuiLink component={Link} to="/comments">
            Comments
          </MuiLink>
        )}
        {newCommentMatches && (
          <MuiLink component={Link} to="/comment/new">
            New comment
          </MuiLink>
        )}
        {commentMatches && (
          <MuiLink
            component={Link}
            to={`/comment/${commentMatches.params.jobid}/edit`}
          >
            Edit comment {/*({commentMatches.params.jobid}) */}
          </MuiLink>
        )}
        {usersMatches && (
          <MuiLink component={Link} to="/users">
            users
          </MuiLink>
        )}
        {newUserMatches && (
          <MuiLink component={Link} to="/user/new">
            New user
          </MuiLink>
        )}
        {userMatches && (
          <MuiLink
            component={Link}
            to={`/user/${userMatches.params.jobid}/${userMatches.params.mode}`}
          >
            {userMatches.params.mode.slice(0,1).toUpperCase() + userMatches.params.mode.slice(1, userMatches.params.mode.length)} user  {/*({userMatches.params.jobid})*/}
          </MuiLink>
        )}
        {socketsMatches && (
          <MuiLink component={Link} to="/sockets">
            Sockets
          </MuiLink>
        )}
        {newSocketMatches && (
          <MuiLink component={Link} to="/newSocket">
            New socket
          </MuiLink>
        )}
        {socketMatches && (
          <MuiLink
            component={Link}
            to={`/socket/${socketMatches.params.jobid}`}
          >
            Socket ({socketMatches.params.jobid})
          </MuiLink>
        )}
        {rolesMatches && (
          <MuiLink component={Link} to="/roles">
            Roles
          </MuiLink>
        )}
        {newRoleMatches && (
          <MuiLink component={Link} to="/role/new">
            New role
          </MuiLink>
        )}
        {roleMatches && (
          <MuiLink component={Link} to={`/role/${roleMatches.params.jobid}`}>
            Edit role {/* ({roleMatches.params.jobid}) */}
          </MuiLink>
        )}
        {banksMatches && (
          <MuiLink component={Link} to="/banks">
            Banks
          </MuiLink>
        )}
        {newBankMatches && (
          <MuiLink component={Link} to="/bank/new">
            New bank
          </MuiLink>
        )}
        {bankMatches && (
          <MuiLink
            component={Link}
            to={`/bank/${bankMatches.params.jobid}/edit`}
          >
            Edit bank {/*({bankMatches.params.jobid}) */}
          </MuiLink>
        )}
        {themeMailsMatches && (
          <MuiLink component={Link} to="/theme-mails">
            Theme mails
          </MuiLink>
        )}
        {newThemeMailMatches && (
          <MuiLink component={Link} to="/theme-mail/new">
            New Theme mail
          </MuiLink>
        )}
        {themeMailMatches && (
          <MuiLink
            component={Link}
            to={`/theme-mail/${themeMailMatches.params.jobid}/edit`}
          >
            Edit Theme mail {/*({bankMatches.params.jobid}) */}
          </MuiLink>
        )}
        {develMatches && (
          <MuiLink component={Link} to="/devel">
            Devel
          </MuiLink>
        )}
        {notificationMatches && (
          <MuiLink component={Link} to="/notification">
            Notification
          </MuiLink>
        )}
        {messengerMatches && (
          <MuiLink component={Link} to="/message">
            Message
          </MuiLink>
        )}
        {bookmarksMatches && (
          <MuiLink component={Link} to="/bookmarks">
            Bookmarks
          </MuiLink>
        )}
        {reportsMatches && (
          <MuiLink component={Link} to="/reports">
            Reports
          </MuiLink>
        )}
        {sharesMatches && (
          <MuiLink component={Link} to="/shares">
            Shares
          </MuiLink>
        )}
        {contactUsMatches && (
          <MuiLink component={Link} to="/contact-us">
            Contact Us
          </MuiLink>
        )}
        {tcontactusListMatches && (
          <MuiLink component={Link} to="/tcontactus-list">
            Taxonomy Contact Us
          </MuiLink>
        )}
        {dblogMatches && (
          <MuiLink component={Link} to="/dblog">
            Recent log messages 
          </MuiLink>
        )}
        {detailMatches && (
          <MuiLink component={Link} to="/detail">
            Detail 
          </MuiLink>
        )}
        {helpMatches && (
          <MuiLink component={Link} to="/help">
            Help 
          </MuiLink>
        )}

        {basicContentsMatches && (
          <MuiLink 
            component={Link} 
            to="/basic-contents">
            Basic contents
          </MuiLink>
        )}
        {newBasicContentMatches && (
          <MuiLink 
            component={Link} 
            to="/basic-content/new">
            New Basis content
          </MuiLink>
        )}
        {basicContentMatches && (
          <MuiLink
            component={Link}
            to={`/basic-content/${basicContentMatches.params.id}/edit`}
          >
            Edit Basis content {/*({bankMatches.params.jobid}) */}
          </MuiLink>
        )}

        {profileMatches && (
          <MuiLink
            component={Link}
            to={`/me`}
          >
            Profile
          </MuiLink>
        )}

        {newPhoneMatches && (
          <MuiLink 
            component={Link} 
            to="/phone/new">
            New phone
          </MuiLink>
        )}
        {phoneMatches && (
          <MuiLink
            component={Link}
            to={`/phone/${phoneMatches.params.id}/edit`}
          >
            Edit phone
          </MuiLink>
        )}

        {phonesMatches && (
          <MuiLink component={Link} to="/phones">
            Phones
          </MuiLink>
        )}

        {/*<Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
        */}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcs;
