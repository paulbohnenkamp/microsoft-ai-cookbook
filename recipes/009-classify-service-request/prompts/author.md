# Author Recipe 009: Classify a service request with Azure AI

This prompt defines the authoring scope for the cookbook's first runtime-AI
recipe. It must be used to create the recipe documentation and execution
prompt only. It must not execute Azure or Microsoft work.

## Required reading

Read `AGENTS.md`, `README.md`, `ROADMAP.md`,
`docs/cookbook-environment.md`, and the verified recipe documentation for
Recipes 002, 003, 006, and 008. Review their build prompts only as needed to
preserve actual Northstar conventions and boundaries.

Recipes 001–008 are hands-on verified. Preserve them, do not modify their
directories, and do not insert AI into their existing workflow.

## Learning objective

Author one small recipe that answers:

> Given the free-text Description of an existing Northstar IT service request,
> can an Azure-hosted model classify what kind of request the employee is
> describing?

The categories are exactly:

- Hardware
- Software
- Access
- Other

The recipe must compare the AI classification with the existing requester-
selected `Request Type`. The AI result is observable only. It must not replace
or update the authoritative business field.

## Narrow technology research

Use current official Microsoft documentation to select one supported,
low-cost, Azure-hosted model-call path. Research only what is necessary to
choose:

1. one Azure AI path;
2. one suitable currently supported model;
3. one simple supported call method;
4. the minimum Azure resource and deployment;
5. the minimum authentication/configuration; and
6. cost considerations for a handful of small calls.

The authored path is Azure OpenAI in Microsoft Foundry Models, one
`gpt-5.6-luna` deployment in `westus` when live availability and quota permit,
and the Azure OpenAI v1 Responses API through the TypeScript OpenAI client with
`DefaultAzureCredential`. Current official model guidance lists
`gpt-5.6-luna` as supporting the Responses API, but the build prompt must
recheck actual account availability, quota, permissions, and cost before
provisioning.

Briefly acknowledge that other models, APIs, SDKs, and Microsoft Foundry
capabilities exist. Do not create a comparison, survey, decision matrix, or
model-selection tutorial.

## Existing environment

The build must use the existing:

- Azure subscription: `Azure subscription 1`
- Azure resource group: `rg-northstar`
- Azure region: `westus`

Do not create resources during authoring. The future hands-on build may create
only the minimum Azure OpenAI resource and one model deployment after its
checks pass. It must stop instead of silently moving to another resource group
or region if the authored path is unavailable.

## Implementation boundaries

Keep the exercise isolated from the existing Forms → Power Automate →
SharePoint → Teams → Power BI workflow. Obtain existing service-request
descriptions and make the model call in a small local exercise. Do not build a
web application or agent.

Use the minimum TypeScript dependencies: `openai`, `@azure/identity`, `zod`,
and the small TypeScript runner/compiler needed for local execution. Use Zod
only to validate that returned text is one of the four allowed categories; do
not use model structured-output features or create a Recipe 010 response
contract.

Do not introduce Microsoft Graph, an Entra application registration, Azure AI
Search, Power Automate AI integration, MCP, tool calling, RAG, approvals, or
formal evaluation. Do not ask for JSON or structured model output; Recipe 010
owns structured output and validation.

Use a simple instruction that makes the input, allowed categories, and output
visible. Do not add elaborate prompting or few-shot examples unless the
selected current implementation proves one necessary.

## Data and verification

Prefer actual existing Northstar descriptions. Test more than one description
when practical, covering different request types without creating or editing
SharePoint records. Record the actual description, requester-selected
`Request Type`, AI classification, and match/mismatch result.

Do not force mismatches into matches. Do not allow the model to update
`Request Type`, `Status`, `Priority`, `Assigned To`, `Assigned Date`, or any
other business field.

## Documentation requirements

Create:

- `recipes/009-classify-service-request/README.md`
- `recipes/009-classify-service-request/prompts/author.md`
- `recipes/009-classify-service-request/prompts/build.md`

The README must follow the cookbook recipe structure and cover the business
problem, learning goal, selected technology, prerequisites, flow, build steps,
security, testing, failure cases, why AI is appropriate, cost, reuse, and next
steps.

The build prompt must be the authoritative hands-on execution prompt. It must
inspect the current environment, verify subscription/resource group/region,
check live model availability and cost, provision only the minimum approved
resource/deployment, make read-only classification calls over existing data,
record actual outputs, and stop after Recipe 009.

Update `ROADMAP.md` only to mark Recipe 009 `authored; hands-on verification
pending`. Do not update the status to verified. Update `README.md` or
`AGENTS.md` only if a genuinely necessary high-level correction is exposed.

## Stop condition

Keep Recipe 009-specific executable artifacts inside the recipe directory. The
minimum conventional structure is `package.json`, `tsconfig.json`, and
`src/classify.ts`. The program must make a simple Responses API call with
`gpt-5.6-luna`, validate the plain returned text with Zod, and compare it with
the requester-selected type. It must not ask for JSON, confidence, reasons, or
multiple classifications.

After the recipe files and roadmap status are authored, stop. Do not execute
the recipe, create Azure resources, deploy a model, make model calls, modify
Microsoft resources, author Recipe 010, or create any future recipe
directories.
