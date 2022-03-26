import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Scholarships from '../../components/scholarships/Scholarships'
import { displayError } from '../../../shared/actions'

// Graph QL queries
import ScholarshipsQuery from "../../queries/scholarships/scholarships.graphql"

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ScholarshipsQuery, {
    props: ({ ownProps, data: { scholarships, loading, error } }) => ({
      scholarships,
      loading,
      error
    })
  })
)(Scholarships)