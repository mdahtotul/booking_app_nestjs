// apps\auth\src\guards\local-auth.guard.ts

import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {}
