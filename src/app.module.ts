import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Department } from './entities/department.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { AccountDepartmentRole } from './entities/account-department-role.entity';
import { RolePermission } from './entities/role-permission.entity';

import { AccountModule } from './account/account.module';
import { DepartmentModule } from './department/department.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test_auth',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Account,
      Department,
      Role,
      Permission,
      AccountDepartmentRole,
      RolePermission,
    ]),
    AccountModule,
    DepartmentModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
