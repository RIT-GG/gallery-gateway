import React from "react";
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import { Field } from "formik";
import { Label, FormGroup } from "reactstrap";

const PreviewImage = styled.img`
  height: 100%;
`

export default function FileUploadInput(props) {
  return (
    <React.Fragment>
      <FormGroup>
        <Label for='path'>{props.type == "photo" ? "Photo" : "File"}</Label>
        <Field
          id='path'
          name='path'
          render={({ field, form }) =>
            <Dropzone
              //name={props.name}
              accept='application/pdf,image/jpeg'
              style={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                height: '250px',
                justifyContent: 'center',
                textAlign: 'center'
              }}
              activeStyle={{
                borderColor: '#6c6',
                backgroundColor: '#eee'
              }}
              rejectStyle={{
                borderColor: '#c66',
                backgroundColor: '#eee'
              }}
              className='form-control'
              onDrop={acceptedFiles => {
                const file = acceptedFiles[0]

                switch (file.type) {
                  case 'application/pdf':
                    props.handlePDFUpload(file).then(() => {
                      // Need to use 'this.props' here to get the most up-to-date value – 'previewFile' above will be out-of-date
                      form.setFieldValue(props.name, props.previewFile.path)
                    })
                    break
                  case 'image/jpeg':
                    props.handleImageUpload(file).then(() => {
                      // Need to use 'this.props' here to get the most up-to-date value – 'previewFile' above will be out-of-date
                      form.setFieldValue(props.name, props.previewFile.path)
                    })
                    break
                  default:
                    console.error(`Unknown File Type: ${file.type}`)
                }
              }}
            >
              {props.previewFile && props.previewFile.preview ? (
                <PreviewImage src={props.previewFile.preview} />
              ) : (
                <span>
                  <p>Click or drop to upload your file.</p>
                  <p>Only {props.type == "other" ? "*.jpg, *jpeg, and *.pdf": "*.jpg and *.jpeg"} files will be accepted.</p>
                  <p>(50MB Maximum File Size)</p>
                </span>
              )}
            </Dropzone>
          }
        />
        {props.renderErrors(touched, errors, 'path')}
      </FormGroup>
    </React.Fragment>
  );
}
