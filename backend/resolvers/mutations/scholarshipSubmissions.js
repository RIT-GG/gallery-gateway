
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
    throw new Error("No portfolio found with the provided id.")
  }
  const portfolioPeriodId = portfolio.portfolioPeriodId


  // All scholraships are considered active when created
  const newScholarshipSubmissions = {
    scholarshipId,
    portfolioId,
    portfolioPeriodId
  }

  return ScholarshipSubmission.create(newScholarshipSubmissions)
}