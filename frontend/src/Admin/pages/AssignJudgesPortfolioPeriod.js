import React, { useEffect, Fragment, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import AssignJudgesPortfolioPeriodTable from '../containers/portfolio/AssignJudgesPortfolioPeriodTable'
import CreateJudgeForm from '../containers/CreateJudgeForm'
import NotFound from '../../shared/components/NotFound'
import PortfolioPeriodQuery from '../queries/portfolio/portfolioPeriod.graphql'
import Loading from '../../shared/components/Loading'

function AssignJudgesPortfolioPeriod({
  loading, // boolean for data loading state
  portfolioPeriod: portfolioPeriodProp // portfolio period object
}) {
  const [portfolioPeriod, setPortfolioPeriod] = useState(portfolioPeriodProp)

  /**
   * Effect for storing the portfolio period in state
   */
  useEffect(() => {
    // Only store the portfolio period in state if the prop is defined
    if (portfolioPeriodProp) setPortfolioPeriod(portfolioPeriodProp)

  }, [portfolioPeriodProp])

  if (loading) return <Loading />

  // Check the the portfolio period is defined
  if (!portfolioPeriod) return <NotFound />

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
        <AssignJudgesPortfolioPeriodTable portfolioPeriodId={parseInt(portfolioPeriod.id)} />
        <div className='mt-5 mb-5'>
          <CreateJudgeForm />
        </div>
      </Container>
    </Fragment>
  )
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
