import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, } from 'reactstrap'

import styled from 'styled-components'

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
    type: "photo",
    file: null,
    url: '',
    title: '',
    comment: '',
  }
}

function EntryInput(props) {
  const entryType = props.submission.type;

  function handleChange(field, value) {
    const updated_submissions = props.submissions.map((sub) => {
      if (sub.id === props.submission.id) {
        return {
          ...sub,
          [field]: value
        }
      }
      return sub;
    })
    props.setSubmissions(updated_submissions);
  }

  const EntryTypeButtons = () => {
    return (
      <div className='w-100'>
        <Label for="entry-type">Entry Type</Label>
        <div className='d-flex mb-3'>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn-primary${entryType === "photo" ? " active" : ""}`}>
              <input type="radio" name="entry-type" id="photo-entry" value="photo" checked={entryType === "photo"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Photo
            </label>
            <label className={`btn btn-primary${entryType === "video" ? " active" : ""}`}>
              <input type="radio" name="entry-type" id="video-entry" value="video" checked={entryType === "video"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Video
            </label>
            <label className={`btn btn-primary${entryType === "other" ? " active" : ""}`}>
              <input type="radio" name="entry-type" id="other-entry" value="other" checked={entryType === "other"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Other
            </label>
          </div>
        </div>
      </div>
    )
  }

  const name = `submissions.${props.index}`;


  return (
    <div className='my-3'>
      <EntryTypeButtons />

      <FormGroup>
        <Label for={`${props.name}.title`}>Title</Label>
        <Input type="text" name={`${props.name}.title`} placeholder="Entry Title" onChange={(event) => { handleChange("title", event.target.value) }} />
      </FormGroup>
      <CreatePortfolioEntryCard
        name={name}
        type={entryType}
        submission={props.submission}
        handleChange={handleChange}
      />
    </div>
  );
}
function PortfolioSubmissionForm(props) {

  const [submissions, setSubmissions] = useState([ENTRY_FACTORY()]);
  const [form_data, setFormData] = useState({
    title: "",
    studentUsername: props.user.username
  });

  /**
   * Effect for ensuring there is always 1 submission on the form
   */
  useEffect(() => {
    if (submissions.length === 0) {
      addSubmission();
    }
  }, [submissions])

  /**
   * Handles only allowing 10 submissions to be created a for a portfoliko
   */
  function addSubmission() {
    if (submissions.length < 10) {
      setSubmissions(submissions.concat(ENTRY_FACTORY()))
    }
  }

  function deleteSubmissions(submission_id) {
    const filtered_submissions = submissions.filter((sub) => {
      if (sub.id === submission_id) {
        return false;
      }
      return true;
    });
    setSubmissions(filtered_submissions);
  }

  // Create the object of input values and submit the entry
  function handleSubmit(event) {
    event.preventDefault();
    const portfolio = {
      title: form_data.title,
      studentUsername: form_data.studentUsername,
      entries: submissions.map((sub) => {
        // TODO: build entries
        return {

        }
      }),
    }
  }


  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '75px' }}>
      <Container>
        <Row>
          <Col xs='12' md='8'>
            <Header>New Portfolio</Header>
            <FormGroup>
              <Label for="title">Portfolio title</Label>
              <Input type="text" className="form-control" placeholder="My Portfolio" required onChange={(event) => {
                setFormData({
                  ...form_data,
                  title: event.target.value
                })
              }} />
            </FormGroup>
            <SubHeader>Upload Media Submissions</SubHeader>
            <b>You may upload up to 10 submissions. (Photo, Video, or Other Media)</b>
            <p>You may only upload one file OR video link per row.</p>
            {submissions.length > 0 &&
              submissions.map((submission, index) => {
                return (
                  <div key={`submissions.${submission.id}`}>
                    <EntryInput
                      submission={submission}
                      renderErrors={this.renderErrors}
                      setSubmissions={setSubmissions}
                      submissions={submissions}
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