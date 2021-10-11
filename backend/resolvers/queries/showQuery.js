import Show from '../../models/show'
import User from '../../models/user'
import { UserError } from 'graphql-errors'
import { ADMIN } from '../../constants'

const isRequestingOwnUser = (context, args) => {
  return context.username !== undefined &&
        context.username === args.studentUsername
}

export function show (_, args, context) {
  return Show.findByPk(args.id)
}

export function shows (_, args, context) {
  // Students can only look at their own shows
  if (args.studentUsername && context.authType !== ADMIN && !isRequestingOwnUser(context, args)) {
    throw new UserError('Permission Denied')
  }

  // Apply ordering, if desired
  const order = args.orderBy ? { order: [[args.orderBy.sort, args.orderBy.direction]] } : {}

  // If username given, show all shows the student has submitted to
  if (args.studentUsername) {
    // Get all the shows the student has been on
    // (including as group creator), through entries
    return User
      .findByPk(args.studentUsername)
      .then((student) => {
        return student
          .getOwnAndGroupEntries()
        // Find all connected shows
          .then((entries) => {
            const showIds = entries.map(entry => entry.showId)
            // Predicate that matches shows open for submissions
            const isOpen = context.authType !== ADMIN
              ? {
                  $and: [
                    { entryStart: { $lt: new Date() } },
                    { entryEnd: { $gt: new Date() } }
                  ]
                }
              : {}
            // Where-clause that matches shows to which this student has
            // submitted as well as (if non-admin) any shows that are open.
            const whereClause = {
              where: {
                $or: [
                  { id: showIds },
                  isOpen
                ]
              }
            }
            return Show.findAll(Object.assign({}, whereClause, order))
          })
      })
  }

  // Otherwise just show all shows (with possible ordering)
  return Show.findAll(order)
}
