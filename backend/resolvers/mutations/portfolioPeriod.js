import { UserError } from 'graphql-errors'
import { ADMIN } from '../../constants'
import PortfolioPeriod from '../../models/portfolioPeriod'

export async function createPortfolioPeriod(_, args, context) {
  // only students can create portfolios
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  const { description, name, startDate, endDate, judgingStartDate, judgingEndDate } = args.input

  // Required portfolio period fields
  let newPortfolioPeriod = {
    startDate,
    endDate,
    judgingStartDate,
    judgingEndDate
  }

  // Appened optional fields, check that types match expected schema type prior to appending 
  if (typeof description === "string") { newPortfolioPeriod.description = description };
  if (typeof name === "string") { newPortfolioPeriod.name = name };

  return PortfolioPeriod.create(newPortfolioPeriod)
}


/**
 * Handles updating portfolio periods in the database
 * from a graphql mutation
 */
export function updatePortfolioPeriod(_, args, context) {
  // Only admins can update portfolio periods
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  return PortfolioPeriod.findByPk(args.id)
    .then((portfolio_period) => {
      return portfolio_period.update(args.input, {
        // All fields that are allowed to be updated
        fields: ['name', 'description',
          'startDate', 'endDate',
          'judgingStartDate', 'judgingEndDate'
        ]
      })
    })
}