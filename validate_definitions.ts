import Ajv from 'ajv';
import { readdirSync, readJsonSync } from 'fs-extra';
import { Schema } from 'jsonschema';

/**
 * This script both validates the files can be parsed as valid JSON,
 * that the schemas in the "schemas" folder are valid,
 * and also that the definitions comply with the "event-schema" base.
 */

const errors: { file: string, err: any }[] = [];
const ajv = new Ajv({ strict: true, allErrors: true }); // TODO: check opts
let eventSchemaId = '';

// Validate all schemas in the "schemas" directory.
const schemaFiles = readdirSync('./schemas');
for (const file of schemaFiles) {
  const fileName = `./schemas/${file}`;
  try {
    const schema: Schema = readJsonSync(fileName);

    // For some reason I can only get strict errors to be thrown if using "compile".
    // The drawback: you will only get 1 error before it stops, so there may be more.
    try { ajv.compile(schema); } catch (err) { errors.push({ file: fileName, err }); }
    ajv.removeSchema(schema.$id); // Remove the schema to we can re-add it in the next step.

    // Add schema without compiling. Not sure how much of a difference this makes though.
    // ajv.addSchema(schema);
    ajv.addMetaSchema(schema);

    // Store the "event-schema" ID for use/replacement later.
    if (file.startsWith('event-schema') && schema.$id) eventSchemaId = schema.$id;

    // If the ajv object has any errors, push them to the log.
    if (Array.isArray(ajv.errors)) {
      errors.push(...ajv.errors.map((err) => ({ file: fileName, err })));
    }
  } catch (err) {
    errors.push({ file: fileName, err });
  }
}

// Validate all definitions in the "definitions" directory, using the "event-schema" base.
const dirs = readdirSync('./definitions', { withFileTypes: true }).filter((d) => d.isDirectory());
for (const dir of dirs) {
  const files = readdirSync(`./definitions/${dir.name}`);
  for (const file of files) {
    const fileName = `./definitions/${dir.name}/${file}`;
    try {
      const schema: Schema = readJsonSync(fileName);

      // Error for missing $schema.
      if (!schema.$schema) {
        errors.push({ file: fileName, err: new Error('no $schema property') });
      }
      schema.$schema = eventSchemaId; // Replace (presumed) local file location with ID.

      // Validate, unfortunately I don't think it captures all strict errors?
      // We could also "compile" this but it seems to not compare it to the base schema correctly.
      ajv.validateSchema(schema);

      // If the ajv object has any errors, push them to the log.
      if (Array.isArray(ajv.errors)) {
        errors.push(...ajv.errors.map((err) => ({ file: fileName, err })));
      }
    } catch (err) {
      errors.push({ file: fileName, err });
    }
  }
}

// If there's any errors, log them and exit with an error code.
if (errors.length) {
  console.log(errors.map((({ file, err }) => `${file}: ${err.message || err}`)));
  process.exit(1);
}
