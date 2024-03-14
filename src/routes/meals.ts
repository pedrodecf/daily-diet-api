import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionCookieExists } from '../middlewares/check-session-cookie-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/meals',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request, reply) => {
      const mealSchema = z.object({
        name: z.string(),
        description: z.string(),
        dietFood: z.boolean(),
      })

      const { name, description, dietFood } = mealSchema.parse(request.body)

      await knex('meals').insert({
        userId: request.cookies.sessionCookie,
        name,
        description,
        dietFood,
      })

      return reply.code(201).send({ message: 'Meal created' })
    },
  )

  app.get(
    '/meals',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request, reply) => {
      const { sessionCookie } = request.cookies

      const meals = await knex('meals')
        .where({ userId: sessionCookie })
        .select()

      return {
        meals,
      }
    },
  )

  app.get(
    '/meals/:id',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      const meal = await knex('meals')
        .where({ id, userId: request.cookies.sessionCookie })
        .first()

      if (!meal) {
        return reply.code(404).send({ message: 'Meal not found' })
      }

      return reply.send({ meal })
    },
  )

  app.delete(
    '/meals/:id',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      const mealToBeDeleted = await knex('meals')
        .where({
          id,
          userId: request.cookies.sessionCookie,
        })
        .first()
        .delete()

      if (!mealToBeDeleted) {
        return reply.code(404).send({ message: 'Meal not found' })
      }

      return reply.code(204).send()
    },
  )

  app.patch(
    '/meals/:id',
    {
      preHandler: [checkSessionCookieExists],
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }

      const mealSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        dietFood: z.boolean().optional(),
      })

      const { name, description, dietFood } = mealSchema.parse(request.body)

      const mealToBeUpdated = await knex('meals')
        .where({ id, userId: request.cookies.sessionCookie })
        .update({
          name,
          description,
          dietFood,
        })

      if (!mealToBeUpdated) {
        return reply.code(404).send({ message: 'Meal not found' })
      }

      return reply.code(200).send({ message: 'Meal updated' })
    },
  )
}
