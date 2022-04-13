import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { displayError, getDownloadToken } from '../../../shared/actions'
import PortfolioPeriodPortfoliosTab from '../../components/portfolio/PortfolioPeriodPortfoliosTab'
import { downloadPortfolioZip } from '../../actions'


const mapDispatchToProps = (dispatch, {  }) => ({
  downloadZip: (porfolioId) => 
  dispatch(getDownloadToken()).then(() => 
    dispatch(downloadPortfolioZip(porfolioId))
  ),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
)(PortfolioPeriodPortfoliosTab)
