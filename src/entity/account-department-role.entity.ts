import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GCAccount } from './gc-account.entity';
import { Department } from './department.entity';
import { Role } from './role.entity';

@Entity({ name: 'account_department_role' })
export class AccountDepartmentRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GCAccount)
  @JoinColumn({ name: 'account_id' })
  account: GCAccount;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
