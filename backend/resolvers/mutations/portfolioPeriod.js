import { UserError } from 'graphql-errors'
import { ADMIN } from '../../constants'
import PortfolioPeriod from '../../models/portfolioPeriod'

export async function createPortfolioPeriod (_, args, context) {
  // only students can create portfolios
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  const {description, name, startDate, endDate, judgingStartDate, judgingEndDate} = args.input

  // Not all input is used in the portfolio table, extract only data needed for the portfolio
  let newPortfolioPeriod = {
    startDate,
    endDate,
    judgingStartDate,
    judgingEndDate
  }

  if(typeof description === "string" ){ newPortfolioPeriod.description = description };
  if(typeof name === "string" ){ newPortfolioPeriod.name = name };
  return PortfolioPeriod.create(newPortfolioPeriod)
}