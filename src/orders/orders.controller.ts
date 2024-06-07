import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('/all')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/checkLogin')
  async checkLogin(@Query('login') login: string) {
    return await this.ordersService.checkLogin(login);
  }


  @Post('/hash')
  async createHash(@Body() data) {
    return this.ordersService.createHash(data)
  }

  @Get('last')
  findLastOrder() {
    return this.ordersService.findEleven();
  }

  @Get('/count')
  getCount() {
    return this.ordersService.findAllCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('/data/:id')
  findDataOne(@Param('id') id: string) {
    return this.ordersService.findDataOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
