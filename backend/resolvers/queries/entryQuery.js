import Entry from '../../models/entry'
import User from '../../models/user'
import Show from '../../models/show'
import { UserError } from 'graphql-errors'
import { ADMIN, JUDGE } from '../../constants'

export function entries (_, args, context) {
  // Make sure an admin, assigned judge, or own user is requesting
  let hasPermissionPromise = Promise.resolve(false)
  const isRequestingOwnUser = context.username !== undefined &&
    context.username === args.studentUsername
  if (isRequestingOwnUser) {
    // everyone can request their own entries
    hasPermissionPromise = Promise.resolve(true)
  } else if (context.authType === ADMIN) {
    // admins can do everything
    hasPermissionPromise = Promise.resolve(true)
  } else if (context.authType === JUDGE && args.showId) {
    // judges can request the entries for shows to which they're assigned
    hasPermissionPromise = Show.findByPk(args.showId, {rejectOnEmpty: true})
      .then(show => show.getUsers())
      .then(users =>
        users.map(user => user.username)
          .indexOf(context.username) >= 0
      )
  }

  return hasPermissionPromise.then(hasPermission => {
    if (!hasPermission) {
      throw new UserError('Permission Denied')
    }
    // Get all entries if no args given
    if (!args.showId && !args.studentUsername) {
      return Entry.all()
    } else if (args.showId) { // Get entries by show
      return Entry.findAll({ where: { showId: args.showId } })
    } else if (args.studentUsername) { // get entries by username
      return User.findByPk(args.studentUsername).then((student) => {
        return student.getOwnAndGroupEntries()
      })
    } else {
      return Entry.findAll({ where: { args } })
    }
  })
}
