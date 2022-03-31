import React from 'react'
import { Container } from 'reactstrap'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import EditScholarshipForm from '../containers/scholarship/EditScholarshipForm'
import ScholarshipQuery from '../queries/scholarships/scholarship.graphql'

const EditScholarship = props => (
  <Container>
    <h1>Edit Scholarship</h1>
    { props.scholarship ? <EditScholarshipForm scholarship={props.scholarship} /> : null }
  </Container>
)

export default compose(
  graphql(ScholarshipQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id
      }
    }),
    props: ({ data: { scholarship, loading } }) => ({
      scholarship,
      loading
    })
  })
) (EditScholarship)
