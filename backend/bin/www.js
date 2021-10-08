// NOTE: This is the entrypoint for Backpack (https://github.com/jaredpalmer/backpack)
import app from '../server'
import nconf from '../config'

import SCHEMA from '../schema';

const server = async () => {
  await SCHEMA.start()
  SCHEMA.applyMiddleware({ app })
  const port = nconf.get('PORT') || 3000
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
  })
}

server()
