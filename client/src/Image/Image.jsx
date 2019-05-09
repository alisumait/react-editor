import React from 'react';
import './Image.css';
import $ from 'jquery';

const Image = ({ src, id, onDrag, className }) => { 
    
    //Callback function to get ID
    const printpos = (e) => {
        onDrag(e.target.id);
    }
    
    //Dragging position logic
    function drag(ev) {
        ev.dataTransfer.setData("application/json", JSON.stringify([ev.target.id,(ev.offsetX || ev.clientX - $(ev.target).offset().left),(ev.offsetY || ev.clientY - $(ev.target).offset().top)]));
    }
    
  return (
      <div>
    <img onDragStart={(e) => drag(e)} draggable="true" onDrag={(e) => printpos(e)} id={id} className={className} src={src}></img>
      </div>
  );
};

export default Image;