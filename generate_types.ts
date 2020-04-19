import * as fs from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';
import * as path from 'path';
import * as readdirp from 'readdirp';

async function generate(): Promise<void> {
  try {
    const index = [];
    const files = await readdirp.promise('./definitions');
    for (const file of files) {
      const name = file.path.replace(/.json$/, '').replace('\\', '/');
      console.log(name);
      const ts = await compileFromFile(
        `./definitions/${name}.json`,
        {
          cwd: '.',
        },
      )
      fs.mkdirSync(`./types/${path.dirname(file.path)}`, { recursive: true });
      fs.writeFileSync(`./types/${name}.d.ts`, ts);
      index.push(`export * from './${name}';`);
    }
    fs.writeFileSync('./types/index.d.ts', `${index.join('\n')}\n`);
  } catch (err) {
    console.log(err);
  }
}

generate();
