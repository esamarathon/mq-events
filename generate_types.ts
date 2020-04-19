import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';

async function generate(): Promise<void> {
  try {
    const dirs = readdirSync('./definitions', { withFileTypes: true }).filter((d) => d.isDirectory());
    const index = [];
    for (const dir of dirs) {
      mkdirSync(`./types/${dir.name}`, { recursive: true });
      const subIndex = [];
      const files = readdirSync(`./definitions/${dir.name}`);
      for (const file of files) {
        const name = file.replace(/.json$/, '');
        console.log(`${dir.name}/${name}`);
        const ts = await compileFromFile(
          `./definitions/${dir.name}/${name}.json`,
          {
            cwd: '.',
          },
        )
        writeFileSync(`./types/${dir.name}/${name}.d.ts`, ts);
        subIndex.push(`export * from './${name}';`);
      }
      writeFileSync(`./types/${dir.name}/index.d.ts`, `${subIndex.join('\n')}\n`);
      index.push(`export * as ${dir.name} from './${dir.name}';`);
    }
    writeFileSync(`./types/index.d.ts`, `${index.join('\n')}\n`);
  } catch (err) {
    console.log(err);
  }
}

generate();
