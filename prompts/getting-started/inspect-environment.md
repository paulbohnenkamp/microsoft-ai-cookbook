# Inspect the Northstar development environment

You are performing the first agent-assisted exercise for the Microsoft Enterprise AI Cookbook.

## Goal

Assess what is already configured for the Northstar cookbook environment before anyone creates resources. Do not provision or modify anything.

## Read first

Read:

- `AGENTS.md`
- `README.md`
- `docs/cookbook-environment.md`
- `ROADMAP.md`

Treat the repository documentation as the intended design, not as proof that the corresponding Microsoft resources exist.

## Inspect safely

1. Inspect the local repository status, root, relevant files, and available development tooling.
2. When safe authenticated tooling is available, inspect the current Azure authentication/context, available Azure subscriptions, selected subscription, existing relevant resource groups, and determinable region information.
3. When safe authenticated tooling is available, inspect whether the current context exposes Microsoft tenant or Power Platform environment information.
4. Use the capabilities actually available in this agent environment. An Azure CLI, an authenticated IDE integration, a Microsoft portal connector, or another equivalent mechanism is acceptable when it can inspect the same information safely.
5. Determine which facts were verified automatically and which require confirmation from the reader.

## Guardrails

- Do not ask the reader to provide passwords, client secrets, access tokens, API keys, connection strings, or other credentials.
- Do not print, copy, or expose secrets or sensitive credential material.
- Do not create `rg-northstar`.
- Do not create or modify Azure resources.
- Do not create or modify Microsoft 365 resources.
- Do not create or modify Power Platform resources.
- Do not change local configuration or repository files, except for temporary read-only inspection that does not persist changes.
- Do not begin Recipe 001.
- Do not infer tenant, subscription, region, or Power Platform facts merely from repository documentation.
- Never claim an inspection succeeded when the capability or authentication was unavailable.

If a required inspection cannot be performed with the capabilities available, explain the smallest human action needed to confirm it. Do not attempt to work around a missing permission by requesting or handling credentials.

## Report

Return a concise assessment with these sections:

### VERIFIED

- Repository root and status
- Azure authentication status, if determinable
- Available Azure subscription(s), if determinable
- Selected Azure subscription, if determinable
- Existing relevant resource groups
- Azure region information, if determinable
- Power Platform environment information, if determinable
- Microsoft tenant information, if safely determinable

### NEEDS HUMAN CONFIRMATION

List every required Northstar foundation value that could not be verified automatically and explain why.

### Recommended next Getting Started action

Recommend the smallest next action needed to establish the Northstar foundation from actual environment evidence. Remember that resource creation requires a separate, explicit step after this inspection.

Stop after the report. Do not create resources, edit the repository, or implement a recipe.
