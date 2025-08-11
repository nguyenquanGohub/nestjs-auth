import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entity/role.entity';
import { Permission } from '../../entity/permission.entity';
import { RolePermission } from '../../entity/role-permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  // CRUD Role
  getRoles() {
    return this.roleRepo.find();
  }

  createRole(data: Partial<Role>) {
    const role = this.roleRepo.create(data);
    return this.roleRepo.save(role);
  }

  // CRUD Permission
  getPermissions() {
    return this.permissionRepo.find();
  }

  createPermission(data: Partial<Permission>) {
    const permission = this.permissionRepo.create(data);
    return this.permissionRepo.save(permission);
  }

  // Gán permission cho role
  async assignPermission(roleId: string, permissionId: string) {
    const rp = this.rolePermissionRepo.create({
      role: { id: roleId } as Role,
      permission: { id: permissionId } as Permission,
    });
    return this.rolePermissionRepo.save(rp);
  }
}
