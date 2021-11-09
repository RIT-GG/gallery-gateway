import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import PortfoliosQuery from '../queries/portfolios.graphql'
import Portfolios from '../components/Portfolios'
import { displayError } from '../../shared/actions'

const mapStateToProps = state => ({
  studentUsername: state.shared.auth.user.username
})

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(PortfoliosQuery, {
    props: ({ data: { portfolios, loading, error } }) => ({
      portfolios,
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        studentUsername: ownProps.studentUsername
      }
    })
  })
)(Portfolios)
