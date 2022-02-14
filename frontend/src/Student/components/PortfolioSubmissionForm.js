import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, } from 'reactstrap'

import styled from 'styled-components'
import { IMAGE_UPLOAD_PATH, PDF_UPLOAD_PATH } from '../../utils'

import PortfolioEntryInput from './portfolio/PortfolioEntryInput'

const Header = styled.h1`
  margin-bottom: 10px;
`

const SubHeader = styled.h3`
  margin-bottom: 25px;
`

// Incrementing index for tracking each submission
let entry_index_global = 1;

const ENTRY_FACTORY = () => {
  return {
    id: entry_index_global++,
    type: "photo",
    file: null,
    url: '',
    title: '',
    comment: '',
  }
}

function PortfolioSubmissionForm(props) {
  const [form_data, setFormData] = useState({
    title: "Untitled",
    studentUsername: props.user.username,
    submissions: [ENTRY_FACTORY()]
  });

  /**
   * Effect for ensuring there is always 1 submission on the form
   */
  useEffect(() => {
    if (form_data.submissions.length === 0) {
      addSubmission();
    }
  }, [form_data.submissions])

  /**
   * Handles only allowing 10 submissions to be created a for a portfoliko
   */
  function addSubmission() {
    if (form_data.submissions.length < 10) {
      setFormData({
          ...form_data,
          submissions: form_data.submissions.concat(ENTRY_FACTORY())
        });
    }
  }

  function deleteSubmissions(submission_id) {
    const filtered_submissions = form_data.submissions.filter((sub) => {
      if (sub.id === submission_id) {
        return false;
      }
      return true;
    });
    setFormData({
      ...form_data,
      submissions: filtered_submissions
    });
  }

  async function submitEntry(entry, portfolio_id) {
    // Instantiate default return value
    let created_entry = null;
    if (entry.type === "video") {
      created_entry = await props.createVideoEntry({
        entry: {
          studentUsername: form_data.studentUsername,
          "portfolioId": parseInt(portfolio_id),
          title: entry.title
        },
        url: entry.url
      });
    }

    else if (entry.type === "photo") {
      const formData = new FormData()
      formData.append('image', entry.file)

      const photo_path = await axios.post(IMAGE_UPLOAD_PATH, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("_token_v1")}` }
      });
      created_entry = await props.createPhotoEntry({
        entry: {
          studentUsername: form_data.studentUsername,
          "portfolioId": parseInt(portfolio_id),
          title: entry.title
        },
        path: photo_path.data.path,
        horizDimInch: 11.5,
        vertDimInch: 12.3,
        mediaType: "print"
      })
    }

    else if (entry.type === "other") {
      const formData = new FormData()
      formData.append('pdf', entry.file)

      // Upload the image to the server then store the file link in the database
      const pdf_path = await axios.post(PDF_UPLOAD_PATH, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("_token_v1")}` }
      })
      created_entry = await props.createOtherMediaEntry({
        entry: {
          studentUsername: form_data.studentUsername,
          "portfolioId": parseInt(portfolio_id),
          title: entry.title
        },
        path: pdf_path.data.path
      })
    }

    return created_entry
  }

  /**
   * Creates the portfolio via the graphQL mutation prop provided by the container
   * Extracts the portfolio_id then loops over each submission and 
   * creates an entry using the porfolio_id
   * @param {React.FormEvent} event 
   */
  async function handleSubmit(event) {
    event.preventDefault();
    // Create the portfolio from form_data
    const portfolio = {
      title: form_data.title,
      studentUsername: form_data.studentUsername,
      portfolioPeriodId: "6744"
    }
    const portfolio_response = await props.createPortfolio(portfolio);
    try {
      // Extract the portfolio id and use that to create all the entries
      const portfolio_id = portfolio_response.data.createPortfolio.id;
      for (let i = 0; i < form_data.submissions.length; i++) {
        const entry = form_data.submissions[i];
        await submitEntry(entry, portfolio_id);
      }

    } catch (e) {
      // portfolio creation failed
    }

    // Naviagte back to the portfolios page
    window.location.href = '/portfolios';
  }

  /**
   * Updates the 
   * @param {React.FormEvent} event 
   */
  function handleChange(event) {
    setFormData({
      ...form_data,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '75px' }}>
      <Container>
        <Row>
          <Col xs='12' md='8'>
            <Header>New Portfolio</Header>
            <FormGroup>
              <Label for="title">Portfolio title</Label>
              <Input type="text" className="form-control" name="title" placeholder="My Portfolio" required onChange={handleChange} />
            </FormGroup>
            <SubHeader>Upload Media Submissions</SubHeader>
            <b>You may upload up to 10 submissions. (Photo, Video, or Other Media)</b>
            <p>You may only upload one file OR video link per row.</p>
            {form_data.submissions.length > 0 &&
              form_data.submissions.map((submission, index) => {
                return (
                  <div key={`form_data.submissions.${submission.id}`}>
                    <PortfolioEntryInput
                      submission={submission}
                      renderErrors={this.renderErrors}
                      setSubmissions={setSubmissions}
                      submissions={form_data.submissions}
                    />
                    <Button color="danger" onClick={() => { deleteSubmissions(submission.id) }}>Delete</Button>
                    <hr />
                  </div>
                )
              })}

          </Col>
        </Row>
        <Row>
          <Col md={8} className="d-flex justify-content-between align-items-center">
            <Button color="secondary d-block mb-3" onClick={addSubmission}>Add Entry</Button>
            <Button type="submit" color="primary">Create</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default PortfolioSubmissionForm