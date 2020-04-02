import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { UserRoleType } from '../../user/user.entity';

@Injectable()
export class RolesGuard {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRoleType[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    if (request.user) {
      try {
        const user = await this.userService.findOneByEmail(request.user.email);
        return this.matchRoles(roles, user.role);
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  private matchRoles(roles: UserRoleType[], role: UserRoleType): boolean {
    return roles.includes(role);
  }
}
