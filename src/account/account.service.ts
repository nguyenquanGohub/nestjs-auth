import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { AccountDepartmentRole } from '../entities/account-department-role.entity';
import { Department } from '../entities/department.entity';
import { Role } from '../entities/role.entity';
import { CreateAccountDto, UpdateAccountDto, AssignRoleDto } from './dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(AccountDepartmentRole)
    private adrRepo: Repository<AccountDepartmentRole>,
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateAccountDto) {
    const account = this.accountRepo.create(dto);
    return this.accountRepo.save(account);
  }

  async findAll(departmentId?: string, roleId?: string) {
    const query = this.accountRepo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.accountDepartmentRoles', 'adr')
      .leftJoinAndSelect('adr.department', 'department')
      .leftJoinAndSelect('adr.role', 'role');

    if (departmentId)
      query.andWhere('department.id = :departmentId', { departmentId });
    if (roleId) query.andWhere('role.id = :roleId', { roleId });

    return query.getMany();
  }

  async findOne(id: string) {
    return this.accountRepo.findOne({
      where: { id },
      relations: [
        'accountDepartmentRoles',
        'accountDepartmentRoles.role',
        'accountDepartmentRoles.department',
      ],
    });
  }

  async update(id: string, dto: UpdateAccountDto) {
    await this.accountRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.accountRepo.delete(id);
  }

  async assignRoleDept(accountId: string, dto: AssignRoleDto) {
    const account = await this.accountRepo.findOne({
      where: { id: accountId },
    });
    const department = await this.deptRepo.findOne({
      where: { id: dto.departmentId },
    });
    const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });

    if (!account || !department || !role)
      throw new Error('Invalid account, department, or role');

    const adr = this.adrRepo.create({ account, department, role });
    return this.adrRepo.save(adr);
  }
}
