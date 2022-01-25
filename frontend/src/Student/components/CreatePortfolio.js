import React, { Component, Fragment } from 'react'
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

class CreatePortfolio extends Component {
  static defaultProps = {
    previewImage: {}
  }

  constructor (props) {
    super(props)
    this.state = { }
    // Clear any uploaded files for the next time a user views the form.
    if (props.clearPreview) { props.clearPreview() }
  }

  buildInput(){
    
  }

  buildValidationSchema(){
    
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
  submitForm (values) {
    const inputs = this.buildInput(values)
    this.createEntry(inputs, values)
  }

  render () {
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
                          <ListContainer>
                            <li>
                              <hr/>
                              <p>Upload a file (Photo or Other Media Submission), or a YouTube or Vimeo link:</p>
                              <FileUploadInput 
                                key={index + ' file'}
                                path={submission.path}
                                name='path'
                                accept='image/jpeg'
                                errors={errors}
                                handleImageUpload={this.props.handleImageUpload}
                                handlePDFUpload={this.props.handlePDFUpload}
                                previewFile={this.props.previewImage}
                                renderErrors={this.renderErrors}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                type={this.props.type}
                              />
                              <b>OR</b><br/>
                              <Label>YouTube or Vimeo Video URL</Label>
                              <Field
                                key={index + ' video'}
                                url={submission.url}
                                type="url"
                                id="url"
                                name="url"
                                className="form-control"
                                placeholder="http://youtube.com/"
                                disabled
                              />
                              <br/>
                            </li>
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