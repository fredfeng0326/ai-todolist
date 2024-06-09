import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { StepModule } from './steps/step.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, TaskModule, StepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
