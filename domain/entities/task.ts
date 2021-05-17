import { User } from '@domain/entities'

export type Task = {
	id: string
	name: string
	users_assigned: User[]
	current_assignee_id: string
	last_updated: Date
}

export type Tasks = Task[]
