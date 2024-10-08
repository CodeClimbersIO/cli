import { useBetterQuery } from '.'
import userRepo from '../repos/user.repo'
import queryApi from './query.service'
import { userKeys } from './keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UserWithSettings = CodeClimbers.User & CodeClimbers.UserSettings
// do not use this directly in a component
const useGetCurrentUser = () => {
  const queryFn = async () => {
    const sql = userRepo.getCurrentUser()
    const records = await queryApi.sqlQueryFn(sql)
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
    const sql = userRepo.updateUserSettings(user_id, settings)
    return queryApi.sqlQueryFn(sql)
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
    const sql = userRepo.updateUser(user_id, user)
    return queryApi.sqlQueryFn(sql)
  }
  return useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.user })
    },
  })
}

export default {
  useGetCurrentUser,
  useUpdateUserSettings,
  useUpdateUser,
}
