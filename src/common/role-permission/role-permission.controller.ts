import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@Controller('roles-permissions')
export class RolePermissionController {
  constructor(private readonly rpService: RolePermissionService) {}

  // Role
  @Get('roles')
  getRoles() {
    return this.rpService.getRoles();
  }

  @Post('roles')
  createRole(@Body() body: any) {
    return this.rpService.createRole(body);
  }

  // Permission
  @Get('permissions')
  getPermissions() {
    return this.rpService.getPermissions();
  }

  @Post('permissions')
  createPermission(@Body() body: any) {
    return this.rpService.createPermission(body);
  }

  // Assign permission to role
  @Post('assign')
  assign(@Body() body: { roleId: string; permissionId: string }) {
    return this.rpService.assignPermission(body.roleId, body.permissionId);
  }
}
