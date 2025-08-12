import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto, AssignRoleDto } from './dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Get()
  findAll(
    @Query('departmentId') departmentId?: string,
    @Query('roleId') roleId?: string,
  ) {
    return this.accountService.findAll(departmentId, roleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Post(':accountId/assign')
  assignRoleDept(
    @Param('accountId') accountId: string,
    @Body() dto: AssignRoleDto,
  ) {
    return this.accountService.assignRoleDept(accountId, dto);
  }
}
