
import { UserError } from 'graphql-errors'
import { ADMIN } from '../../constants'
import Scholarship from '../../models/scholarship'

export async function createScholarship (_, args, context) {
  // only students can create portfolios
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  const {name, description} = args.input

  // Not all input is used in the portfolio table, extract only data needed for the portfolio
  const newScholarship = {
    name,
    description,
    active: true
  }
  return Scholarship.create(newScholarship)
}