import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Image from '../Image/Image';
import Logo from './logo.png';
import $ from 'jquery';
import './UploadForm.css';

function UploadForm(props) {
    
    const [upload, setUpload] = useState(true);
    
    //prevent upload click until file is uploaded
    const handleChange = (e) => {
        setUpload(false);
    }
    
    //callback function from parent to refetch images
    const submitForm = (e) => {
        props.pushImage(e);
    }
    
  return (
    <div id="uploadForm">
    <iframe name="formTarget" style={{display:'none'}}></iframe>
      <form id="myForm" enctype="multipart/form-data" action="/uploads" target="formTarget" onSubmit={(e) => submitForm(e)} method="POST" >
        <Image className="logo" src={Logo}></Image>
      <input id="input-file" type="file" onChange={(e) => handleChange(e.target.files)} className="form-control" placeholder="Upload Your Images" name="upload"></input>
    <Button type="submit" id="submit" onClick={props.setImage} className="submit-button btn btn-primary" disabled={upload}>Upload</Button>
    </form>
    </div>
  );
}

export default UploadForm;