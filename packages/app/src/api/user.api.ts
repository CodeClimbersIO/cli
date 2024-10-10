import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBetterQuery } from '.'
import { userKeys } from './keys'
import {
  getCurrentUser,
  updateUserSettings,
  updateUser,
} from './repos/user.repo'
import { sqlQueryFn } from './services/query.service'

type UserWithSettings = CodeClimbers.User & CodeClimbers.UserSettings
// do not use this directly in a component
const useGetCurrentUser = () => {
  const queryFn = async () => {
    const sql = getCurrentUser()
    const records = await sqlQueryFn(sql)
    return records[0]
  }
  return useBetterQuery<UserWithSettings, Error>({
    queryKey: userKeys.user,
    queryFn,
  })
}

const useUpdateUserSettings = () => {
  const queryClient = useQueryClient()
  const queryFn = ({
    user_id,
    settings,
  }: {
    user_id: number
    settings: Partial<CodeClimbers.UserSettingsDB>
  }) => {
    const sql = updateUserSettings(user_id, settings)
    return sqlQueryFn(sql)
  }
  return useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user })
    },
  })
}

const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const queryFn = ({
    user_id,
    user,
  }: {
    user_id: number
    user: Partial<CodeClimbers.UserDB>
  }) => {
    const sql = updateUser(user_id, user)
    return sqlQueryFn(sql)
  }
  return useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user })
    },
  })
}

export { useGetCurrentUser, useUpdateUserSettings, useUpdateUser }
