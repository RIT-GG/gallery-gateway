import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

function EditScholarshipForm(props) {
  const { scholarship } = props;

  const [form_data, setFormData] = useState({
    name: scholarship ? scholarship.name : "",
    description: scholarship ? scholarship.description : "",
    active: scholarship ? scholarship.active : false
  });

  useEffect(() => {
    if (scholarship) {
      const { name, description, active } = scholarship;
      setFormData({
        name,
        description,
        active
      })
    }
  }, [scholarship])

  /**
   * 
   * @param {React.FormEvent} event 
   */
  async function handleSubmit(event) {
    event.preventDefault();
    // Update the scholarship from form_data
    const scholarship_update = {
      name: form_data.name,
      description: form_data.description,
      active: form_data.active
    }
    props.update(scholarship_update)
      .then(() => { navigateHome() })
      .catch(err => console.error(err.message))
  }

  function navigateHome() {
    window.location.href = '/scholarships';
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormData({
      ...form_data,
      [name]: value
    });
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
              onChange={handleChange}
              value={form_data.name}
              required
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
              value={form_data.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Input
              type='checkbox'
              id='active'
              name='active'
              checked={form_data.active}
              onChange={handleChange}
            />
              {' '}Active
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row className={'mt-5'}>
        <Col>
          <Button
            type='submit'
            color='primary'
            style={{
              cursor: 'pointer'
            }}
          >
            Save
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

export default EditScholarshipForm
