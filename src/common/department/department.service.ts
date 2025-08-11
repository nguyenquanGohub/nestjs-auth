import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../entity/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: string) {
    return this.departmentRepo.findOne({ where: { id } });
  }

  create(data: Partial<Department>) {
    const department = this.departmentRepo.create(data);
    return this.departmentRepo.save(department);
  }

  async update(id: string, data: Partial<Department>) {
    await this.departmentRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const toDelete = await this.findOne(id);
    if (toDelete) {
      await this.departmentRepo.delete(id);
      return toDelete;
    }
    return null;
  }
}
