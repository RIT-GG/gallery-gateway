import React, { useState } from "react";
import PropTypes from "prop-types"
import { FormGroup, Label } from "reactstrap";
import Dropzone from "react-dropzone";

function CreatePortfolioEntryCard(props){
    const [file, setFile] = useState(null);
    return (
        <FormGroup>
          <Label for={props.name}>Photo</Label>
          <Dropzone name={props.name} accept='image/jpeg' className='form-control d-flex align-items-center justify-content-center' onDrop={(acceptedFiles) => {setFile(acceptedFiles[0])}}>
            {({ getRootProps, getInputProps }) => {
              return (
                <section>
                  <div {...getRootProps()} style={{ cursor: 'pointer', height: '250px' }} className="border p-3">
                    <input {...getInputProps()} name={name} />

                    {
                      file !== null ? <img className="h-100" src={URL.createObjectURL(file)} alt="Uploaded file preview" />
                        : <div>
                          <p>Click or drop to upload your file.</p>
                          <p>Only {props.type === 'other' ? '*.jpg, *jpeg, and *.pdf' : '*.jpg and *.jpeg'} files will be accepted.</p>
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

CreatePortfolioEntryCard.propTypes = {
    // Name of the input
    name: PropTypes.string.isRequired,
    // Accepts a File from the browser file API
    onDrop: PropTypes.func,
    // A file to be shown as the preview
    file: PropTypes.any,
    // One of the submission types. photo, video, other
    type: PropTypes.string.isRequired
}

export default CreatePortfolioEntryCard;