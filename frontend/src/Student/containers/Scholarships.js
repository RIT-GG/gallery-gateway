// GraphQL and Redux State
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'
import Scholarships from '../components/scholarships/Scholarships'

import ScholarshipQuery from "../queries/scholarships/activeScholarships.graphql"

// Portfolio related data
const mapStateToProps = state => ({
    studentUsername: state.shared.auth.user.username
})

const mapDispatchToProps = dispatch => ({
    handleError: message => dispatch(displayError(message))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // Query for scholarships and attach them to props
    graphql(ScholarshipQuery, {
        props: ({ data: { scholarships, loading, error } }) => ({
            scholarships,
            loading,
            error
        }),
        options: ownProps => ({
            variables: {
                studentUsername: ownProps.studentUsername
            }
        })
    })
)(Scholarships)
