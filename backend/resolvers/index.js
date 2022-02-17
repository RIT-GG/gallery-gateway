import Entry from './types/entryType'
import Photo from './types/photoType'
import Video from './types/videoType'
import OtherMedia from './types/otherMediaType'
import User from './types/userType'
import DateScalar from './types/dateScalar'
import Group from './types/groupType'
import Portfolio from './types/portfolioType'
import PortfolioPeriod from './types/portfolioPeriodType'
import Show from './types/showType'
import Vote from './types/voteType'
import * as EntryMutations from './mutations/entry'
import * as EntryQuery from './queries/entryQuery'
import * as PortfolioMutations from './mutations/portfolio'
import * as PortfolioQuery from './queries/portfolioQuery'
import * as PortfolioPeriodMutations from './mutations/portfolioPeriod'
import * as PortfolioPeriodQuery from './queries/portfolioPeriodQuery'
import * as ShowMutations from './mutations/show'
import * as ShowQuery from './queries/showQuery'
import * as UserMutations from './mutations/user'
import * as UserQuery from './queries/userQuery'
import * as VoteMutations from './mutations/vote'
import * as VoteQuery from './queries/voteQuery'

export default {
  ...Entry,
  ...Photo,
  ...Video,
  ...OtherMedia,
  ...User,
  ...DateScalar,
  ...Group,
  ...Portfolio,
  ...Show,
  ...PortfolioPeriod,
  ...Vote,
  Query: {
    ...EntryQuery,
    ...PortfolioQuery,
    ...ShowQuery,
    ...PortfolioPeriodQuery,
    ...UserQuery,
    ...VoteQuery
  },
  Mutation: {
    ...EntryMutations,
    ...PortfolioMutations,
    ...PortfolioPeriodMutations,
    ...ShowMutations,
    ...UserMutations,
    ...VoteMutations
  }
}
