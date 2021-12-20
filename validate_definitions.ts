import Ajv from 'ajv';
import { readdirSync, readJsonSync } from 'fs-extra';
import { Schema } from 'jsonschema';
import { join } from 'path';

/**
 * This script both validates the files are valid JSON (in which case they will not be parsed successfully)
 * and also that the definitions comply with the base $schema they reference and also that ajv can compile them.
 */

const errors = [];
const dirs = readdirSync('./definitions', { withFileTypes: true }).filter((d) => d.isDirectory());
for (const dir of dirs) {
  const files = readdirSync(`./definitions/${dir.name}`);
  for (const file of files) {
    try {
      // Load the referenced $schema and validate the definition against it.
      // Not sure if properly needed? Probably needed to verify $meta.
      const def: Schema = readJsonSync(`./definitions/${dir.name}/${file}`);
      const schemaLoc = def.$schema;
      if (!schemaLoc) throw new Error('no $schema property');
      const schema: Schema = readJsonSync(join(`./definitions/${dir.name}`, schemaLoc));
      const ajv = new Ajv();
      const validateS = ajv.compile(schema); // Load in base schema to validate definition.
      const valid = validateS(def); // Validate definition against base schema.
      if (!valid && Array.isArray(validateS.errors)) {
        errors.push(...validateS.errors)
      }

      // Just compile the definition and see what error(s) we get.
      ajv.compile(def); // Validate definition is also a valid JSON schema.
    } catch (err) {
      errors.push(err);
    }
  }
}
if (errors.length) {
  console.log(errors);
  process.exit(1);
}
