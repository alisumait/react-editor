import React, { useState, useEffect } from 'react';
import Image from '../Image/Image';
import './Gallery.css';

function Gallery(props) {
    //Convert the response passed from API to image array
    const imageList = props.imgList.toString().split(',');
    
    //Callback function to send the dragged ID to parent to manipulate it
      const onDrag = (e) => { 
          props.sendId(e)
      }
      
      //Dropping image location logic
      const drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
          if(ev.target.hasChildNodes()){
        ev.target.appendChild(document.getElementById(props.elementId));
          }
          document.getElementById(props.elementId).style.left = ev.clientX - data[1] + 'px';
        document.getElementById(props.elementId).style.top = ev.clientY - data[2] + 'px';
        return false;
    }

  return (
    <div className="gallery">
          <ul className="row">
     {
              imageList.map((img, index) => {
                        return (
                            <li key={index} onDragOver={(e) => e.preventDefault()} onDrop={(e) => drop(e)} className="col-6">
                        <Image className="gallery-img" src={img} id={index} onDrag={onDrag}/>
                            </li>
                      )
              })
            }    
          </ul>    
    </div>
  );
};

export default Gallery;