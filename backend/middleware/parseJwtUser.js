import { parseToken } from '../helpers/jwt'
import nconf from '../config'
import { ADMIN } from '../constants'

export default async function (req, res, next) {
  // Parse and validate a JWT token included in an Authorization header
  let decoded = {}
  if (req.headers.authorization &&
        req.headers.authorization.indexOf('Bearer ') === 0) {
    const token = req.headers.authorization.substr('Bearer '.length)
    try {
      decoded = await parseToken(token)
    } catch (error) {
      console.error(error)
      decoded = {}
    }
  }
  req.auth = decoded
  req.auth.type = req.auth.type || null

  // In development, make all GraphiQL requests ADMIN requests
  if (nconf.get('NODE_ENV') === 'development' &&
        req.headers.referer &&
        req.headers.referer.indexOf('http://localhost:3000/graphiql') === 0) {
    req.auth.type = ADMIN
  }
  next()
}
