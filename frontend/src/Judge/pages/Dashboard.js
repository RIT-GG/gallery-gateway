import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { Container, Row, Col, Button, Carousel, CarouselItem, NavItem, Nav } from 'reactstrap'

import Shows from '../containers/Shows'
import PortfolioPeriods from '../containers/PortfolioPeriods'

const FEATURE__SHOWS = 0;
const FEATURE__PORTFOLIO_PERIODS = 1;

const Dashboard = () => {
  const [active_feature, setActiveFeature] = useState(FEATURE__SHOWS);

  /**
   * Effect for updating the active feature in state
   * decides active feature based of path name in URL
   * Defaults to the shows tab
   */
  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case "/portfolio-periods":
        setActiveFeature(FEATURE__PORTFOLIO_PERIODS);
        return;
      default:
        setActiveFeature(FEATURE__SHOWS);
        return;
    }
  })


  return (
    <Container>
      <Row className='align-items-baseline'>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="my-3">
          <Nav tabs>
            <NavItem>
              <Link className={`nav-link${active_feature === FEATURE__SHOWS ? " active" : ""}`} to='/'>Shows</Link>
            </NavItem>
            <NavItem>
              <Link className={`nav-link${active_feature === FEATURE__PORTFOLIO_PERIODS ? " active" : ""}`} to="/portfolio-periods">Portfolio Periods</Link>
            </NavItem>
          </Nav>
        </Col>
        <Col>
          <Carousel activeIndex={active_feature} interval={false} next={() => { }} previous={() => { }}>
            <CarouselItem key={'carousel-item-shows'}>
              <h1>Shows</h1>
              <Shows />
            </CarouselItem>

            <CarouselItem key={'carousel-item-portfolio-periods'}>
              <h1 className='my-3'>Portfolio Periods</h1>
              <PortfolioPeriods />
            </CarouselItem>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
