import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBetterQuery } from '.'
import userRepo from '../repos/user.repo'
import { userKeys } from './keys'
import queryService from './services/query.service'

type UserWithSettings = CodeClimbers.User & CodeClimbers.UserSettings
// do not use this directly in a component
const useGetCurrentUser = () => {
  const queryFn = async () => {
    const sql = userRepo.getCurrentUser()
    const records = await queryService.sqlQueryFn(sql)
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
    return queryService.sqlQueryFn(sql)
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
    return queryService.sqlQueryFn(sql)
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
