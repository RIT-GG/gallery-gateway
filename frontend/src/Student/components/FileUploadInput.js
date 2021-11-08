import React, { Component } from "react";
import Dropzone from 'react-dropzone'
import styled from 'styled-components'
import { Field } from "formik";
import { Label, FormGroup } from "reactstrap";

const PreviewImage = styled.img`
  height: 100%;
`

class FileUploadInput extends Component{
  render(){
    return (
      <React.Fragment>
        <FormGroup>
          <Label for='path'>{this.props.type == "photo" ? "Photo" : "File"}</Label>
          <Field
            id='path'
            name='path'
            value='path'
            render={({ field, form }) =>
              <Dropzone
                name='path'
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
                    //application/pdf only for Other Media submission
                    case 'application/pdf' && this.props.type == "other":
                      this.props.handlePDFUpload(file).then(() => {
                        form.setFieldValue(this.props.name, this.props.previewFile.preview)
                      })
                      break
                    //image/jpeg is valid for all submission types
                    case 'image/jpeg':
                      this.props.handleImageUpload(file).then(() => {
                        form.setFieldValue(this.props.name, this.props.previewFile.preview)
                      })
                      break
                    default:
                      console.error(`Unknown File Type: ${file.type}`)
                  }
                }}
              >
                {this.props.previewFile.preview ? (
                  <PreviewImage src={this.props.previewFile.preview} />
                ) : (
                  <span>
                    <p>Click or drop to upload your file.</p>
                    <p>Only {this.props.type == "other" ? "*.jpg, *jpeg, and *.pdf": "*.jpg and *.jpeg"} files will be accepted.</p>
                    <p>(50MB Maximum File Size)</p>
                  </span>
                )}
              </Dropzone>
            }
          />
          {this.props.renderErrors(this.props.touched, this.props.errors, 'path')}
        </FormGroup>
      </React.Fragment>
    );
  }
}
export default FileUploadInput