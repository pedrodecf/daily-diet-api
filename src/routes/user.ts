import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionCookieExists } from '../middlewares/check-session-cookie-exists'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const registerSchema = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, username, email, password } = registerSchema.parse(
      request.body,
    )

    if (await knex('user').where({ username }).first()) {
      return reply.code(400).send({ message: 'Username already taken' })
    }

    if (await knex('user').where({ email }).first()) {
      return reply.code(400).send({ message: 'Email already taken' })
    }

    await knex('user').insert({
      id: randomUUID(),
      name,
      username,
      email,
      password,
    })

    return reply.code(201).send({ message: 'User created' })
  })

  app.post('/login', async (request, reply) => {
    const loginSchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = loginSchema.parse(request.body)

    const user = await knex('user').where({ username }).first()

    if (!user) {
      return reply
        .code(400)
        .send({ message: 'Username or password is invalid' })
    }

    if (user.password !== password) {
      return reply
        .code(400)
        .send({ message: 'Username or password is invalid' })
    }

    const sessionCookie = user.id

    reply.setCookie('sessionCookie', sessionCookie, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return reply.send({ message: 'Logged in' })
  })

  app.get(
    '/summary',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request) => {
      const allUserMeals = await knex('meals')
        .where({ userId: request.cookies.sessionCookie })
        .select()

      const registredMeals = allUserMeals.length

      const dietMeals = allUserMeals.filter(
        (meal) => meal.dietFood === 1,
      ).length

      const nonDietMeals = registredMeals - dietMeals

      let currentSequence = 0
      let maxSequence = 0

      allUserMeals.forEach((meal) => {
        if (meal.dietFood === 1) {
          currentSequence++
          if (currentSequence > maxSequence) {
            maxSequence = currentSequence
          }
        } else {
          currentSequence = 0
        }
      })

      return {
        'Total de refeições registradas': registredMeals,
        'Total de refeições dentro da dieta': dietMeals,
        'Total de refeições fora da dieta': nonDietMeals,
        'Maior sequência de refeições dentro da dieta': maxSequence,
      }
    },
  )
}
