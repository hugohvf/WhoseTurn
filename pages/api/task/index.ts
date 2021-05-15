// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const tasks = fs.readFileSync('./pages/api/task/tasks.json')
			res.status(200).json(tasks)
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	} else {
		console.log('another methos')
	}
}

export default handler
