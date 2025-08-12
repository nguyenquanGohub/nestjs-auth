import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permService: PermissionService) {}

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permService.create(dto);
  }

  @Get()
  findAll() {
    return this.permService.findAll();
  }
}
