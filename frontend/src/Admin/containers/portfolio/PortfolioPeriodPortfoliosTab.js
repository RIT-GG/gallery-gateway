import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { displayError } from '../../../shared/actions'
import PortfolioPeriodPortfoliosTab from '../../components/portfolio/PortfolioPeriodPortfoliosTab'


const mapDispatchToProps = (dispatch, {  }) => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
)(PortfolioPeriodPortfoliosTab)
