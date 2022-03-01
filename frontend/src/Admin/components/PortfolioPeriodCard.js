import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Badge } from 'reactstrap'
import moment from 'moment'
import Moment from 'react-moment'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaImage from '@fortawesome/fontawesome-free-regular/faImage'

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

// NOTE: Only 1 child should be provided
const FormattedDate = (props) => (
  <Moment
    title={moment(props.children).format('MMMM D, YYYY hh:mm:ss a')}
    format='MMMM D, YYYY'
  >
    {props.children}
  </Moment>
)

class PortfolioPeriodCard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    judgingStartDate: PropTypes.string.isRequired,
    judgingEndDate: PropTypes.string.isRequired,
    portfolios: PropTypes.array,
  }

  renderOpenClose = (opens, closes) => (
    <Fragment>
      <dl style={{width: '50%'}} className='d-inline-block'>
        <dt>{moment().isBefore(moment(opens)) ? 'Opens:' : 'Opened:' }</dt>
        <dd><FormattedDate>{opens}</FormattedDate></dd>
      </dl>
      <dl style={{width: '50%'}} className='d-inline-block'>
        <dt>{moment().isBefore(moment(closes)) ? 'Closes:' : 'Closed:' }</dt>
        <dd><FormattedDate>{closes}</FormattedDate></dd>
      </dl>
    </Fragment>
  )

  renderSubmissionSummary = (props) => {
    const totalPortfolios = Array.isArray(props.portfolios) ? props.portfolios.length : 0;

    return (
      <Fragment>
        {/* <h4>Submissions: <Badge color='primary'>{totalPortfolios}</Badge></h4> */}
        <div>
          <FontAwesomeIcon icon={FaImage} className='mr-2' />
          <h6 className='text-bold d-inline-block'>
            Portfolios: <Badge color='dark'>{totalPortfolios}</Badge>
          </h6>
        </div>
      </Fragment>
    )
  }

  renderClosedPortfolioPeriod = ({ startDate, judgingEndDate }) => (
    <Row>
      <Col className='mb-3'>
        <h4>Closed Portfolio Period</h4>
        <FormattedDate>{startDate}</FormattedDate>
        {' - '}
        <FormattedDate>{judgingEndDate}</FormattedDate>
      </Col>
    </Row>
  )

  renderBody = (props) => {
    const {
      startDate,
      endDate,
      judgingStartDate,
      judgingEndDate
    } = props

    const now = moment()
    const isPortfolioPeriodInFuture = now.isBefore(moment(startDate))
    const isPortfolioPeriodInSubmission = now.isAfter(moment(startDate)) && now.isBefore(moment(endDate))
    const isPortfolioPeriodBetweenSubmissionAndJudging = now.isAfter(moment(endDate)) && now.isBefore(moment(judgingStartDate))
    const isPortfolioPeriodInJudging = now.isAfter(moment(judgingStartDate)) && now.isBefore(moment(judgingEndDate))
    const isPortfolioPeriodClosed = now.isAfter(moment(judgingEndDate))

    if (isPortfolioPeriodClosed) {
      return this.renderClosedPortfolioPeriod(props)
    }

    // Dynamically set the sub-heading based on the portfolio period state
    let subHeading1 = ''
    let subHeading2 = ''

    if (isPortfolioPeriodInFuture) {
      subHeading1 = 'Pre Portfolio Period'
      subHeading2 = 'Pre Judging'
    } else if (isPortfolioPeriodInSubmission) {
      subHeading1 = 'Accepting Submissions'
      subHeading2 = 'Pre Judging'
    } else if (isPortfolioPeriodBetweenSubmissionAndJudging) {
      subHeading1 = 'No Longer Accepting Submissions'
      subHeading2 = 'Pre Judging'
    } else if (isPortfolioPeriodInJudging) {
      subHeading1 = 'No Longer Accepting Submissions'
      subHeading2 = 'Judging In Progress'
    }

    // We render Submission Period and Judging Period in two columns,
    // except for when the portfolio period is in submission, we render the summary info
    // in the second column and move the judging info below the submission period info
    return (
      <Row>
        <Col xs='12' md='6'>
          <h4>Submission Period</h4>
          <h6>{subHeading1}</h6>
          {this.renderOpenClose(startDate, endDate)}
          {isPortfolioPeriodInSubmission ? (
            <Fragment>
              <h4>Judging Period</h4>
              <h6>{subHeading2}</h6>
              {this.renderOpenClose(judgingStartDate, judgingEndDate)}
            </Fragment>
          ) : null}
        </Col>
        <Col xs='12' md='6'>
          {isPortfolioPeriodInSubmission
            ? this.renderSubmissionSummary(props)
            : (
              <Fragment>
                <h4>Judging Period</h4>
                <h6>{subHeading2}</h6>
                {this.renderOpenClose(judgingStartDate, judgingEndDate)}
              </Fragment>
            )}
        </Col>
      </Row>
    )
  }

  renderButtons = (props) => (
    <Row>
      <Col>
        <Button
          color='primary'
          className='mr-4'
          style={{ cursor: 'pointer' }}
          tag={Link}
          to={`/portfolioperiod/${props.id}`}
          block
          outline
        >
          View Details
        </Button>
        <Button
          color='primary'
          style={{ cursor: 'pointer' }}
          tag={Link}
          to={`/portfolioperiod/${props.id}/submissions`}
          block
          outline
        >
          View Submissions
        </Button>
      </Col>
      <Col>
        <Button
          className='mr-4'
          color='primary'
          style={{ cursor: 'pointer' }}
          tag={Link}
          to={`/portfolioperiod/${props.id}/judges`}
          block
          outline
        >
          View Progress
        </Button>
        <Button
          color='primary'
          style={{ cursor: 'pointer' }}
          tag={Link}
          to={`/portfolioperiod/${props.id}/judges/assign`}
          block
          outline
        >
          Assign Judges
        </Button>
      </Col>
    </Row>
  )

  render () {
    return (
      <Card>
        <h2>
          <Link to={`portfolioperiod/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        {this.renderBody(this.props)}
        {this.renderButtons(this.props)}
      </Card>
    )
  }
}

export default PortfolioPeriodCard