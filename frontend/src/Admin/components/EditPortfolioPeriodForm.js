import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

import styled from 'styled-components'
import moment from 'moment'
import isAfterDay from 'react-dates/src/utils/isAfterDay'

import DateRangeInput from '../../shared/components/DateRangeInput'

const CalendarContainer = styled.div`
  margin-bottom: 25px;
`

function EditPortfolioPeriodForm(props) {
  
  const [form_data, setFormData] = useState({
    name: '',
    description: '',
    entryStart: null,
    entryEnd: null,
    judgingStart: null,
    judgingEnd: null
  });

  /**
   * 
   * @param {React.FormEvent} event 
   */
   async function handleSubmit(event) {
    event.preventDefault();
    // Update the portfolio period from form_data
    const portfolio_period = {
      name: form_data.name,
      description: form_data.description,
      startDate: form_data.entryStart,
      endDate: form_data.entryEnd,
      judgingStartDate: form_data.judgingStart,
      judgingEndDate: form_data.judgingEnd
    }
    try {
      props.update(portfolio_period)
        .then(() => {navigateHome()})
        .catch(err => handleError(err.message))
    } catch (e) {
      //error handling
    }
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

  function handleDateRange(name, value) {
    if(value === null) return;
    setFormData({
      ...form_data,
      [name]: value
    })
  }

  if(moment(form_data.entryStart).isAfter(moment())){
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
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                component='textarea'
                id='description'
                name='description'
                className='form-control'
                rows={3}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Submission Dates</Label>
                  <CalendarContainer>
                  <DateRangeInput
                    isOutsideRange={day => !isAfterDay(day, moment())}
                    startDateInput={{
                      field: 'entryStart',
                      input: {
                        onChange: handleDateRange,
                        onBlur: ()=>{},
                        value: form_data.entryStart
                      }
                    }}
                    endDateInput={{
                      field: 'entryEnd',
                      input: {
                        onChange: handleDateRange,
                        onBlur: ()=>{},
                        value: form_data.entryEnd
                      }
                    }}
                    required
                  />
                </CalendarContainer>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Judging Dates</Label>
                  <CalendarContainer>
                  <DateRangeInput
                    isOutsideRange={day => !isAfterDay(day, moment())}
                    startDateInput={{
                      field: 'judgingStart',
                      input: {
                        onChange: handleDateRange,
                        onBlur: ()=>{},
                        value: form_data.judgingStart
                      }
                    }}
                    endDateInput={{
                      field: 'judgingEnd',
                      input: {
                        onChange: handleDateRange,
                        onBlur: ()=>{},
                        value: form_data.judgingEnd
                      }
                    }}
                    required
                  />
                </CalendarContainer>
                </FormGroup>
              </Col>
            </Row>
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
   else{
    return(
      <h2>Portfolio Periods cannot be edited once the submission period has begun.</h2>
    )
  }
}

export default EditPortfolioPeriodForm
