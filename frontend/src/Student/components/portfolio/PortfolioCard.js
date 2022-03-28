import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import SinglePortfolioModal from '../SinglePortfolioModal'
import '../../../assets/css/portfolio.css'
import PortfolioEntry from './PortfolioEntry'
import { Link } from 'react-router-dom'

function PortfolioCard(props) {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)
  function togglePortfolioModal() { setShowPortfolioModal(showPortfolioModal => !showPortfolioModal) }
  const { portfolio } = props
  const { entries, title } = portfolio
  return (
    <Card className="bg-light portfolio-card mt-3">
      <CardHeader>
        <div className="d-flex flex-column flex-lg-row">
          <h2 className="mb-0">{title}</h2>
          <Button color="primary" outline onClick={togglePortfolioModal} className="ml-lg-auto mr-lg-2 my-2 my-lg-0">View details</Button>
          <Button
            color='primary'
            style={{ cursor: 'pointer' }}
            tag={Link}
            to={`/scholarships/?portfolioId=${portfolio.id}`}
          >
            Apply to scholarships with this portfolio
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="portfolio-entries">
          {entries.map((entry) => {
            return (
              <div className='mr-lg-3'>
                <PortfolioEntry entry={entry} key={`portfolio.${portfolio.id}.entry.${entry.id}`} />
              </div>
            )
          })}
        </div>
      </CardBody>
      <SinglePortfolioModal isOpen={showPortfolioModal} toggle={togglePortfolioModal} portfolio={portfolio} />
    </Card>
  )
}

export default PortfolioCard
