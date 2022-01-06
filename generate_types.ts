import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';

async function generate(): Promise<void> {
  try {
    const dirs = readdirSync('./definitions', { withFileTypes: true }).filter((d) => d.isDirectory());
    const index = [];
    for (const dir of dirs) {
      mkdirSync(`./types/${dir.name}`, { recursive: true });
      const dirTypes = [];
      const files = readdirSync(`./definitions/${dir.name}`);
      for (const file of files) {
        const name = file.replace(/.json$/, '');
        console.log(`${dir.name}/${name}`);
        const ts = await compileFromFile(
          `./definitions/${dir.name}/${name}.json`,
          {
            cwd: `./definitions/${dir.name}`,
          },
        )
        writeFileSync(`./types/${dir.name}/${name}.d.ts`, ts);
        dirTypes.push(name);
      }

      // Creating the index.d.ts file for each group.
      const subIndex = [];
      subIndex.push(...dirTypes.map((t) => `import { ${t} as ${t}_ } from './${t}'\n`));
      subIndex.push(`\nexport namespace ${dir.name} {\n`);
      subIndex.push(...dirTypes.map((t) => `  interface ${t} extends ${t}_ {}\n`));
      subIndex.push(`}\n`)
      writeFileSync(`./types/${dir.name}/index.d.ts`, `${subIndex.join('')}`);

      index.push(`export * from './${dir.name}';`);
    }
    writeFileSync(`./types/index.d.ts`, `${index.join('\n')}\n`);
  } catch (err) {
    console.log(err);
  }
}

generate();
