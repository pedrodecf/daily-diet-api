import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { userRoutes } from './routes/user'
import { mealsRoutes } from './routes/meals'

const server = fastify()
server.register(cookie)
server.register(userRoutes)
server.register(mealsRoutes)

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
