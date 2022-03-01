import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'

import CreatePortfolioPeriodMutation from '../mutations/createPortfolioPeriod.graphql'
import CreatePortfolioPeriodForm from '../components/CreatePortfolioPeriodForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(CreatePortfolioPeriodMutation, {
    props: ({ mutate }) => ({
      create: portfolioPeriod =>
        mutate({
          variables: { input: portfolioPeriod }
        })
    })
  })
)(CreatePortfolioPeriodForm)
