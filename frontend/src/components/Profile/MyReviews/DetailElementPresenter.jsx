import React, { useState } from "react";
import styles from './DetailElement.module.css';
import CircleIcon from '@mui/icons-material/Circle';

const Element = ({ element, value }) => {
  return (
      <CircleIcon 
        style={{ 
          color: element.id <= value ? element.color : "lightgray",
          margin: "0 2px"
        }} 
        sx = {{ fontSize: 22 }}
      />
  )
}


const WineElement = ({type, value}) => {
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
  ])

  return (
    <div className={styles.container}>
      <div>{type}</div>
      <div className={styles.element_box}>
        {elements.map(el => (
          <Element element={el} key={el.id} value={value}></Element>
        ))}
      </div>
    </div>
  )
}

export default WineElement;