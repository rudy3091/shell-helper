import { Injectable } from '@nestjs/common';
import * as readline from 'readline';

@Injectable()
export class Prompt {
  public async askUser(question: string) {
    return new Promise<string>(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(question, answer => {
        rl.close();
        resolve(answer);
      });
    });
  }
}
