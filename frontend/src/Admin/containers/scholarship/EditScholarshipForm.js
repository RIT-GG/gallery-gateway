import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import { displayError } from '../../../shared/actions'

import ScholarshipsQuery from '../../queries/scholarships/scholarships.graphql'
import UpdateScholarshipMutation from '../../mutations/scholarship/updateScholarship.graphql'
import EditScholarshipForm from '../../components/scholarship/EditScholarshipForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(UpdateScholarshipMutation, {
    props: ({ mutate, ownProps }) => ({
      update: scholarship =>
        mutate({
          variables: { id: ownProps.scholarship.id, input: scholarship }
        })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: ScholarshipsQuery
        }
      ]
    })
  })
)(EditScholarshipForm)