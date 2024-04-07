import { Injectable } from '@nestjs/common';
import { CommandRunner } from '@/command-runner';
import { Prompt } from '@/prompt';
import { LlmChain } from '@/llm-chain';

@Injectable()
export class AppService {
  constructor(
    private readonly prompt: Prompt,
    private readonly commandRunner: CommandRunner,
    private readonly llmChain: LlmChain,
  ) {}

  public async run() {
    const humanMessage = await this.prompt.askUser('✨ What would you like to do?\n🗣  ');
    const aiMessage = await this.llmChain.do({ task: humanMessage });
    const approved =
      (await this.prompt.askUser(`\n${aiMessage.command}\n✨ Does this look good? (y/N) > `)) === 'y';
    if (!approved) return '';
    return await this.commandRunner.run(aiMessage.command);
  }
}
