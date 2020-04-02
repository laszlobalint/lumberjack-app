import { SetMetadata } from '@nestjs/common';
import { UserRoleType } from '../../user/user.entity';

export const Roles = (...roles: UserRoleType[]) => SetMetadata('roles', roles);
