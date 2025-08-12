import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { AccountDepartmentRole } from '../entities/account-department-role.entity';
import { Department } from '../entities/department.entity';
import { Role } from '../entities/role.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      AccountDepartmentRole,
      Department,
      Role,
    ]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
