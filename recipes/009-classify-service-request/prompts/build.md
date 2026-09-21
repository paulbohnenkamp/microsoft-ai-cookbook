# Build Recipe 009 in the Northstar environment

You are helping a reader perform Recipe 009 from this directory. This is the
first runtime-AI recipe in the cookbook.

## Goal

Use one Azure-hosted `gpt-5.6-luna` deployment to classify the free-text
`Description` of existing Northstar IT service requests as exactly one of:

- `Hardware`
- `Software`
- `Access`
- `Other`

Inspect the result and compare it with the requester's existing structured
`Request Type`. The AI result is observational only. Do not update any
Northstar business record.

## Read first

Read:

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `docs/cookbook-environment.md`
- `recipes/009-classify-service-request/README.md`
- `recipes/002-normalize-request/README.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/006-service-request-tracking/README.md`
- `recipes/008-service-request-reporting/README.md`

Read the official references linked in the Recipe 009 README before relying on
remembered Azure AI names, portal paths, model availability, or API syntax.

## Safety and authentication

Do not request or handle passwords, API keys, tokens, connection strings, or
secrets. Preserve any browser session if a human must complete MFA. Do not
paste credentials into a prompt or commit local configuration.

Use the existing signed-in Azure identity with `az login` and
`DefaultAzureCredential` for inference. The TypeScript example uses the
`openai` client and `@azure/identity` token provider against the Azure OpenAI
v1 endpoint with the `https://cognitiveservices.azure.com/.default` scope. If
the account lacks the minimum permission to invoke the model, give
the smallest necessary human action and wait or stop; do not switch to an
undocumented API-key workaround.

The model receives Northstar business text. Keep the test set small and use
only existing fictional Northstar data.

## Verify before provisioning

Before creating anything, verify:

1. The current Azure subscription is `Azure subscription 1`.
2. `rg-northstar` exists in that subscription.
3. The resource group location is `westus`.
4. The resource group contents are understood before adding anything.
5. `gpt-5.6-luna` and an Azure OpenAI resource/deployment are currently
   available in `westus` for this subscription and tenant.
6. The account has the required Azure resource, deployment, and inference
   permissions, such as the current equivalent of the `Cognitive Services
   OpenAI User` role.
7. The expected pay-per-token cost for a handful of short calls is acceptable.

Do not create a second resource group. If `westus`, the model, quota,
permissions, or cost are unsuitable, stop and report the blocker. Do not move
to another region or invent a different architecture during this recipe.

## Provision the minimum Azure capability

Only after the checks pass and the provisioning step is approved:

1. Create one Azure OpenAI resource in `rg-northstar`, if one does not already
   exist and the current Microsoft experience requires it.
2. Create one standard/pay-per-token `gpt-5.6-luna` deployment, using a clear
   recipe-specific deployment name if needed.
3. Record only human-readable resource and deployment names in the README or
   completion report. Do not record keys, tokens, connection strings, or
   unnecessary identifiers.

If an appropriate existing Azure AI resource/deployment is already present,
inspect and reuse it rather than creating a duplicate. It is intended for
possible reuse by Recipes 010 and 011. Do not create provisioned capacity,
always-running hosting, Azure AI Search, a Foundry agent, or any unrelated
resource.

## Obtain the actual business input

Inspect the existing Northstar `IT Service Requests` SharePoint list using the
current verified access path. Read, but do not modify, enough records to make
more than one small classification call when practical. Prefer descriptions
representing Hardware, Software, and Access.

Record for each test:

| Field | Record |
| --- | --- |
| Service Request ID | Existing source identity, if useful for local comparison |
| Description | Actual source text |
| Requester-selected Request Type | Existing structured value |
| AI classification | Actual model output |
| Match | Whether the two observed values match |

Do not create a SharePoint record just to manufacture a test case. Do not
change Description, Request Type, Status, Priority, Assigned To, Assigned
Date, or any other field.

## Make the isolated model call

Use the recipe-owned TypeScript CLI in `src/classify.ts` with the current
`openai`, `@azure/identity`, and `zod` packages. Install dependencies from the
recipe directory and do not add a larger application framework. Keep endpoint
and deployment settings in local
environment variables such as:

- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_DEPLOYMENT`

Use `DefaultAzureCredential` and the Azure OpenAI v1 Responses API. Pass
`reasoning: { effort: "none" }` and a small `max_output_tokens` value for this
trivial classification. The deployment name passed as `model` is the actual
deployment name, not an assumed product name.

The classification instruction should remain simple:

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

Ask for a simple classification, not JSON. Inspect the actual returned text.
Use the recipe's Zod schema after the call to validate that the returned text
is exactly one allowed category. This is defensive application validation, not
Recipe 010's structured model output. Do not add structured-output request
schemas, few-shot prompting, retrieval, tools, agent logic, approval, or
evaluation frameworks.

Do not send the model output to Power Automate or SharePoint. The existing
Forms → Power Automate → SharePoint → Teams → Power BI workflow must remain
unchanged.

## Verify the boundary

After the calls:

1. Inspect each actual model output.
2. Compare it with the existing requester-selected `Request Type`.
3. Record matches and mismatches without forcing agreement.
4. Recheck that the existing SharePoint records and other Microsoft resources
   were not changed.
5. Confirm that no model output became authoritative business state.

Do not perform formal evaluation. Recipe 009 demonstrates observation and
comparison only; Recipe 019 owns evaluation and regression testing.

## Documentation and stop condition

After successful model calls and output inspection, update this README and
this build prompt with meaningful observed differences, including the actual
Azure path, resource/deployment names where reader-facing names help, model
output behavior, authentication behavior, cost/licensing prompts, and test
comparisons. Do not record secrets or unnecessary identifiers.

Mark Recipe 009 `hands-on verified` only after the calls actually succeed,
outputs are inspected, comparisons are recorded, and no authoritative data
was changed. If the calls do not succeed, leave it `authored; hands-on
verification pending` and report the blocker.

Do not modify Recipes 001–008. Do not start Recipe 010. Stop after Recipe 009.

## Completion report

Report:

- The Azure AI path and current Microsoft terminology used.
- The model and deployment selected.
- The subscription, resource group, region, and resource/deployment names.
- Authentication method and any permission action required.
- The existing Northstar records/descriptions used, without secrets.
- Actual model outputs and comparison with requester-selected `Request Type`.
- Whether any outputs differed and what that taught.
- Cost/licensing observations and intended resource reuse.
- Confirmation that no authoritative business data changed.
- Files changed.
- Confirmation that Recipe 009 is hands-on verified or remains pending.
- Confirmation that Recipe 010 was not started.
