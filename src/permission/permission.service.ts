import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permRepo: Repository<Permission>,
  ) {}

  create(dto: CreatePermissionDto) {
    const perm = this.permRepo.create(dto);
    return this.permRepo.save(perm);
  }

  findAll() {
    return this.permRepo.find();
  }
}
