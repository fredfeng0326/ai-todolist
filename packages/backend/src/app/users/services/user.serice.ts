import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

type SignupData = {
  password: string;
  username: string;
};

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }
  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: Equal(id) });
    if (user) {
      return user;
    }
    throw new Error('User not found');
  }

  public async createUser (signupData: SignupData) {
    try{
      const newUser = this.usersRepository.create({
        username: signupData.username,
        password: signupData.password,
      })
      await this.usersRepository.save(newUser);
      return newUser;
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async getUsers () {
    try{
      return await this.usersRepository.find();
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async getUser (id: string) {
    try{
      const user = await this.usersRepository.findOneBy({ id: Equal(id) });
      if (user) {
        return user;
      }
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async updateUser (id: string, user: User) {
    try{
      await this.usersRepository.update(id, user);
      return await this.usersRepository.findOneBy({ id: Equal(id) });
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async deleteUser (id: string) {
    try{
      await this.usersRepository.delete(id);
      return { message: 'User deleted successfully' };
    }catch ( error ) {
      throw new Error(error);
    }
  }

  async getByUsernameAndGetPassword(username: string) {
    const user = await this.usersRepository.findOne({
      select: ['id', 'password',],
      where: { username },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
}
