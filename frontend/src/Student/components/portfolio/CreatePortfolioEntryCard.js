import React, { useState } from "react";
import PropTypes from "prop-types"
import { FormGroup, Input, Label } from "reactstrap";
import Dropzone from "react-dropzone";

function CreatePortfolioEntryCard(props) {
  const [file, setFile] = useState(null);

  /**
   * Handles onChange event from a react-dropzone input
   */
  function handleDrop(acceptedFiles) {
    setFile(acceptedFiles[0]);
    props.handleChange("file", acceptedFiles[0]);
  }

  if (props.type === "photo" || props.type === "other") {
    return (
      <FormGroup>
        <Label for={`${props.name}.${props.type}`}>File</Label>
        <Dropzone name={`${props.name}.${props.type}`} accept={props.type === "other" ? "application/pdf" : "image/jpeg "} className='form-control d-flex align-items-center justify-content-center' onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div {...getRootProps()} style={{ cursor: 'pointer', height: '250px' }} className="border p-3">
                  <input {...getInputProps()} name={props.name} />

                  {
                    file !== null ? <img className="img-fluid" src={URL.createObjectURL(file)} alt="Uploaded file preview" style={{maxHeight: "100%"}}/>
                      : <div>
                        <p>Click or drop to upload your file.</p>
                        <p>Only {props.type === 'other' ? '*.pdf' : '*.jpg and *.jpeg'} files will be accepted.</p>
                        <p>(50MB Maximum File Size)</p>
                      </div>
                  }
                </div>
              </section>
            )
          }}
        </Dropzone>
      </FormGroup>
    );
  }

  return (
    <FormGroup>
      <Label>YouTube or Vimeo Video URL</Label>
      <input type="url" name={name} className="form-control" placeholder="http://youtube.com/" onChange={(event) => {props.handleChange("url", event.target.value)}} />
    </FormGroup>
  );
}

CreatePortfolioEntryCard.propTypes = {
  // Name of the input
  name: PropTypes.string.isRequired,
  // Accepts a File from the browser file API
  handleChange: PropTypes.func,
  // One of the submission types. photo, video, other
  type: PropTypes.string.isRequired
}

export default CreatePortfolioEntryCard;