import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Label, FormGroup } from 'reactstrap'

function FileUploadInput (props) {
  const [file, setFile] = useState(null)
  const dropzoneClasses = 'form-control d-flex align-items-center justify-content-center'
  const name = props.name || 'path'

  function onDrop (acceptedFiles) {
    // Only 1 submission at a time. Grab the first file
    const file = acceptedFiles[0]
    switch (file.type) {
      // application/pdf only for Other Media submission
      case 'application/pdf' && props.type === 'other':
        props.handlePDFUpload(file).then(() => {
          setFile(file)
          props.setFieldValue(name, props.previewFile.path)
        })
        break
      case 'image/jpeg':
        props.handleImageUpload(file).then(() => {
          setFile(file)
          props.setFieldValue(name, props.previewFile.path)
        })
        break
      default:
        console.error(`Unknown File Type: ${file.type}`)
    }
  }

  return (
    <FormGroup>
      <Label for={name}>{props.type === 'photo' ? 'Photo' : 'File'}</Label>
      <Dropzone name={name} accept={props.accept || 'application/pdf,image/jpeg'} className={dropzoneClasses} onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => {
          return (
            <section>
              <div {...getRootProps()} style={{ cursor: 'pointer', height: '250px' }} className="border p-3">
                <input {...getInputProps()} />

                {
                  file ? <img className="h-100" src={URL.createObjectURL(file)} alt="Uploaded file preview" />
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
      {props.renderErrors(props.touched, props.errors, 'path')}
    </FormGroup>
  )
}
export default FileUploadInput
