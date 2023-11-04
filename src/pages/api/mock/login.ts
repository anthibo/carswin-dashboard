import type { NextApiRequest, NextApiResponse } from 'next'
import { serializeCookie } from '@lib'
import { AuthPayload, UserType } from '@models/user'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serializeCookie('auth', { user: 'Andy' }, { path: '/' })
  
  const users: AuthPayload[] = [
    {
      token: 'token',
      user: {
        id: 1,
        email: 'admin@test.com',
        type: UserType.SUPERADMIN,
        createdAt: new Date(),
      }
    },
    {
      token: 'token',
      user: {
        id: 1,
        email: 'vendor@test.com',
        type: UserType.VENDOR,
        createdAt: new Date(),
      }
    }
  ]
  res.status(200)
    .setHeader('Set-Cookie', cookie)
    .json({ login: true })
}
