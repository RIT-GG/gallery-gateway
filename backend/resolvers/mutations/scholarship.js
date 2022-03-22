
import { UserError } from 'graphql-errors'
import { ADMIN } from '../../constants'
import Scholarship from '../../models/scholarship'

export async function createScholarship (_, args, context) {
  // only admins can create scholarships
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  const {name, description} = args.input

  // All scholraships are considered active when created
  const newScholarship = {
    name,
    description,
    active: true
  }
  return Scholarship.create(newScholarship)
}