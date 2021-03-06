import Vote from '../../models/vote'
import Entry from '../../models/entry'

import { UserError } from 'graphql-errors'
import { ADMIN, JUDGE } from '../../constants'

export function votes (_, args, context) {
  const isRequestingOwnJudgeUser = context.username !== undefined &&
    context.authType === JUDGE && context.username === args.judgeUsername
  if (context.authType !== ADMIN && !isRequestingOwnJudgeUser) {
    throw new UserError('Permission Denied')
  }
  // Get all entries on a show
  return Entry.findAll({
    where: { showId: args.showId }
  }).then((showEntries) => {
    // search for the entires that match the permission constraints
    const entryIds = showEntries.map(entry => entry.id)
    return getVotes(args.judgeUsername, context.authType, entryIds)
  })
}

export function vote (_, args, context) {
  const isRequestingOwnJudgeUser = context.username !== undefined &&
    context.authType === JUDGE && context.username === args.judgeUsername
  if (context.authType !== ADMIN && !isRequestingOwnJudgeUser) {
    throw new UserError('Permission Denied')
  }
  return Vote.findOne({
    where: {
      judgeUsername: args.judgeUsername,
      entryId: args.entryId
    }
  })
}

function getVotes (username, authType, entryIds) {
  // Give all votes on the show if the user
  // is an admin and username was not given
  if (authType === ADMIN && !username) {
    return Vote.findAll({
      where: { entryId: entryIds }
    })
  } else {
    // Return the votes only for the given judge
    return Vote.findAll({
      where: {
        judgeUsername: username,
        entryId: entryIds
      }
    })
  }
}
