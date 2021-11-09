import User from '../../models/user'
import Entry from '../../models/entry'
import Vote from '../../models/vote'
import { ADMIN, JUDGE } from '../../constants'

export default {
  Portfolio: {
    judges (portfolio) {
      return portfolio.getUsers()
    },
    entries (show, _, context) {
      // Admins and judges should see all entries on a show
      if (context.authType === ADMIN || context.authType === JUDGE) {
        return show.getEntries()
      } else {
        return User.findByPk(context.username)
          .then((user) => {
            return user.getOwnAndGroupEntries(show.id)
          })
      }
    },
    ownVotes (show, _, context) {
      return Entry.findAll({ where: { showId: show.id } }).then((showEntries) => {
        // search for the entires that match the permission constraints
        const entryIds = showEntries.map(entry => entry.id)
        return Vote.findAll({
          where: {
            judgeUsername: context.username,
            entryId: entryIds
          }
        })
      })
    }
  }
}
