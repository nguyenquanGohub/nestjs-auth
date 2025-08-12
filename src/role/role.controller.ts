import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, AssignPermissionDto } from './dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post(':roleId/permissions')
  assignPermission(
    @Param('roleId') roleId: string,
    @Body() dto: AssignPermissionDto,
  ) {
    return this.roleService.assignPermission(roleId, dto.permissionId);
  }
}
