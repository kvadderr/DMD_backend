import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Cron } from '@nestjs/schedule';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('/status')
  status(@Body() data: any) {
    if (data.Status === "CONFIRMED") {
      return this.ordersService.updateRebill(data.OrderId, data.RebillId)
    }
    console.log(data)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Cron('0 0 * * *') // Запускаем задачу каждый день
  async handleRecurrentPayments() {
    const orders = await this.ordersService.getActiveSubscriptions();
    const today = new Date();

    for (const order of orders) {
      const createdDate = new Date(order.createdAt);
      const diffInDays = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

      if (diffInDays === 7) {
        // Через неделю после первоначального платежа
        await this.ordersService.makeRecurrentPayment(order.id, order.paymentType, order.rebillId);
      } else if ((diffInDays - 7) % 30 === 0) {
        // Через месяц и неделю после предыдущего платежа
        await this.ordersService.makeRecurrentPayment(order.id, order.paymentType, order.rebillId);
      }
    }
  }
}
