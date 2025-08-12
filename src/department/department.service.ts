import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
  ) {}

  create(dto: CreateDepartmentDto) {
    const dept = this.deptRepo.create(dto);
    return this.deptRepo.save(dept);
  }

  findAll() {
    return this.deptRepo.find();
  }
}
