import { Task } from '@/domain/entities'
import React from 'react'
import { useCallback } from 'react'

type TaskCardProps = {
	task: Task
	onChangeAssignee: (taskId: string, userId: string) => void
}

const MILISECONDS = 1000

const SECONDS_IN = {
	DAYS: 86400,
	HOURS: 3600,
	MINUTES: 60,
}

const TaskCardMemo = ({ task, onChangeAssignee, ...props }: TaskCardProps) => {
	const lastUpdatedText = getCurrentDate(task.last_updated)

	return (
		<div
			className='p-6 pb-3 mb-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex-col items-center divide-y-2 divide-solid'
			{...props}
		>
			<div>
				<div className='text-xl font-medium text-gray-800'>{task.name}</div>
				<div className='w-full m-0 py-4 flex justify-between'>
					{task.users_assigned.map((user) => {
						const isSelected = user.id === task.current_assignee_id
						const clickHandle = useCallback(() => {
							onChangeAssignee(task.id, user.id)
						}, [task])

						return (
							<button
								disabled={isSelected}
								className={`items-center justify-center px-8 py-3 border border-transparent rounded-md 
								${
									isSelected
										? 'bg-red-600 cursor-default text-white font-bold'
										: 'font-medium text-black bg-white hover:bg-red-700 hover:text-white md:text-lg'
								}`}
								onClick={clickHandle}
							>
								{user.name}
							</button>
						)
					})}
				</div>
			</div>

			<div className='flex justify-between pt-2 text-gray-600 text-sm'>
				<div className=''>Última vez:</div>
				{lastUpdatedText.length !== 0 ? (
					<div className='flex'>
						<div className='font-bold text-black'>{lastUpdatedText}</div>
						&nbsp;atrás
					</div>
				) : (
					<div className='font-bold text-black'>agora</div>
				)}
			</div>
		</div>
	)
}

const getCurrentDate = (lastUpdated: Date) => {
	const actualDate = new Date()
	const lastUpdateDate = new Date(lastUpdated)
	let timeDifference = Math.abs(+actualDate - +lastUpdateDate) / MILISECONDS

	const days = Math.floor(timeDifference / SECONDS_IN.DAYS)
	timeDifference -= days * SECONDS_IN.DAYS

	const hours = Math.floor(timeDifference / SECONDS_IN.HOURS) % 24
	timeDifference -= hours * SECONDS_IN.HOURS

	const minutes = Math.floor(timeDifference / SECONDS_IN.MINUTES) % 60
	timeDifference -= minutes * SECONDS_IN.MINUTES

	return (
		`${days > 0 ? days + 'd ' : ''}` +
		`${hours > 0 ? hours + 'h ' : ''}` +
		`${minutes > 0 ? minutes + 'm' : ''}`
	)
}

const TaskCard = React.memo(TaskCardMemo)
export default TaskCard
