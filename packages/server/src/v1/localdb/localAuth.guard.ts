import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { LocalAuthService } from './localAuth.service'

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly localAuthService: LocalAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.headers['x-api-key']
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
