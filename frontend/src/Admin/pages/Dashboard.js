import React, { useEffect, useState } from 'react'
import { Link, Route, useLocation } from 'react-router-dom'
import { Container, Row, Col, Button, Carousel, CarouselItem } from 'reactstrap'

import Shows from '../containers/Shows'
import PortfolioPeriods from '../containers/PortfolioPeriods'

const FEATURE__SHOWS = 0;
const FEATURE__PORTFOLIO_PERIODS = 1;

const Dashboard = () => {
  const [active_feature, setActiveFeature] = useState(FEATURE__SHOWS);

  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location])


  return (
    <Container>
      <Row className='align-items-baseline'>
        <Col>
          <h1>Dashboard</h1>
        </Col>
        <Col md='3'>
          <Button
            color='primary'
            className='btn-block'
            style={{ cursor: 'pointer' }}
            tag={Link}
            to='/show/new'
          >
            Create Show
          </Button>
        </Col>
        <Col md='3'>
          <Button
            color='primary'
            className='btn-block'
            style={{ cursor: 'pointer' }}
            tag={Link}
            to='/portfolio-period/new'
          >
            Create Portfolio Period
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="my-3">
          <Button onClick={() => {setActiveFeature(FEATURE__SHOWS)}}>Shows</Button>
          <Button onClick={() => {setActiveFeature(FEATURE__PORTFOLIO_PERIODS)}}>Portfolio Periods</Button>
        </Col>
        <Col>
          <Carousel activeIndex={active_feature} interval={false}>
            <CarouselItem>
              <h1>Shows</h1>
              <Shows />
            </CarouselItem>

            <CarouselItem>
              <h1>Portfolio Periods</h1>
              <PortfolioPeriods />
            </CarouselItem>
          </Carousel>

          <Shows />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
