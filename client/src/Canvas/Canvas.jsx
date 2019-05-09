import React, { useState, useEffect } from 'react';
import Image from '../Image/Image';
import Button from '../Button/Button';
import './Canvas.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

const Canvas = ({ elementId }) => { 
    
  //Initiate & set localStorage and state hooks
  const initialCanvas = (localStorage.getItem("canvas") || null);
  const [canvas, setCanvas] = useState(initialCanvas);
  const [selected, setSelected] = useState(null);
  const initialCount = +localStorage.getItem('count') || 0;
  const [count, setCount] = useState(initialCount);
    
  //on componentDidMount get the saved canvas state and append it to canvas.
  useEffect(() => {
    let mod = document.getElementsByClassName("content-space")[0];
    let node = document.createElement('div');
        var d = document.createElement('div');
        d.innerHTML = localStorage.getItem("canvas");
        mod.appendChild(d)
  },[]);
    
    //Callback function passed to button to save the canvas state and change styles
    const save = () =>{
        let currentCanvas = document.getElementsByClassName("content-space")[0].cloneNode(true);
        localStorage.setItem('canvas', currentCanvas.innerHTML);
        setCanvas(currentCanvas.innerHTML);
        let saveButton = document.getElementsByClassName("save-button")[0];
        saveButton.textContent = "Saved Successfully";
        saveButton.setAttribute("class", "save-button btn btn-success");
        setTimeout(function () {
        saveButton.setAttribute("class", "save-button btn btn-primary");
        saveButton.textContent = "Save";
    }, 2000);
    }

    //Event function onDrop to set new IDs and appends the image to canvas
    const drop = (e) => {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData("application/json"));
        var nodeCopy = document.getElementById(data[0]).cloneNode(true);
        nodeCopy.setAttribute("id", "img"+"-"+count);
        nodeCopy.setAttribute("class", "gallery-img-canvas");
        e.target.appendChild(nodeCopy);
        setCount(count + 1);
    }
    
    //gets the element position
    var coordinates = function(element) {
    element = $(element);
    var top = element.position().top;
    var left = element.position().left;
    }
    
    //Event function that removes nodeChild by the selected ID
    const deleteItem = (e) => {
        document.getElementById(selected.id).parentNode.removeChild(document.getElementById(selected.id));
        
    }
    
    
    //DRAG & DROP LOGIC
    $(function() {
    $(".canvas .gallery-img-canvas").draggable({
    containment: ".canvas", 
    scroll: false,
    start: function(e) {
        coordinates('.canvas .gallery-img-canvas');
        setSelected(e.currentTarget);
    },cursor: 'move',
    stop: function() {
        coordinates('.canvas .gallery-img-canvas');
    }
    }).on('click', function(e){
            e.stopPropagation();
            setSelected(e.currentTarget)

        });
    });
    $(function() {
    $(".canvas .text").draggable({
    containment: ".canvas", 
    scroll: false,
    start: function(e) {
        coordinates('.canvas .text');
        setSelected(e.currentTarget);
    },cursor: 'move',
    stop: function() {
        coordinates('.canvas .text');
    }
    }).on('click', function(e){
            e.stopPropagation();
            setSelected(e.currentTarget);
            $(this).draggable( {disabled: false});
    }).dblclick(function() {
        $(this).draggable({ disabled: true });;
    });
        });
        $(".canvas").click(function(e){
            setSelected(null)
        })
    
  return (
      <div id="canvasEditor">
          {
              selected == null ? (
        <Button onClick={save} className="save-button btn btn-primary col-12">Save</Button>
      ) : 
        <div>
        <Button onClick={save} className="save-button btn btn-primary col-6">Save</Button>
        <Button onClick={deleteItem} className="delete-button btn btn-danger col-6">Delete</Button>
                  </div>
          }
    <div droppable="true" onDragOver={(e) => e.preventDefault()} onDrop={(e) => drop(e)} className="canvas">
          <div className="content-space">
            </div>
      </div>
          </div>
  );
};

export default Canvas;