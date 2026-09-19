# Author the Getting Started foundation

> Reconstructed from the established cookbook design and verified implementation after the author-prompt convention was introduced. This file records the substantive authoring intent; it does not claim to reproduce the original historical wording.

## Goal

Create the Getting Started foundation for the Microsoft Enterprise AI Cookbook.

The foundation must help a reader understand the boundaries between the Microsoft tenant, Azure, Power Platform, Microsoft 365, and the local repository before any recipe begins.

Read first:

- `README.md`
- `AGENTS.md`
- `ROADMAP.md`
- `docs/cookbook-environment.md`

## Authoring requirements

Create the read-only execution prompt:

```text
prompts/getting-started/inspect-environment.md
```

That prompt must tell an agent to inspect the existing environment before provisioning. It must distinguish automatically verified facts from facts that need human confirmation.

Use these report labels:

- `VERIFIED`
- `NEEDS HUMAN CONFIRMATION`

The inspection prompt must cover, when safe authenticated tooling is available:

- the local repository root, status, relevant files, and available tooling
- the current Azure authentication and context
- available Azure subscriptions and the selected subscription
- existing relevant resource groups
- Azure region information
- safely determinable Microsoft tenant information
- available Power Platform environment information

The inspection must not change the repository or any Microsoft environment. It must not create a resource group, Microsoft 365 resource, Power Platform resource, Azure resource, or recipe resource.

The inspection must never request or expose passwords, secrets, tokens, keys, connection strings, or other credentials. It must report a missing capability or permission instead of guessing.

## Foundation decisions

After the read-only inspection, the human reviews the evidence and makes the minimum decisions needed to establish Northstar.

Use:

- Microsoft tenant: the currently authenticated tenant discovered during inspection
- Azure subscription: `Azure subscription 1`
- Azure region: `westus`
- Azure resource group: `rg-northstar`
- Power Platform environment: `DecisionForge (default)`
- Local repository: `microsoft-ai-cookbook`

Reuse the existing Power Platform environment. Do not create another environment, add Dataverse capacity, purchase licensing, or attempt to match the Power Platform region to the Azure region.

Create only the empty Azure resource group `rg-northstar` in `westus` under `Azure subscription 1`. Do not create resources inside it.

Do not create Forms, Power Automate flows, SharePoint resources, OneDrive folders, Teams, Dataverse resources, Foundry resources, model deployments, Azure AI Search, storage accounts, databases, application hosting, agents, monitoring resources, networking resources, or any other future recipe resource during Getting Started.

## Documentation requirements

Record the verified choices in `docs/cookbook-environment.md`.

The documentation must distinguish verified settings and resources from resources proposed for future recipes. Use human-readable names where they are enough. Do not store credentials, secrets, tokens, keys, or connection strings. Avoid unnecessary reader-facing IDs.

Record at least:

- the verified Microsoft tenant
- `Azure subscription 1`
- `westus`
- `rg-northstar`
- the fact that the resource group is empty and belongs to the selected subscription
- the reused `DecisionForge (default)` Power Platform environment
- the Microsoft 365 and Azure boundary
- the local repository name

## Verification requirements

After the approved provisioning step, verify that:

- `rg-northstar` exists
- it belongs to `Azure subscription 1`
- its location is `westus`
- it is in a successful provisioning state
- it contains no Azure resources
- `DecisionForge (default)` is the Power Platform environment being reused

Do not mark future Forms, SharePoint, OneDrive, Teams, Power Automate, Azure AI, or other resources as created.

## Learning boundary and stop condition

Getting Started establishes the environment boundaries. It does not implement Recipe 001.

Stop after the environment inventory records the verified foundation. Report the verified choices, any remaining human confirmation, the files changed, and the next Getting Started action without executing that next action.

The existing `prompts/getting-started/inspect-environment.md` file is the execution prompt. Keep it separate from this authoring record. Do not rename or replace it.
