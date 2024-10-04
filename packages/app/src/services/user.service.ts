import { useBetterQuery } from '.'
import userRepo from '../repos/user.repo'
import queryApi from './query.service'
import { userKeys } from './keys'
import { useMutation } from '@tanstack/react-query'

type UserWithSettings = CodeClimbers.User & CodeClimbers.UserSettings
// do not use this directly in a component
const useGetCurrentUser = () => {
  const queryFn = () => {
    const sql = userRepo.getCurrentUser()
    return queryApi.sqlQueryFn(sql)
  }
  return useBetterQuery<UserWithSettings[], UserWithSettings, Error>({
    queryKey: userKeys.user,
    queryFn,
    select: (data) => data[0],
  })
}

const useUpdateUserSettings = (
  user_id: number,
  settings: CodeClimbers.UserSettings,
) => {
  const queryFn = () => {
    const sql = userRepo.updateUserSettings(user_id, settings)
    return queryApi.sqlQueryFn(sql)
  }
  return useMutation({
    mutationFn: queryFn,
  })
}

export default {
  useGetCurrentUser,
  useUpdateUserSettings,
}
