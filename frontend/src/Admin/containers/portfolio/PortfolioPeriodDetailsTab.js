import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import PortfolioPeriodDetailsTab from '../../components/portfolio/PortfolioPeriodDetailsTab'

const mapDispatchToProps = (dispatch, ownProps) => ({
  })

export default compose(
    connect(null, mapDispatchToProps),
  )(PortfolioPeriodDetailsTab)