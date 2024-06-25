import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './type/userResponse';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  create(createUserDto: any) {
    return this.usersRepository.save(createUserDto)
  }

  findAll() {
    return this.usersRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);

    // Сохраняем обновленного пользователя
    return this.usersRepository.save(user);
  }

  async findOneById(id: string): Promise<UserResponse> {
    console.log(id)
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findUserWithPassword(nickName: string): Promise<User> {
    return await this.usersRepository.findOne({
      select: [
        'id'
      ],
      where: { nickName },
    });
  }


}
