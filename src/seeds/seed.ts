import { DataSource } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Department } from '../entities/department.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { AccountDepartmentRole } from '../entities/account-department-role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'test_auth',
  entities: [
    Account,
    Department,
    Role,
    Permission,
    AccountDepartmentRole,
    RolePermission,
  ],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  // 1. Tạo departments
  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales'].map(
    (name) => AppDataSource.getRepository(Department).create({ name }),
  );
  await AppDataSource.getRepository(Department).save(departments);

  // 2. Tạo roles
  const roles = ['Admin', 'Manager', 'Staff'].map((name) =>
    AppDataSource.getRepository(Role).create({ name }),
  );
  await AppDataSource.getRepository(Role).save(roles);

  // 3. Tạo accounts
  const accounts: Account[] = [];
  for (let i = 1; i <= 20; i++) {
    const account = new Account();
    account.name = `user${i}`;
    account.email = `user${i}@example.com`;
    account.password = await bcrypt.hash('123456', 10);
    accounts.push(account);
  }
  await AppDataSource.getRepository(Account).save(accounts);

  // 4. Gán ngẫu nhiên account - department - role
  const links: AccountDepartmentRole[] = [];
  for (const account of accounts) {
    const randomDept =
      departments[Math.floor(Math.random() * departments.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const link = new AccountDepartmentRole();
    link.account = account;
    link.department = randomDept;
    link.role = randomRole;
    links.push(link);
  }
  await AppDataSource.getRepository(AccountDepartmentRole).save(links);

  console.log('✅ Seed dữ liệu thành công!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
