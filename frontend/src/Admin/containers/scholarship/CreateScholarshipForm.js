import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from  "../../../shared/actions"

import CreateScholarshipMutation from '../../mutations/scholarship/createScholarship.graphql'
import CreateScholarshipForm from '../../components/scholarship/CreateScholarshipForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(CreateScholarshipMutation, {
    props: ({ mutate }) => ({
      create: scholarship =>
        mutate({
          variables: { input: scholarship }
        })
    })
  })
)(CreateScholarshipForm)