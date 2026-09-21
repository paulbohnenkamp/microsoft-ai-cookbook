# Recipe 009: Classify a service request with Azure AI

**Status:** authored; hands-on verification pending

## Business problem

Northstar already stores an employee-selected `Request Type`. The request's
free-text `Description` may contain additional meaning that a deterministic
workflow cannot reliably interpret.

This recipe asks a small question:

> Given the description of an existing Northstar IT service request, what kind
> of request does the text describe?

The model classifies the description as exactly one of `Hardware`, `Software`,
`Access`, or `Other`. The result is observed and compared with the employee's
selected `Request Type`; it is not written back to the business record.

## What you'll learn

You will make the cookbook's first real runtime-AI model call. You will send
existing business text to an Azure-hosted model, inspect the returned
classification, and compare it with known structured data.

Recipe 008 answered structured questions such as “How many Hardware requests
exist?” with deterministic reporting. Recipe 009 answers “What kind of
problem is described by this text?” where interpretation adds value.

This recipe intentionally does not teach structured output, retrieval, tool
calling, agents, approvals, or formal evaluation. Those are later concepts.

## Microsoft technologies used

- Microsoft Azure
- Azure OpenAI in Microsoft Foundry Models
- Azure OpenAI v1 Responses API
- TypeScript OpenAI client with `DefaultAzureCredential`
- Zod for application-side validation
- Azure CLI for local sign-in and subscription context

Microsoft provides other models, APIs, SDKs, and Foundry capabilities. This
recipe chooses one small supported path so the reader can understand a first
model call without turning the exercise into a product comparison.

## Prerequisites

- Recipes 001–008 are hands-on verified.
- The Northstar `IT Service Requests` SharePoint list exists and contains
  existing descriptions and requester-selected request types.
- Azure subscription `Azure subscription 1` is available to the signed-in
  account.
- Resource group `rg-northstar` exists in `westus`.
- The account can inspect Azure availability and, if approved during the build,
  create the minimum Azure AI resource and model deployment.
- Azure CLI, Node.js, and a TypeScript-capable runtime are available locally.

The resource group is empty until this recipe or a later recipe explicitly
provisions something. This README does not claim that an Azure AI resource or
deployment already exists.

## Selected Azure AI path

For this recipe, use one Azure OpenAI resource in `rg-northstar` with one
`gpt-5.6-luna` deployment and the Azure OpenAI v1 Responses API. The intended
regional deployment is `westus`, subject to a live availability and quota
check during execution. The deployment uses pay-per-token standard capacity
for a handful of small test calls; it must not use provisioned capacity.

Microsoft's current Foundry model guidance lists `gpt-5.6-luna` as supporting
the Responses API. Current regional availability, quota, access, and pricing
are account- and time-dependent. The build prompt must verify them immediately before creating
anything. If the model or resource cannot be used in the established region
and subscription, stop and report the blocker rather than moving the exercise
to another resource group or silently changing the architecture.

The exact deployment name is chosen during provisioning. The TypeScript code
uses an environment variable so the deployment name is never assumed to equal
the model name.

## How it works

```text
existing Northstar service request
    -> Description
    -> Azure-hosted gpt-5.6-luna deployment
    -> simple classification instruction
    -> Hardware | Software | Access | Other
    -> inspect result
    -> compare with requester-selected Request Type
```

The first call is isolated from the existing Forms, Power Automate,
SharePoint, Teams, and Power BI workflow. It does not add an AI action to the
production-like flow and does not change the SharePoint record.

The call uses Microsoft Entra ID through the existing Azure CLI sign-in. The
TypeScript client obtains a token with `DefaultAzureCredential`; no API key is
stored in the repository or pasted into a prompt. The signed-in identity must
have the minimum inference permission required by the selected Azure resource.

## Build steps

Follow [`prompts/build.md`](prompts/build.md). The small executable example is
in [`src/classify.ts`](src/classify.ts), with its package and TypeScript
configuration beside it. In summary:

1. Inspect the live Azure subscription, `rg-northstar`, region, model
   availability, quota, permissions, and expected cost.
2. Create only the Azure OpenAI resource and one `gpt-5.6-luna` deployment if
   the checks pass and the provisioning step is approved.
3. Inspect the existing SharePoint service-request records without editing
   them. Select a small set of existing descriptions representing different
   request types where practical.
4. Install the recipe-local TypeScript dependencies and run the CLI once per
   selected existing record, using environment variables for the endpoint,
   deployment, description, and requester-selected type.
5. Let Zod validate that the returned text is one allowed category. Record the
   raw result, validated result, requester-selected `Request Type`, and whether
   they match.
