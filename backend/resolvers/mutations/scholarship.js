
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


/**
 * Handles updating portfolio periods in the database
 * from a graphql mutation
 */
 export function updateScholarship(_, args, context) {
  // Only admins can update scholarships
  if (context.authType !== ADMIN) {
    throw new UserError('Permission Denied')
  }
  return Scholarship.findByPk(args.id)
    .then((scholarship) => {
      return scholarship.update(args.input, {
        // All fields that are allowed to be updated
        fields: ['name', 'description', 'active']
      })
    })
}