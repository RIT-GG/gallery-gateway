import React from 'react'
import { Container } from 'reactstrap'

import CreateScholarshipForm from '../containers/scholarship/CreateScholarshipForm'

const CreateScholarship = () => (
  <Container>
    <h1>Create Scholarship</h1>
    <CreateScholarshipForm />
  </Container>
)

export default CreateScholarship