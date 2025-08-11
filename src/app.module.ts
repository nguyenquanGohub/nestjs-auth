import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './common/user/user.module';
import { DepartmentModule } from './common/department/department.module';
import { RolePermissionModule } from './common/role-permission/role-permission.module';

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
      synchronize: true,
    }),
    UserModule,
    DepartmentModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
