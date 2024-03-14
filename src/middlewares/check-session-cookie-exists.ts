import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionCookieExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionCookie = request.cookies.sessionCookie

  if (!sessionCookie) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
}
