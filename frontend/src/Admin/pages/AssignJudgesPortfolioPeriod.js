import React, { useEffect, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import AssignJudgesPortfolioPeriodTable from '../containers/portfolio/AssignJudgesPortfolioPeriodTable'
import CreateJudgeForm from '../containers/CreateJudgeForm'
import NotFound from '../../shared/components/NotFound'
import PortfolioPeriodQuery from '../queries/portfolio/portfolioPeriod.graphql'

function AssignJudgesPortfolioPeriod (props) {

  function renderPage (portfolioPeriod) {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <h1>{portfolioPeriod.name}</h1>
            </Col>
          </Row>
          <hr />
        </Container>
        <Container fluid>
          <AssignJudgesPortfolioPeriodTable portfolioPeriodId={portfolioPeriod.id} />
          <div className='mt-5 mb-5'>
            <CreateJudgeForm />
          </div>
        </Container>
      </Fragment>
    )
  }

  // TODO: Show loading if loading so that 'Not Found' doesn't flash on valid portfolio periods
  return props.portfolioPeriod ? renderPage(props.portfolioPeriod) : <NotFound />
  
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
)(
  AssignJudgesPortfolioPeriod
)
