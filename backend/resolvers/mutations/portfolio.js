import Portfolio from '../../models/portfolio'
import { UserError } from 'graphql-errors'
import { STUDENT } from '../../constants'

export async function createPortfolio (_, args, context) {
  // only students can create portfolios
  if (context.authType !== STUDENT) {
    throw new UserError('Permission Denied')
  }
  const {title, studentUsername, portfolioPeriodId} = args.input

  // Not all input is used in the portfolio table, extract only data needed for the portfolio
  const newPortfolio = {
    title,
    studentUsername,
    portfolioPeriodId
  }
  return Portfolio.create(newPortfolio)
}