6. Verify that no Forms response, flow, SharePoint field, Teams card, or Power
   BI artifact changed.

Do not create a web application, agent, retrieval index, Graph application,
Entra application registration, Power Automate AI integration, or structured
JSON contract.

## Security considerations

- Treat the service-request description as business data sent to an Azure AI
  service.
- Use only the fictional Northstar data already present in the cookbook.
- Use the supported keyless Azure identity path for the exercise.
- Do not request, paste, print, commit, or document passwords, API keys,
  tokens, connection strings, or other secrets.
- Keep endpoint and deployment settings in local environment variables or
  another ignored local configuration mechanism.
- Do not grant broad permissions or create an Entra application merely for
  this first model call.
- The model output is not authoritative business data and must not overwrite
  `Request Type`, `Status`, `Priority`, `Assigned To`, `Assigned Date`, or any
  other field.

## Test it

Use existing records rather than creating reporting-only or AI-only records.
The live data should be inspected at execution time. Useful existing examples
may include a replacement keyboard, VPN client installation, an external
monitor problem, or access to the Finance project SharePoint site.

For each selected record, record:

| Observation | Value |
| --- | --- |
| Description | Actual source text, kept to the minimum needed for the report |
| Requester-selected Request Type | Existing structured value |
| AI classification | Actual model output |
| Match | Yes or No, based on the two observed values |

The instruction must ask for exactly one category:

```text
You classify Northstar IT service requests.

Classify the following request as exactly one of:
Hardware
Software
Access
Other

Request:
<description>
```

The model should return a simple classification such as `Access`, not JSON.
Zod validates the returned text after the model call; this is application-side
validation, not the structured model-output contract taught in Recipe 010. Do
not repeatedly change the prompt to force every result to match the requester's
answer. A mismatch is an observed result to discuss, not a reason to overwrite
business data.

## Cost and reuse

Model calls and Azure resources may incur charges. GPT-5.6 uses separate
short-context and long-context pricing categories, so keep the exercise to a
handful of short descriptions and use the smallest practical standard
pay-per-token deployment. Use `reasoning.effort: "none"` for this trivial
classification to avoid unnecessary reasoning work. Do not create provisioned
throughput, reserved capacity, or always-running application infrastructure.

The Azure AI resource and model deployment are intended to be inspected for
reuse by Recipes 010 and 011, subject to their own current availability,
security, and cost checks. Do not delete them immediately after this recipe if
the later recipes can reuse them; document their names and cleanup guidance
without recording secrets. If the exercise cannot be completed or the later
roadmap changes, remove recipe-specific resources deliberately and verify the
resource group afterward.

## Common failure cases

- **The model is unavailable in `westus`.** Stop and report availability or
  quota; do not silently choose another region or resource group.
- **The account cannot create or invoke the resource.** Stop and name the
  smallest required human action, such as approved role assignment or portal
  consent. Do not use an API key as an undocumented workaround.
- **The model returns prose, multiple categories, or an unexpected value.**
  Record the actual output and stop at the observation boundary. Do not add
  structured-output machinery; Recipe 010 owns that lesson.
- **A model call would modify business data.** Stop. Recipe 009 is read-only
  with respect to the existing service-request system.
- **The source records differ from remembered examples.** Use the live records,
  record the difference, and do not create replacements merely to match this
  README.

## Why AI is appropriate

The employee-selected `Request Type` is already structured and remains the
business field of record. Counting or filtering it is deterministic and does
not need AI.

The `Description` is free text. Interpreting whether a sentence describes a
hardware, software, access, or other problem is a reasonable small model task.
The model adds interpretation, not authority. Its result must remain visible
for inspection and comparison rather than becoming an automatic business
decision.

## Next steps / related recipes

Recipe 010 will introduce predictable structured model output and validation.
Recipe 009 does not begin Recipe 010, retrieval, tool calling, agent behavior,
approval, or formal evaluation.

## Official references

- [Azure OpenAI Responses API quickstart](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart)
- [Azure OpenAI v1 API and Microsoft Entra ID authentication](https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle)
- [Region availability for Foundry Models sold by Azure](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability)
- [Azure OpenAI models and GPT-5.6 capabilities](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)
- [Azure OpenAI reasoning models](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/reasoning)
- [Microsoft Foundry pricing](https://azure.microsoft.com/pricing/details/ai-foundry/)

## Documentation status

Recipe 009 is authored from the current narrow Azure AI path described above.
Its Azure model availability, permissions, deployment, and model behavior are
not yet hands-on verified.
