import React, { useEffect, useState } from "react";

const Tabs =(props)=> {
    const [selected, setSelected] = useState(0)

    const handleChange = (index) => {
        setSelected(index)
    }

    return (
      <>
        <ul>
          {props.children.map((elem, index) => {
            let style = index === selected ? "selected" : "";
            return (
              <li
                key={index}
                className={style}
                onClick={() => handleChange(index)}
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <div className="tab">{props.children[selected]}</div>
      </>
    );
  
}

export default Tabs;
