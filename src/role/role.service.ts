import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(RolePermission)
    private rpRepo: Repository<RolePermission>,
    @InjectRepository(Permission)
    private permRepo: Repository<Permission>,
  ) {}

  create(dto: CreateRoleDto) {
    const role = this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }

  async assignPermission(roleId: string, permissionId: string) {
    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    const permission = await this.permRepo.findOne({
      where: { id: permissionId },
    });
    if (!role || !permission) throw new Error('Invalid role or permission');

    const rp = this.rpRepo.create({ role, permission });
    return this.rpRepo.save(rp);
  }
}
