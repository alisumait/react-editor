import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm/UploadForm';
import Gallery from './Gallery/Gallery';
import Canvas from './Canvas/Canvas';
import Button from './Button/Button';
import './App.css';

function App() {

  //Initiate & set localStorage and state hooks
  const imageList = (localStorage.getItem("images") || '');
  const [images, setImages] = useState(imageList);
  const [isLoading, setLoading] = useState(true);
  const localId = (localStorage.getItem("id") || 'null');
  const [elementId, setElementId] = useState(localId);
  const initialCanvas = (localStorage.getItem("canvas") || null);
  const [canvas, setCanvas] = useState(initialCanvas);
  const initialCount = +localStorage.getItem('count') || 0;
  const [count, setCount] = useState(initialCount);
  const imgArr = images.toString().split(',');
    
    //Fetch existing images from API to be passed to children
    const callApi = async () => {
    const response = await fetch('/images');
    const body = await response.json();
    if ((response.status !== 200)){
        throw Error(body.message);
    }else{
    populate(body);
    return body
    }
  };
      callApi();
    
    //Get the list of images and populate them on localStorage and images state
 function populate(res){
     setImages(res);
     localStorage.setItem("images", res);
     setLoading(false);
 }
    //Callback function passed to child to get the selected element's id
    const setId = (id) =>{
        localStorage.setItem("id", id);
        setElementId(id);
    }
    
    //Refetch the new images list without refreashing the page
    const pushImage = (img) => {
        callApi();
    }
    
    //Callback function to add the text to Canvas component
    const addText = () => {
        const todoList = document.querySelector('.content-space');
        const newText = document.createElement('h1');
        newText.textContent = 'Text';
        newText.contentEditable = true;
        newText.draggable = true;
        newText.className = "text";
        newText.id = "text-"+count;
        newText.style.width = "fit-content";
        newText.style.zIndex = 10;
        todoList.appendChild(newText);
        setCount(count+1);
    }
    
    //Callback function that gets the state of Canvas and saves it
    const saveCanvas = (currentCanvas) => {
        setCanvas(currentCanvas);
        localStorage.setItem("canvas", currentCanvas);
    }
    
  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-4 left">
      <UploadForm pushImage={pushImage}></UploadForm>
      <Button className="text-button btn btn-secondary" onClick={addText}>Add Text</Button>
      {images==false ? (
        <h1>Loading</h1>
      ) : 
        <Gallery elementId={localStorage.getItem("id")} sendId={setId} imgList = {images} />
        }
    </div>
    <div className="col-8 right">
        <Canvas onClick={saveCanvas} children={canvas} elementId={localStorage.getItem("id")}>
        </Canvas>
    </div>
    </div>
    </div>
  );
}

export default App;