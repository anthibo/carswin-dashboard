import { AuthPayload, UserType } from "@models/user"
import { apiClient } from "./apiClient"

export const loginRequest = async (email: string, password: string, type: UserType) => {
    try {
        // TODO: Remove this mock
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
        switch (type) {
            case UserType.SUPERADMIN:
                return users[0]
            case UserType.VENDOR:
                return users[1]
            default:
                return users[0]
        }
        const res = await apiClient.post<AuthPayload>('api/mock/login', { email, password })
        return res.data
    }
    catch (error) {
        console.log(error)
    }
}
