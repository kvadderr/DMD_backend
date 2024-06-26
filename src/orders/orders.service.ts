import { Injectable } from '@nestjs/common';
import { CreateOrderDto, PaymentData } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

import axios from 'axios';
import { OrderStatus } from 'src/constants';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.save(createOrderDto)
    const paymentData: PaymentData = {
      TerminalKey: process.env.TINKOFF_KEY,
      Amount: order.amount,
      OrderId: order.id,
      Description: "Активация подписки DMD",
      DATA: {
        YandexPayWeb: true
      },
      Recurrent: 'Y'
    }
    const token = await this.createHash(paymentData);
    paymentData.Token = token;
    const response = await axios.post(process.env.INIT_PAYMENT, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  }

  async makeRecurrentPayment(orderId: number, amount: number, rebillId: number) {
    const paymentData = {
      TerminalKey: process.env.TINKOFF_KEY,
      Amount: amount,
      OrderId: orderId,
      RebillId: rebillId,
      Token: null
    };
    const token = await this.createHash(paymentData);
    paymentData.Token = token;
    const response = await axios.post(process.env.INIT_PAYMENT, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

   // Метод для получения всех активных подписок
   async getActiveSubscriptions() {
    return this.orderRepository.find({ where: { status: OrderStatus.SUCCESS } });
  }

  async createHash(data: any) {
    delete data.DATA;
    const dataWithPassword = {
      ...data,
      Password: process.env.TINKOFF_PASSWORD,
    };
    const keyValuePairs = Object.keys(dataWithPassword).map(key => ({
      key,
      value: dataWithPassword[key],
    }));
    const sortedKeyValuePairs = keyValuePairs.sort((a, b) => a.key.localeCompare(b.key));
    const concatenatedValues = sortedKeyValuePairs.map(pair => pair.value).join('');
    const hash = crypto.createHash('sha256').update(concatenatedValues, 'utf8').digest('hex');
    return hash;
  }

  findAll() {
    return this.orderRepository.find({ relations: ['user'] })
  }

  findEleven() {
    return this.orderRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC' // or 'id' if sorting by the primary key
      },
      take: 11
    });
  }


  findAllCount() {
    return this.orderRepository.count({ where: { status: OrderStatus.SUCCESS } });
  }

  async updateRebill(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({where: {id}})
    order.rebillId = updateOrderDto.rebillId;
    return await this.orderRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return ""
  }

}
