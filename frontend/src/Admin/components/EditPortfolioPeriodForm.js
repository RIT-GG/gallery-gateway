import React, { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

import styled from 'styled-components'
import moment from 'moment'
import isAfterDay from 'react-dates/src/utils/isAfterDay'

import DateRangeInput from '../../shared/components/DateRangeInput'

const CalendarContainer = styled.div`
  margin-bottom: 25px;
`

function EditPortfolioPeriodForm(props) {
  const { portfolioPeriod } = props;

  const [form_data, setFormData] = useState({
    name: portfolioPeriod ? portfolioPeriod.name : "",
    description: portfolioPeriod ? portfolioPeriod.description : "",
    startDate: null,
    endDate: null,
    judgingStartDate: null,
    judgingEndDate: null
  });

  useEffect(() => {
    if (portfolioPeriod) {
      const { name, description, startDate, endDate, judgingStartDate, judgingEndDate } = portfolioPeriod;
      setFormData({
        name,
        description,
        startDate: moment(startDate),
        endDate: moment(endDate),
        judgingStartDate: moment(judgingStartDate),
        judgingEndDate: moment(judgingEndDate)
      })
    }
  }, [portfolioPeriod])

  /**
   * 
   * @param {React.FormEvent} event 
   */
  async function handleSubmit(event) {
    event.preventDefault();
    // Update the portfolio period from form_data
    const portfolioPeriod_update = {
      name: form_data.name,
      description: form_data.description,
      startDate: form_data.startDate,
      endDate: form_data.endDate,
      judgingStartDate: form_data.judgingStartDate,
      judgingEndDate: form_data.judgingEndDate
    }
    props.update(portfolioPeriod_update)
      .then(() => { navigateHome() })
      .catch(err => console.error(err.message))
  }

  function navigateHome() {
    window.location.href = '/portfolio-period';
  }

  function handleChange(event) {
    setFormData({
      ...form_data,
      [event.target.name]: event.target.value
    })
  }

  function handleDateRange(name, value) {
    if (value === null) return;
    setFormData({
      ...form_data,
      [name]: value
    })
  }

  if (moment(portfolioPeriod.judgingEndDate).isAfter(moment())) {
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
                component='textarea'
                id='description'
                name='description'
                className='form-control'
                rows={3}
                value={form_data.description}
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
                      startDateField={{
                        field: 'startDate',
                        input: {
                          onChange: handleDateRange,
                          onBlur: () => { },
                          value: form_data.startDate
                        }
                      }}
                      endDateField={{
                        field: 'endDate',
                        input: {
                          onChange: handleDateRange,
                          onBlur: () => { },
                          value: form_data.endDate
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
                      startDateField={{
                        field: 'judgingStartDate',
                        input: {
                          onChange: handleDateRange,
                          onBlur: () => { },
                          value: form_data.judgingStartDate
                        }
                      }}
                      endDateField={{
                        field: 'judgingEndDate',
                        input: {
                          onChange: handleDateRange,
                          onBlur: () => { },
                          value: form_data.judgingEndDate
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
  else {
    return (
      <h2>Portfolio Periods cannot be edited once the judging period has ended.</h2>
    )
  }
}

export default EditPortfolioPeriodForm
