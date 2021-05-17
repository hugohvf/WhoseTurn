import { Task, Tasks } from '@domain/entities'
import { api } from '@services/api'

const TASK_URL = {
	get: '/api/task',
}

export const getAllTasks = async () => {
	try {
		const { data } = await api.get<Tasks>(TASK_URL.get)

		return data
	} catch (error) {
		return
	}
}

export const changeAssigneeTask = async (taskId: string, userId: string) => {
	try {
		const { data } = await api.patch<Task>(TASK_URL.get, {
			action: 'update_current_assignee',
			value: {
				task_id: taskId,
				user_id: userId,
			},
		})

		return data
	} catch (error) {
		return
	}
}
