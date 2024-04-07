import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class CommandRunner {
  public async run(command: string): Promise<string> {
    const { stdout, stderr } = await promisify(exec)(command);
    if (stderr) throw new Error(stderr);
    return stdout;
  }
}
