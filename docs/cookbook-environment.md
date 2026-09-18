# Northstar cookbook environment

## Purpose

Northstar is the shared fictional enterprise environment for the cookbook. It gives the recipes continuity without becoming an application that the cookbook is trying to build.

Northstar is a fictional mid-sized services company using Microsoft 365, Power Platform, Azure, and increasingly Microsoft AI capabilities to build internal business solutions.

The Northstar environment is conceptual across several Microsoft platforms and administrative boundaries:

```text
Northstar
|
|-- Microsoft tenant / Microsoft Entra
|
|-- Azure subscription
|   `-- Resource group: rg-northstar
|
|-- Power Platform environment
|
|-- Microsoft 365
|   |-- Forms
|   |-- SharePoint
|   |-- OneDrive
|   `-- Teams
|
`-- Local development
    `-- microsoft-ai-cookbook repository
```

This does not mean that Microsoft 365 resources live in the Azure resource group. Azure resources can live in `rg-northstar`; Microsoft 365 resources live in the selected Microsoft tenant; Power Platform resources live in the selected Power Platform environment; and local source and documentation live in the repository.

## Northstar departments

Northstar has six departments that provide lightweight context for future recipes:

- **Human Resources (HR):** hiring, onboarding, employee benefits, payroll, and workplace processes.
- **Finance and Accounting:** budgets, financial records, cash flow, taxes, and financial reporting.
- **Marketing:** market research, brand awareness, communications, and campaigns.
- **Sales:** leads, customers, sales activity, and revenue-generating processes.
- **Operations:** day-to-day service delivery and operational business processes.
- **Information Technology (IT):** internal technology services, software, hardware, access, systems, and support.

The departments do not imply six Teams, SharePoint sites, Forms, datasets, or workflows. Recipes create only the small part of Northstar they actually need.

## Why IT comes first

The first learning arc uses a deliberately small internal IT service request. IT provides a recognizable business problem while allowing the reader to learn Microsoft Forms, Power Automate, SharePoint, OneDrive, Teams, and Adaptive Cards one capability at a time.

The proposed first Form is **Northstar IT Service Request** with only these fields:

- Employee Name
- Request Type: Hardware, Software, Access, or Other
- Description
- Urgent?

Do not add employee IDs, locations, managers, approval chains, deadlines, attachments, priority calculations, or routing rules until a later recipe genuinely needs them.

## Getting Started: Northstar foundation

Getting Started is prerequisite environment setup, not Recipe 000. It happens before Recipe 001 and should leave the reader able to answer where each part of the Northstar solution environment lives.

1. Identify the Microsoft 365 / Microsoft Entra tenant used for the cookbook. An existing development or test tenant is acceptable; do not create a separate tenant automatically. The currently authenticated tenant is `landopsdemo.onmicrosoft.com`.
2. Identify the Azure subscription that future Northstar Azure resources will use. The selected subscription is **Azure subscription 1**.
3. Select and record an Azure region. The selected region is **westus**. Service and model availability must still be checked by later recipes when they need a capability.
4. Create the empty Azure resource group `rg-northstar`. It is the normal home for future Azure resources, but it should not be populated speculatively. This has now been completed and verified.
5. Identify the Power Platform environment used for Northstar cookbook work. The existing **DecisionForge (default)** environment is being reused; do not create another environment or add Dataverse capacity.
6. Record where Microsoft 365 resources will live: in the selected tenant and its Microsoft 365 services, not in `rg-northstar`.
7. Record the local repository, `microsoft-ai-cookbook`, as the home for source code, recipe documentation, schemas, Adaptive Cards, sample files, and scripts when appropriate.
8. Review the environment inventory below and update it as recipes add shared resources.

After this sequence, the reader is ready to begin Recipe 001. Getting Started has not created the Form, SharePoint site/list, OneDrive folders, Team, flows, AI services, or other recipe resources.

## First agent-assisted exercise

Before establishing resources, give a capable coding agent [`prompts/getting-started/inspect-environment.md`](../prompts/getting-started/inspect-environment.md). The prompt asks the agent to read the repository guidance, inspect the local repository, and inspect available authenticated Microsoft and Azure tooling when possible.

