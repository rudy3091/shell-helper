import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser, StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmChain {
  constructor(private readonly config: ConfigService) {}

  public prompt() {
    const prompt = ChatPromptTemplate.fromTemplate(`Write me a shell script to execute job described in TASK:.
You MUST answer only a valid shell script without any commentary or explanation, also without codeblock markdown syntax(\`\`\`).
Answer must be ready to be executed right in the shell.

{formatInstruction}
TASK: {task}`);
    return prompt;
  }

  public model() {
    return new ChatOpenAI({
      openAIApiKey: this.config.get('OPENAI_API_KEY'),
      modelName: 'gpt-3.5-turbo-1106',
      temperature: 0,
    });
  }

  public outputParser() {
    return StructuredOutputParser.fromZodSchema(
      z.object({
        command: z.string().describe('The shell script to run'),
      }),
    );
  }

  public stringParser() {
    return new StringOutputParser();
  }

  public chain() {
    return RunnableSequence.from([this.prompt(), this.model(), this.outputParser()]);
  }

  public do(param: { task: string }) {
    return this.chain().invoke({
      ...param,
      formatInstruction: this.outputParser().getFormatInstructions(),
    });
  }
}
