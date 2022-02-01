import React, { Component, Fragment, useState } from 'react'
import { Form, FormGroup, FormFeedback, Label, Button, Row, Col } from 'reactstrap'

import { Formik, Field, FieldArray } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

import SuccessModal from './SuccessModal'
import DisplayNameInput from './DisplayNameInput'
import FileUploadInput from './FileUploadInput'
import CreatePortfolioEntryCard from './CreatePortfolioEntryCard'

const Header = styled.h1`
  margin-bottom: 10px;
`

const SubHeader = styled.h3`
  margin-bottom: 25px;
`

const ButtonContainer = styled.div`
  margin-top: 50px;
`

const ListContainer = styled.div`
  list-style: none
`
let entry_index_global = 1;

const ENTRY_FACTORY = () => {
  return {
    id: entry_index_global++,
    path: '',
    url: ''
  }
}

function EntryInput(props) {
  const [entryType, setType] = useState("photo");

  const EntryTypeButtons = () => {
    return (
      <div className='w-100'>
        <h4>Entry type</h4>
        <div className='d-flex my-3'>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn-primary${entryType === "photo" ? " active" : ""}`}>
              <input type="radio" name="options" id="photo-entry" checked={entryType === "photo"} onClick={() => { setType("photo") }} onChange={() => { }} /> Photo
            </label>
            <label className={`btn btn-primary${entryType === "video" ? " active" : ""}`}>
              <input type="radio" name="options" id="video-entry" checked={entryType === "video"} onClick={() => { setType("video") }} onChange={() => { }} /> Video
            </label>
            <label className={`btn btn-primary${entryType === "other" ? " active" : ""}`}>
              <input type="radio" name="options" id="other-entry" checked={entryType === "other"} onClick={() => { setType("other") }} onChange={() => { }} /> Other
            </label>
          </div>
        </div>
      </div>
    )
  }
  const name = `submissions.${props.index}.url`;
  if (entryType === "photo") {
    return (
      <div className='my-3'>
        <EntryTypeButtons />
        <CreatePortfolioEntryCard 
        name={name}
        type='photo' />
      </div>
    )
  }

  if (entryType === "other") {
    return (
      <div className='my-3'>
        <EntryTypeButtons />
        <p>Upload a file</p>
      </div>
    )
  }

  return (
    <div className='my-3'>
      <EntryTypeButtons />
      <Label>YouTube or Vimeo Video URL</Label>
      <input type="url" name={name} className="form-control" placeholder="http://youtube.com/"/>
    </div>
  )
}

class PortfolioSubmissionForm extends Component {

  renderErrors = (touched, errors, field) => {
    // Render feedback if this field's been touched and has errors
    if (touched[field] && errors[field]) {
      return (
        <FormFeedback style={{ display: 'block' }}>
          {errors[field]}
        </FormFeedback>
      )
    }
    // Otherwise, don't render anything
    return null
  }

  // Create the object of input values and submit the entry
  submitForm(values) {
    const inputs = this.buildInput(values)
    this.createEntry(inputs, values)
  }

  render() {
    return (
      <FormGroup>
        <Fragment>
          <Formik
            initialValues={{
              submissions: [ENTRY_FACTORY()]
            }}
            onSubmit={values => { this.submitForm(values) }}>
            {({
              values,
              errors,
              touched,
              setFieldValue,
              setFieldTouched,
              handleSubmit,
              isSubmitting
            }) => {
              return (
                <Form onSubmit={handleSubmit} style={{ marginBottom: '75px' }}>
                  <Row>
                    <Col xs='12' md='8' style={{ margin: '0 auto' }}>
                      <Header>New Portfolio</Header>
                      <SubHeader>Upload Media Submissions</SubHeader>
                      <b>You may upload up to 10 submissions. (Photo, Video, or Other Media)</b>
                      <p>You may only upload one file OR video link per row.</p>

                      {/* Render 10 FileUploadInputs and Video URL inputs */}
                      <FieldArray
                        name="submissions"
                        render={arrayHelpers => {
                          return (
                            <div>
                              {values.submissions.length > 0 &&
                                values.submissions.map((submission, index) => {
                                  return (
                                    <div key={`submissions.${index}.${submission.id}`}>
                                      <EntryInput
                                        path={submission.path}
                                        errors={errors}
                                        handleImageUpload={this.props.handleImageUpload}
                                        handlePDFUpload={this.props.handlePDFUpload}
                                        previewFile={this.props.previewImage}
                                        renderErrors={this.renderErrors}
                                        setFieldValue={setFieldValue}
                                        touched={touched}
                                        type={this.props.type}
                                        index={submission.id}
                                        url={submission.url}
                                      />
                                      <Button color="danger" onClick={() => { console.log("\n\n\n\n"); console.log(index); console.log(arrayHelpers.remove(index)); console.log("\n\n\n\n"); }}>Delete</Button>
                                      <hr />
                                    </div>
                                  )
                                })}
                              <Button color="secondary d-block mt-5" onClick={() => { arrayHelpers.push(ENTRY_FACTORY()) }}>Add Entry</Button>
                            </div>
                          )
                        }}
                      />
                    </Col>
                  </Row>
                </Form>
              )
            }}
          </Formik>
          <SuccessModal isOpen={this.props.showModal} />
        </Fragment>
      </FormGroup>
    )
  }
}
export default PortfolioSubmissionForm