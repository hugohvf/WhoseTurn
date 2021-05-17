import Page from '@/components/page'
import TaskCard from '@/components/task-card'
import { Tasks } from '@/domain/entities'
import { changeAssigneeTask, getAllTasks } from '@/services/task'
import { useCallback, useEffect, useState } from 'react'

const Index = () => {
	const [tasks, setTasks] = useState<Tasks>([])

	useEffect(() => {
		updateTasks()
	}, [])

	const updateTasks = async () => {
		const tasks = await getAllTasks()
		if (tasks) setTasks(tasks)
	}

	const updateTaskAssignee = async (taskId: string, userId: string) => {
		const updatedTask = await changeAssigneeTask(taskId, userId)
		if (updatedTask) updateTasks()
		// setTasks(
		// 	tasks.map((currTask) =>
		// 		currTask.id === taskId ? updatedTask : currTask
		// 	)
		// )
	}

	return (
		<Page>
			<section className='mt-4'>
				{tasks?.length > 0 &&
					tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onChangeAssignee={updateTaskAssignee}
						/>
					))}
			</section>
		</Page>
	)
}

export default Index
