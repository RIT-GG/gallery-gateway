import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import PortfolioPeriodSubmissions from '../../components/portfolio/PortfolioPeriodSubmissions'
import { displayError } from '../../../shared/actions'

// Graph QL queries
import ScholarshipSubmissionForPortfolioPeriod from "../../queries/scholarships/scholarshipSubmissionsForPortfolioPeriod.graphql"

const mapDispatchToProps = dispatch => ({
    handleError: message => dispatch(displayError(message))
})

export default compose(  
    connect(null, mapDispatchToProps),
    graphql(ScholarshipSubmissionForPortfolioPeriod, {
        props: ({ ownProps, data: { scholarshipSubmissions, loading, error } }) => ({
            scholarshipSubmissions,
            loading,
            error
        }),
        options: ownProps => ({
          variables: {
            id: ownProps.portfolioPeriod ? ownProps.portfolioPeriod.id : ""
          }
        })
    })
)(PortfolioPeriodSubmissions)