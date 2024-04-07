import { Module } from '@nestjs/common';
import { AppService } from '@/app.service';
import { CommandRunner } from '@/command-runner';
import { Prompt } from './prompt';
import { LlmChain } from './llm-chain';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppService, CommandRunner, Prompt, LlmChain],
})
export class AppModule {}
