import { writeFileSync } from "fs"
import { getModelFromSource } from "@publicodes/tools/compilation"
import Engine from "publicodes"

// Could be any glob pattern to match your rule files
const srcFiles = "rules/"

// The path where the model will be generated (should match <your-package-name>.model.json)
const destPath = "model-template.model.json"

// Resolves all rules and their dependencies into a single JSON object
const model = getModelFromSource(srcFiles, { verbose: true })
let engine

// Try to create a new engine with the model to check for parsing errors
try {
  engine = new Engine(model)
} catch (e) {
  console.error(`❌ There is an error in the model:`)
  console.error(e)
  process.exit(1)
}

// Write the model to the destination path
writeFileSync(destPath, JSON.stringify(model))
console.log(`✅ ${destPath} generated`)

// Generate an index.js file to export the model
writeFileSync(
  "index.js",
  `import rules from "./${destPath}" assert { type: "json" };

export default rules;
`,
)
console.log(`✅ index.js generated`)

// Generate an index.d.ts file to export the model types
// where each rule name is a case in the DottedName type
let indexDTypes = Object.keys(engine.getParsedRules()).reduce(
  (acc, dottedName) => acc + `| "${dottedName}"\n`,
  `import { Rule } from "publicodes";

export type DottedName = 
`,
)

indexDTypes += `
declare let rules: Record<DottedName, Rule>

export default rules;
`

writeFileSync("index.d.ts", indexDTypes)
console.log(`✅ index.d.ts generated`)
