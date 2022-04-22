import React from "react";
import WineElement from './DetailElementPresenter';

const DetailElementContainer = ({type, value}) => {
  return (
    <WineElement type={type} value={value}></WineElement>
  )
}

export default DetailElementContainer;