The inspection is read-only. It must distinguish `VERIFIED` facts from `NEEDS HUMAN CONFIRMATION`, must not request or expose credentials, and must not create `rg-northstar` or any other resource. Use the safe capabilities actually available to the agent; a missing CLI, connector, permission, or login is a limitation to report, not a reason to guess.

Review the assessment with a human before creating the Northstar foundation. Do not recreate resources merely because a tutorial normally starts from scratch.

## Northstar environment inventory

Keep this inventory current as the environment grows. Record names and safe identifiers only; never store passwords, client secrets, access tokens, API keys, connection strings, or other credentials.

| Boundary | Northstar value |
| --- | --- |
| Microsoft tenant | `landopsdemo.onmicrosoft.com` |
| Azure subscription | **Azure subscription 1** |
| Azure region | **westus** |
| Azure resource group | `rg-northstar` |
| Power Platform environment | **DecisionForge (default)** |
| Microsoft Team | `<when created>` |
| SharePoint site | `<when created>` |
| Local repository | `microsoft-ai-cookbook` |

Tenant IDs, subscription IDs, and resource IDs may become useful later, but distinguish safe identifying metadata from credentials before recording them. Do not commit secrets to Git.

## Verified foundation

The following foundation has been hands-on established:

- The authenticated Azure context uses **Azure subscription 1**.
- The Microsoft tenant in use is `landopsdemo.onmicrosoft.com`.
- `rg-northstar` exists in **westus**.
- `rg-northstar` belongs to the selected Azure subscription and is in a **Succeeded** provisioning state.
- `rg-northstar` contains **zero Azure resources**.
- The **DecisionForge (default)** Power Platform environment is being reused.
- No additional Power Platform environment or Dataverse capacity was created.

The Microsoft Team, SharePoint site/list, OneDrive folder, Microsoft Form, Power Automate flows, and all Azure and AI services in the proposed Stage 1 design remain future resources.

## Boundaries and progressive growth

The foundation establishes boundaries; recipes add resources only when they are needed.

### Microsoft 365 and Power Platform

Early recipes progressively add the Northstar Form, Power Automate flows, SharePoint site and list, OneDrive folders and files, Microsoft Team and channels, and Adaptive Cards.

### Application integration and identity

Later recipes add Microsoft Graph access, Entra application registrations, delegated or application permissions, authentication, and authorization when those capabilities are the concept being taught.

### Azure and Microsoft AI

When a recipe needs Azure, it normally uses `rg-northstar`. The recipe adds only the required service. Microsoft Foundry resources, model deployments, Azure AI Search, tools, agents, evaluation, tracing, and observability are not part of Getting Started.

Microsoft 365 resources, Power Platform resources, Azure resources, and local artifacts remain in their respective boundaries even when they participate in one Northstar business solution.

## Shared and recipe-specific resources

A shared Northstar resource is intentionally reused by multiple recipes. Possible examples include the Northstar IT Service Request Form, Northstar SharePoint site, IT Service Requests list, Northstar Team, IT Service Requests channel, and `rg-northstar`.

A recipe-specific resource exists only to teach or support one recipe and should stay beside that recipe where practical. Do not make every resource globally shared merely because another recipe could theoretically reuse it.

## Proposed Stage 1 resource names

These names are a consistency proposal, not a request to create all resources now:

| Resource | Proposed name |
| --- | --- |
| Microsoft Form | `Northstar IT Service Request` |
| SharePoint site | `Northstar` |
| SharePoint list | `IT Service Requests` |
| OneDrive folder | `Microsoft AI Cookbook/IT Service Requests/` |
| Microsoft Team | `Northstar` |
| Teams channels | `General`; `IT Service Requests` |

Create each resource at the point in the learning sequence where it becomes useful.

## Hands-on verification

Recipe status should distinguish between documentation that is **authored** and a recipe that is **hands-on verified**. A recipe becomes hands-on verified only after a reader performs it in the real Northstar environment, observes the result, and any unclear or incorrect instructions are corrected. Generated documentation or a comparison with Microsoft documentation alone is not enough.
