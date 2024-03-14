import { Knex } from 'knex'

declare module 'knex/types/table' {
  export interface Table {
    user: {
      id: string
      name: string
      username: string
      email: string
      password: string
      created_at: string
      updated_at: string
      session_id?: string
    }
    meals: {
      id: string
      userId: string
      name: string
      description: string
      created_at: string
      dietFood: boolean
    }
  }
}
