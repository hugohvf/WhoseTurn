import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

const jsonPath = './tasks.json'
const jsonEncoding = 'utf-8'

type Task = {
	id: string
	name: string
	users_assigned: User[]
	current_assignee_id: string
	last_updated: Date
}

type Tasks = Task[]

type User = {
	id: string
	name: string
}

type UpdateTaskAssigneePayload = {
	task_id: string
	user_id: string
}

type PatchRequestBody = {
	action: 'update_current_assignee'
	value: UpdateTaskAssigneePayload
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const tasks = loadTasks()
			return res.status(200).json(tasks)
		} catch (error) {
			return res.status(500).json({ statusCode: 500, message: error.message })
		}
	}

	if (req.method === 'PATCH') {
		try {
			const { action, value }: PatchRequestBody = req.body
			if (action === 'update_current_assignee') {
				const { task_id, user_id } = value

				const tasks = loadTasks()
				const selectedTask = tasks.find((task) => task.id === task_id)

				if (!selectedTask)
					return res.status(400).json({ message: 'TASK_NOT_FOUND' })

				if (isAssigneeIdInTask(selectedTask?.users_assigned, user_id)) {
					selectedTask.current_assignee_id = user_id
					selectedTask.last_updated = new Date()
					console.log(tasks)
					fs.writeFileSync(jsonPath, JSON.stringify(tasks))
					return res.status(200).json(selectedTask)
				}
				return res.status(400).json({ message: 'USER_NOT_FOUND' })
			}
		} catch (error) {
			return res.status(500).json({ statusCode: 500, message: error.message })
		}
	}
}

const isAssigneeIdInTask = (
	assigneesFromTask: User[],
	assigneeId: string
): Boolean => {
	return (
		assigneesFromTask.findIndex((assignee) => assignee.id === assigneeId) !== -1
	)
}

const loadTasks = (): Tasks => {
	return JSON.parse(fs.readFileSync(jsonPath, jsonEncoding))
}

export default handler
