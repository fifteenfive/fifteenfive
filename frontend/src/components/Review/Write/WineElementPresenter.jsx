import React from "react";
import styles from './WineElement.module.css';
import CircleIcon from '@mui/icons-material/Circle';

const Element = ({ element, onToggle }) => {
  return (
      <CircleIcon 
        style={{ 
          color: element.active ? element.color : "lightgray",
          cursor: "pointer",
          margin: "0 2px"
        }} 
        sx = {{fontSize: 30}}
        onClick={() => onToggle(element.id)} 
      />
  )
}


const WineElement = ({ type, elements, onToggle }) => {
  return (
    <div className={styles.container}>
      <p>{type}</p>
      <div className={styles.element_box}>
        {elements.map(el => (
          <Element element={el} key={el.id} onToggle={onToggle}></Element>
        ))}
      </div>
    </div>
  )
}

export default WineElement;