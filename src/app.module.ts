import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guard/role.guard';

import { User } from './user/entities/user.entity';
import { Meditation } from './meditation/entities/meditation.entity';
import { Category } from './category/entities/category.entity';
import { Voice } from './voices/entities/voice.entity';
import { Audio } from './audio/entities/audio.entity';
import { Slogan } from './slogan/entities/slogan.entity';
import { Sound } from './sound/entities/sound.entity';

import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { UsersModule } from './user/user.module';
import { MeditationModule } from './meditation/meditation.module';
import { CategoryModule } from './category/category.module';
import { VoicesModule } from './voices/voices.module';
import { AudioModule } from './audio/audio.module';
import { SloganModule } from './slogan/slogan.module';
import { SoundModule } from './sound/sound.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Zsxdcf123',
      username: 'postgres',
      entities: [
        User,
        Meditation,
        Category,
        Audio,
        Voice,
        Slogan,
        Sound,
        Order
      ],
      database: 'dmd',
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    MeditationModule,
    CategoryModule,
    VoicesModule,
    AudioModule,
    SloganModule,
    OrdersModule,
    SoundModule,
    StatisticModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

