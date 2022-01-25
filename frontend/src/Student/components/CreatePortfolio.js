import React, { Component, Fragment, useState } from 'react'
import { Form, FormGroup, FormFeedback, Label, Button, Row, Col } from 'reactstrap'

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

import SuccessModal from './SuccessModal'
import DisplayNameInput from './DisplayNameInput'
import FileUploadInput from './FileUploadInput'

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

function EntryInput(props) {
  const [entryType, setType] = useState("photo");

  const EntryTypeButtons = () => {
    return (
      <div className='w-100'>
        <h4>Entry type</h4>
        <div className='d-flex my-3'>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class={`btn btn-primary${entryType === "photo" ? " active" : ""}`}>
              <input type="radio" name="options" id="option1" checked={entryType === "photo"} onClick={() => { setType("photo") }} /> Photo
            </label>
            <label class={`btn btn-primary${entryType === "video" ? " active" : ""}`}>
              <input type="radio" name="options" id="option2" checked={entryType === "video"} onClick={() => { setType("video") }} /> Video
            </label>
          </div>
        </div>
      </div>
    )
  }

  if (entryType === "photo") {
    return (
      <div className='my-3'>
        <EntryTypeButtons />
        <p>Upload a file (Photo or Other Media Submission):</p>
        <FileUploadInput
          key={props.index + ' file'}
          path={props.path}
          name='path'
          accept='image/jpeg'
          errors={props.errors}
          handleImageUpload={props.handleImageUpload}
          handlePDFUpload={props.handlePDFUpload}
          previewFile={props.previewImage}
          renderErrors={props.renderErrors}
          setFieldValue={props.setFieldValue}
          touched={props.touched}
          type={props.type}
        />
      </div>
    )
  }

  return (
    <div className='my-3'>
      <EntryTypeButtons />
      <Label>YouTube or Vimeo Video URL</Label>
      <Field
        key={props.index + ' video'}
        url={props.url}
        type="url"
        id="url"
        name="url"
        className="form-control"
        placeholder="http://youtube.com/"
      />
    </div>
  )
}

class CreatePortfolio extends Component {
  static defaultProps = {
    previewImage: {}
  }

  constructor(props) {
    super(props)
    this.state = {}
    // Clear any uploaded files for the next time a user views the form.
    if (props.clearPreview) { props.clearPreview() }
  }

  buildInput() {

  }

  buildValidationSchema() {

  }

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
    const validation = this.buildValidationSchema()
    return (
      <FormGroup>
        <Fragment>
          <Formik
            initialValues={{
              submissions: new Array(10).fill(null).map(() => ({ path: '', url: '' }))

            }}
            validationSchema={validation}
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
                      <ul>
                        {values.submissions.map((submission, index) =>
                          <ListContainer key={index}>
                            <li>
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
                                index={index}
                                url={submission.url}
                              />
                            </li>
                            <hr />
                          </ListContainer>
                        )}
                      </ul>
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
export default CreatePortfolio