/* eslint-disable no-unused-vars */
import { ApolloServer, gql } from 'apollo-server-express'

import resolvers from './resolvers'

const typeDefs = gql`
scalar Date

type User {
    username: ID!
    firstName: String!
    lastName: String!
    displayName: String
    hometown: String
    type: UserType!
    entries: [Entry]
    shows(date: Date): [Show]
}

input UserInput {
    username: String!
    firstName: String!
    lastName: String!
    displayName: String
    hometown: String
}

input PermissionInput {
    username: String!
    type: UserType
}

type Group {
    id: ID!
    creator: User!
    participants: String!
}

input GroupInput {
    creatorUsername: String!
    participants: String!
}

type PortfolioPeriod {
    id: ID!
    startDate: Date!
    endDate: Date!
    judgingStartDate: Date!
    judgingEndDate: Date!
    portfolios: [Portfolio]
    createdAt: Date!
    updatedAt: Date!
}

type Portfolio {
    id: ID!
    title: String!
    studentUsername: String!
    description: String
    entries: [Entry]
    createdAt: Date!
    updatedAt: Date!
}

input PortfolioInput {
    title: String!
    description: String
    studentUsername: String
    portfolioPeriodId: String
}


type Show {
    id: ID!
    name: String!
    description: String
    entryStart: Date!
    entryEnd: Date!
    judgingStart: Date!
    judgingEnd: Date!
    entryCap: Int!
    finalized: Boolean
    entries: [Entry]
    judges: [User]
    ownVotes: [Vote]
    createdAt: Date!
    updatedAt: Date!
}

input ShowInput {
    name: String!
    description: String
    entryStart: Date!
    entryEnd: Date!
    judgingStart: Date!
    judgingEnd: Date!
    entryCap: Int!
}

input ShowUpdate {
    name: String
    description: String
    entryStart: Date
    entryEnd: Date
    judgingStart: Date
    judgingEnd: Date
    entryCap: Int
    finalized: Boolean
}

type Vote {
    id: ID!
    judge: User
    entry: Entry
    value: Int!
}

input VoteInput {
    judgeUsername: String!
    entryId: Int!
    value: Int!
}

interface Entry {
    id: ID!
    distributionAllowed: Boolean
    group: Group
    student: User
    show: Show
    portfolioId: Int
    title: String
    comment: String
    forSale: Boolean
    invited: Boolean
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
    score: Float
    entryType: String
    votes: [Vote]
    excludeFromJudging: Boolean
}

input EntryInput {
    group: GroupInput
    distributionAllowed: Boolean
    studentUsername: String
    showId: Int
    portfolioId: Int
    title: String!
    comment: String
    forSale: Boolean
    hometown: String
    displayName: String
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
}

input EntryUpdate {
    title: String
    comment: String
    forSale: Boolean
    invited: Boolean
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
    excludeFromJudging: Boolean
}

type Photo implements Entry {
    id: ID!
    group: Group
    distributionAllowed: Boolean
    student: User
    show: Show
    portfolioId: Int
    title: String
    comment: String
    forSale: Boolean
    invited: Boolean
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
    score: Float
    entryType: String
    votes: [Vote]
    excludeFromJudging: Boolean

    path: String!
    horizDimInch: Float
    vertDimInch: Float
    mediaType: String
}

input PhotoInput {
    entry: EntryInput
    path: String!
    horizDimInch: Float!
    vertDimInch: Float!
    mediaType: String!
}

type Video implements Entry {
    id: ID!
    group: Group
    student: User
    distributionAllowed: Boolean
    show: Show
    portfolioId: Int
    title: String
    comment: String
    forSale: Boolean
    invited: Boolean
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
    score: Float
    entryType: String
    votes: [Vote]
    excludeFromJudging: Boolean

    provider: String!
    videoId: String!
}

input VideoInput {
    entry: EntryInput
    url: String!
}

type OtherMedia implements Entry {
    id: ID!
    group: Group
    distributionAllowed: Boolean
    student: User
    show: Show
    portfolioId: Int
    title: String
    comment: String
    forSale: Boolean
    invited: Boolean
    yearLevel: String
    academicProgram: String
    moreCopies: Boolean
    score: Float
    entryType: String
    votes: [Vote]
    excludeFromJudging: Boolean

    path: String!
}

input OtherMediaInput {
    entry: EntryInput
    path: String
}

enum UserType {
    STUDENT
    ADMIN
    JUDGE
}

type Query {
    self: User
    user(id: ID!): User
    users(type: UserType): [User]
    group(id: ID!): Group
    portfolio(id: ID!): Portfolio
    portfolioPeriod(id: ID, active: Boolean): PortfolioPeriod
    portfolios(orderBy: OrderByItem, studentUsername: String): [Portfolio]
    show(id: ID!): Show
    groups: [Group]
    shows(orderBy: OrderByItem, studentUsername: String): [Show]
    vote(entryId: ID!, judgeUsername: String!): Vote
    votes(showId: ID!, judgeUsername: String): [Vote]
    photo(id: ID!): Photo
    video(id: ID!): Video
    otherMedia(id: ID!): OtherMedia
    entry(id: ID!): Entry
    entries(showId: ID, studentUsername: String): [Entry]
}

type Mutation {
    createJudge(input: UserInput!): User
    createAdmin(input: UserInput!): User
    updatePermissions(input: PermissionInput!): User
    updateUser(input: UserInput!): User
    deleteUser(id: ID!): User

    createShow(input: ShowInput!): Show
    updateShow(id: ID!, input: ShowUpdate!): Show
    deleteShow(id: ID!): Boolean
    assignToShow(showId: ID!, usernames: [String]!): Boolean
    removeFromShow(showId: ID!, usernames: [String]!): Boolean

    createPortfolio(input: PortfolioInput!): Portfolio

    createPhoto(input: PhotoInput!): Show
    createVideo(input: VideoInput!): Show
    createOtherMedia(input: OtherMediaInput!): Show
    updateEntry(id: ID!, input: EntryUpdate!): Entry

    vote(input: VoteInput): Vote
}

enum SortDirection {
    ASC
    DESC
}

input OrderByItem {
    sort: String!
    direction: SortDirection!
}
`

const SCHEMA = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authType: req.auth.type,
    username: req.auth.username
  })
})

// NOTE: Uncomment in development to have schema endpoints mocked
// addMockFunctionsToSchema({schema})

export default SCHEMA
