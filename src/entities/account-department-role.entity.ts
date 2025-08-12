// src/entities/account-department-role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Account } from './account.entity';
import { Department } from './department.entity';
import { Role } from './role.entity';

@Entity({ name: 'account_department_role' })
export class AccountDepartmentRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.accountDepartmentRoles, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Role, (role) => role.accountDepartmentRoles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  role: Role;

  @ManyToOne(() => Department, (dept) => dept.accountDepartmentRoles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  department: Department;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
