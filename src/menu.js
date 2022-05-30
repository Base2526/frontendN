import {
  LineStyle,
  Timeline,
  TrendingUp,
  Group,
  Info,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline
} from "@material-ui/icons";
import CommentIcon from "@mui/icons-material/Comment";
import PowerIcon from "@mui/icons-material/Power";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import WebhookIcon from "@mui/icons-material/Webhook";
import RuleIcon from "@mui/icons-material/Rule";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@material-ui/icons/Mail";

const MenuList = [
  {
    Id: 1,
    Name: "Home",
    Icon: <HomeIcon className="icon" />,
    Path: "/"
    // Sheets: [
    //   {
    //     Id: 1,
    //     Title: "Title1 "
    //   },
    //   {
    //     Id: 2,
    //     Title: "Title 2"
    //   },
    //   {
    //     Id: 3,
    //     Title: "Title 3"
    //   }
    // ]
  },
  {
    Id: 2,
    Name: "Posts",
    Icon: <Timeline className="icon" />,
    Path: "/posts"
  },
  // {
  //   Id: 3,
  //   Name: "Comments",
  //   Icon: <CommentIcon className="icon" />,
  //   Path: "/comments"
  // },
  {
    Id: 4,
    Name: "Users",
    Icon: <Group className="icon" />,
    Path: "/users"
  },

  {
    Id: 7,
    Name: "Taxonomy",
    Icon: <AssistantPhotoIcon className="icon" />,
    // Path: "/devel",
    Sheets: [
      {
        Id: 1,
        Title: "Devel",
        Icon: <WebhookIcon className="icon" />,
        Path: "/devel"
      },
      {
        Id: 2,
        Title: "Roles",
        Icon: <RuleIcon className="icon" />,
        Path: "/roles"
      },
      {
        Id: 3,
        Title: "Banks",
        Icon: <AccountBalanceWalletIcon className="icon" />,
        Path: "/banks"
      },
      {
        Id: 4,
        Title: "Socket",
        Icon: <PowerIcon className="icon" />,
        Path: "/sockets"
      },
      {
        Id: 5,
        Title: "Theme mail",
        Icon: <MailIcon className="icon" />,
        Path: "/theme-mails"
      }
    ]
  }
];

export { MenuList };
