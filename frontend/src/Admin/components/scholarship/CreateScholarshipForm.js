import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

function CreateScholarshipForm(props) {

  const [form_data, setFormData] = useState({
    name: '',
    description: ''
  });

  /**
   * 
   * @param {React.FormEvent} event 
   */
   async function handleSubmit(event) {
    event.preventDefault();
    // Create the scholarship from form_data
    const scholarship = {
      name: form_data.name,
      description: form_data.description
    }
    props.create(scholarship)
      .then(() => {navigateHome()})
      .catch(err => handleError(err.message))
  }

  function navigateHome() {
    window.location.href = '/';
  }

  function handleChange(event) {
    setFormData({
      ...form_data,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={6}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type='text'
              id='name'
              name='name'
              className='form-control'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type='textarea'
              id='description'
              name='description'
              className='form-control'
              rows={3}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type='submit'
            color='primary'
            style={{
              cursor: 'pointer'
            }}
          >
            Create
          </Button>
        </Col>
        <Col>
          <Button
            type='button'
            color='danger'
            className="float-right"
            style={{
              cursor: 'pointer'
            }}
            onClick={navigateHome}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateScholarshipForm