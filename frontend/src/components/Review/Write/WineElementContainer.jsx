import React, { useState } from "react";
import WineElement from "./WineElementPresenter";

const WriteReviewContainer = ({ type, value, changeElement }) => {
  const [elements, setElements] = useState([
    { 
      id: 1,
      active: false,
      color: '#EAC3B7'
    },
    { 
      id: 2,
      active: false,
      color: "#EFA189"
    },
    { 
      id: 3,
      active: false,
      color: "#F5815C"
    },
    { 
      id: 4,
      active: false,
      color: '#FA5F2E',
    },
    { 
      id: 5,
      active: false,
      color: '#FF3D00'
    },
  ]);

  const changeActive = (id) => {
    changeElement(type[1], id)
    
    setElements(
      elements.map(element => 
        element.id <= id ? { ...element, active: true} : { ...element, active: false})
    );
  };

  return (
    <WineElement type={type[0]} elements={elements} onToggle={changeActive} ></WineElement>
  );
};

export default WriteReviewContainer;