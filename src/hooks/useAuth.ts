import { Pokemon } from "@models/pokemon"
import { Resource, newResource } from "@models/resource"
import useSWRAxios, { transformResponseWrapper } from "./useSWRAxios"

export function useAuth(email: string, password: string) {
   
    return {
        login: async (email, password) => {
            return {
                token: '123',
                user: {
                    name: 'John Doe',
                    email: '',
                }
            }
        },
    }
}