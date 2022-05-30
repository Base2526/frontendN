import { Container, WidgetList, ListItem, Button } from "./SmallWidgetStyles";
import { Visibility } from "@material-ui/icons";

function SmallWidget() {
  return (
    <Container>
      <h2 className="title">New Join Members</h2>
      <WidgetList>
        <ListItem>
          <img
            src="https://avatarfiles.alphacoders.com/154/thumb-15402.gif"
            alt=""
          />
          <div className="user">
            <span className="username">Wario</span>
            <span className="job">Front End Developer</span>
          </div>
          <Button>
            <Visibility className="icon" />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <img
            src="https://avatarfiles.alphacoders.com/687/thumb-68706.jpg"
            alt=""
          />
          <div className="user">
            <span className="username">Daisy</span>
            <span className="job">Database Architect</span>
          </div>
          <Button>
            <Visibility className="icon" />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <img
            src="https://avatarfiles.alphacoders.com/154/thumb-154932.png"
            alt=""
          />
          <div className="user">
            <span className="username">Peach</span>
            <span className="job">Software Engineer</span>
          </div>
          <Button>
            <Visibility className="icon" />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <img
            src="https://avatarfiles.alphacoders.com/337/thumb-33737.jpg"
            alt=""
          />
          <div className="user">
            <span className="username">Luigi</span>
            <span className="job">Database Engineer</span>
          </div>
          <Button>
            <Visibility className="icon" />
            Display
          </Button>
        </ListItem>
        <ListItem>
          <img
            src="https://avatarfiles.alphacoders.com/433/thumb-43305.jpg"
            alt=""
          />
          <div className="user">
            <span className="username">Yoshi</span>
            <span className="job">Full Stack Developer</span>
          </div>
          <Button>
            <Visibility className="icon" />
            Display
          </Button>
        </ListItem>
      </WidgetList>
    </Container>
  );
}

export default SmallWidget;
