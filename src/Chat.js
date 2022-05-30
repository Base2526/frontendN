import "./styles.css";
// RCE CSS
import "react-chat-elements/dist/main.css";

import { MessageList } from "react-chat-elements";
import { useEffect, useState } from "react";

const generateData = (number) =>
  Array.from({ length: 20 }).map(() => {
    return {
      position: "right",
      type: "text",
      text: `${number} - Lorem ipsum dolor sit amet, consectetur adipisicing elit`,
      date: new Date()
    };
  });

export default function App() {
  const [data, setData] = useState(generateData("0"));

  useEffect(() => {
    Array.from({ length: 5 }).map((_, idx) => {
      if (data) {
        setTimeout(
          () => setData([...data, ...generateData(idx + 1)]),
          idx * 1000
        );
      }
    });
  }, []);

  return (
    <MessageList
      className="message-list"
      lockable={true}
      toBottomHeight={"100%"}
      dataSource={data}
    />
  );
}
