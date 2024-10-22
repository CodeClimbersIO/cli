import { Injectable } from '@nestjs/common'
import { UserRepo } from '../database/user.repo'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {
    this.userRepo = userRepo
  }

  getCurrentUser = () => {
    return this.userRepo.getCurrentUser()
  }
}
