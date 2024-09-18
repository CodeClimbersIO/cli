import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { LocalAuthService } from './localAuth.service'

const LOCAL_API_KEY = 'local_api_key'

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly localAuthService: LocalAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.cookies) {
      throw new UnauthorizedException()
    }

    const apiKey = request.cookies[LOCAL_API_KEY]
    if (!apiKey) {
      throw new UnauthorizedException()
    }

    const isValid = await this.localAuthService.isValidLocalApiKey(apiKey)
    if (!isValid) {
      throw new UnauthorizedException()
    }

    return true
  }
}
