import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { TabContent, TabPane, Container, Row, Col } from 'reactstrap'
import { RoutedTabs, NavTab } from 'react-router-tabs'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'recompose'

import PortfolioPeriodDetailsTab from '../containers/portfolio/PortfolioPeriodDetailsTab'
import PortfolioPeriodPortfoliosTab from '../containers/portfolio/PortfolioPeriodPortfoliosTab'
import AssignJudgesPortfolioPeriodTable from '../containers/portfolio/AssignJudgesPortfolioPeriodTable'
import PortfolioPeriodQuery from '../queries/portfolio/portfolioPeriod.graphql'
import Loading from '../../shared/components/Loading'
import NotFound from '../../shared/components/NotFound'
import PortfolioPeriodSubmissions from '../containers/portfolio/PortfolioPeriodSubmissions'

const ViewPortfolioPeriod = props => {
  if (props.loading) {
    return <Loading />
  }

  if (props.portfolioPeriod === undefined) {
    return <NotFound />
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{props.portfolioPeriod ? props.portfolioPeriod.name : ""}</h1>
        </Col>
      </Row>

      <hr />

      {/* We must use 'match.url' as the base because it contains the portfolioPeriod id */}
      <RoutedTabs
        startPathWith={props.match.url}
        className='nav nav-tabs'
        style={{ marginBottom: '1rem' }}
      >
        {/* 'replace={false} makes it so tab navigation is in the browser history */}
        <NavTab exact to='' replace={false} className='nav-item nav-link'>
          Details
        </NavTab>
        <NavTab
          exact
          to='/portfolios'
          replace={false}
          className='nav-item nav-link'
        >
          Portfolios
        </NavTab>
        <NavTab
          exact
          to='/submissions'
          replace={false}
          className='nav-item nav-link'
        >
          Submissions
        </NavTab>
        <NavTab
          exact
          to='/judges'
          replace={false}
          className='nav-item nav-link'
        >
          Judges
        </NavTab>
      </RoutedTabs>

      <TabContent>
        <TabPane>
          <Switch>
            <Route
              path={`/portfolio-period/:id/judges/assign`}
              render={() => <AssignJudgesPortfolioPeriodTable portfolioPeriod={props.portfolioPeriod} />}
            />
            <Route
              path={`/portfolio-period/:id/portfolios`}
              render={() => <PortfolioPeriodPortfoliosTab portfolioPeriod={props.portfolioPeriod} />}
            />
            <Route
              path={`/portfolio-period/:id/submissions`}
              render={() => <PortfolioPeriodSubmissions portfolioPeriod={props.portfolioPeriod} />}
            />
            <Route
              path="/portfolio-period/:id"
              render={() => <PortfolioPeriodDetailsTab portfolioPeriod={props.portfolioPeriod} />}
            />
          </Switch>
        </TabPane>
      </TabContent>
    </Container>
  )
}

ViewPortfolioPeriod.propTypes = {
  loading: PropTypes.bool,
  portfolioPeriod: PropTypes.shape({
    name: PropTypes.string
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default compose(
  graphql(PortfolioPeriodQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id
      }
    }),
    props: ({ data: { portfolioPeriod, loading } }) => ({
      portfolioPeriod,
      loading
    })
  })
)(ViewPortfolioPeriod)
