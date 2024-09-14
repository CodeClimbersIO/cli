import { Controller, Get } from '@nestjs/common'
import { getPackageJsonVersion } from '../../../../../utils/packageJson.util'

@Controller('/health')
export class HealthController {
  private readonly version: string

  constructor() {
    this.version = getPackageJsonVersion()
  }

  @Get()
  health(): {
    OK: boolean
    message: string
    data: CodeClimbers.Health
  } {
    return {
      OK: true,
      message: 'Health check successful',
      data: { OK: false, app: 'codeclimbers', version: this.version },
    }
  }
}
