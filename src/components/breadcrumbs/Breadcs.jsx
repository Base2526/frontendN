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
  const userMatches = useRouteMatch("/user/:jobid/edit");

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
        {/*  */}
        {newUserMatches && (
          <MuiLink component={Link} to="/user/new">
            New user
          </MuiLink>
        )}
        {userMatches && (
          <MuiLink
            component={Link}
            to={`/user/${userMatches.params.jobid}/edit`}
          >
            Edit user {/*({userMatches.params.jobid})*/}
          </MuiLink>
        )}
        {socketsMatches && (
          <MuiLink component={Link} to="/sockets">
            Sockets
          </MuiLink>
        )}
        {/* newSocketMatches */}
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

        {/* develMatches */}
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
