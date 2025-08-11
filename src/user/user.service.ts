import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GCAccount } from '../entity/gc-account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(GCAccount)
    private readonly userRepo: Repository<GCAccount>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  create(data: Partial<GCAccount>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(id: string, data: Partial<GCAccount>) {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const toDelete = await this.findOne(id);
    if (toDelete) {
      await this.userRepo.delete(id);
      return toDelete;
    }
    return null;
  }
}
