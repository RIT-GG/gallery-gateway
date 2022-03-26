
import { UserError } from 'graphql-errors'
import { STUDENT } from '../../constants'

import ScholarshipSubmission from '../../models/scholarshipSubmissions'

export async function createScholarshipSubmission (_, args, context) {
  // only admins can create scholarships
  if (context.authType !== STUDENT) {
    throw new UserError('Permission Denied')
  }
  const {scholarshipId, portfolioPeriodId, portfolioId} = args.input

  // All scholraships are considered active when created
  const newScholarshipSubmissions = {
    scholarshipId,
    portfolioPeriodId,
    portfolioId
  }
  return ScholarshipSubmission.create(newScholarshipSubmissions)
}