import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import SinglePortfolioModal from './SinglePortfolioModal'
import '../../assets/css/portfolio.css'
import PortfolioEntry from './portfolio/PortfolioEntry'

function PortfolioCard(props) {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)
  function togglePortfolioModal() { setShowPortfolioModal(showPortfolioModal => !showPortfolioModal) }
  return (
    <Card className="bg-light portfolio-card mt-3">
      <CardHeader>
        <div className="d-flex flex-wrap justify-content-between">
          <h2 className="mb-0">{props.portfolio.title}</h2>
          <Button color="primary" onClick={togglePortfolioModal}>View details</Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="portfolio-entries">
          {props.portfolio.entries.map((entry) => { return <PortfolioEntry entry={entry} key={entry.id} /> })}
        </div>
      </CardBody>
      <SinglePortfolioModal isOpen={showPortfolioModal} toggle={togglePortfolioModal} portfolio={props.portfolio} />
    </Card>
  )
}

export default PortfolioCard
