
import { UserError } from 'graphql-errors'
import { STUDENT } from '../../constants'
import Portfolio from '../../models/portfolio'

import ScholarshipSubmission from '../../models/scholarshipSubmissions'

export async function createScholarshipSubmission(_, args, context) {
  // only admins can create scholarships
  if (context.authType !== STUDENT) {
    throw new UserError('Permission Denied')
  }
  const { scholarshipId, portfolioId } = args.input
  
  // Grab the associated portfolio period id from the portfolio
  const portfolio = await Portfolio.findByPk(portfolioId)
  if (!portfolio) {
    throw new UserError("No portfolio found with the provided id.")
  }
  const portfolioPeriodId = portfolio.portfolioPeriodId

  // Check that all required fields have been supplied
  if(!scholarshipId || !portfolioPeriodId || !portfolioId){
    throw new UserError("Missing required fields")
  }

  // Check if the user has submitted to this scholarship before
  const hasSubmitted = await ScholarshipSubmission.findOne({where: {scholarshipId, portfolioId, portfolioPeriodId} })
  if( hasSubmitted ){
    throw new UserError("You've already submitted to this scholarship with this portfolio.")
  }

  // Build the scholarship submission
  const newScholarshipSubmissions = {
    scholarshipId,
    portfolioId,
    portfolioPeriodId
  }

  return ScholarshipSubmission.create(newScholarshipSubmissions)
}