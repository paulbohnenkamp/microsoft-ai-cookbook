# Contributor guidance

## Mission

Build the cookbook as a sequence of small, practical learning artifacts for application and solution engineers. Treat each recipe as a teaching unit, not as a reason to build a generalized platform.

## How to work

- Preserve KISS. Before adding a dependency, abstraction, service, or framework, ask whether the reader needs it to learn the stated concept. If not, leave it out.
- Implement only the requested recipe or repository task. Do not begin future recipes, expand the fictional enterprise, or add speculative infrastructure.
- Keep one significant new concept in each normal recipe. Put composition into explicitly named “Putting It Together” recipes, which should introduce little new technology.
- Follow the progression in `ROADMAP.md`; do not use the conceptual TOC in `README.md` as an implementation queue.
- Explain the business problem before the build. Keep the example practical, reproducible, and understandable.
- Use Northstar only as lightweight context. Do not turn it into an application architecture, full domain model, or copied version of another project.

## Choosing technology

- Explicitly decide why AI is involved. Prefer deterministic code, APIs, Microsoft Graph, SharePoint operations, Power Automate expressions, database queries, or workflow rules when they solve the problem better.
- Do not introduce an agent when a simple workflow is sufficient.
- When a Microsoft product name, capability, SDK, agent framework, or recommended approach may have changed, verify it against current official Microsoft documentation before documenting it as guidance. Record the relevant source near the recipe when useful.
- Keep identity, authorization, sensitive data, content safety, error handling, cost, and latency considerations proportional to the example, but do not hide important boundaries.

## Recipe completion

Before declaring a recipe complete, verify the real artifact and confirm that it includes, at an appropriate level of detail:

- business problem and learning goal
- technologies and prerequisites
- understandable build steps
- security considerations
- a test with an observable expected result
- common failure cases
- why AI is or is not appropriate
- next steps or related recipes

Do not pad a simple recipe to fill sections artificially. Stop at the requested scope and summarize what was created and how it was verified.

## Northstar environment

- Treat Northstar as the shared fictional enterprise context. Keep it intentionally small; do not turn it into an application architecture or provision infrastructure for all six departments.
- Getting Started establishes the Northstar environment before Recipe 001: the tenant, Azure subscription, selected region, `rg-northstar`, Power Platform environment, Microsoft 365 boundary, local repository, and environment inventory.
- Use `rg-northstar` as the standard Azure resource group when a recipe actually needs an Azure resource. Add Azure services progressively; do not provision future infrastructure prematurely.
- Keep the boundaries accurate: Microsoft 365 resources do not live inside the Azure resource group, Power Platform has its own environment boundary, and local artifacts live in the repository.
- Recipes should identify the current Microsoft web experience or portal where configuration work is performed. Verify official entry points when writing hands-on instructions rather than relying on remembered URLs.
- Check current official Microsoft guidance when portal navigation, terminology, product names, SDKs, or setup steps may have changed.

## Artifacts and verification

- Treat the recipe directory as the unit of ownership. Artifacts that exist specifically for one recipe—prompts, source code, JSON, schemas, scripts, configuration examples, Adaptive Cards, sample inputs, test inputs, or example documents—belong beside that recipe.
- Keep cookbook-wide prompts in top-level `prompts/`. Do not create parallel top-level trees such as `prompts/recipes/...`, `schemas/recipes/...`, or `examples/recipes/...` for recipe-owned material.
- Prompts are first-class artifacts when they improve the learning or development workflow. Make them human-readable and explicit about goals, scope, guardrails, expected end state, verification, and stop conditions.
- Do not create build, verify, review, or similar prompts automatically for every recipe. Apply KISS to prompts; add only prompts that meaningfully help.
- Reuse intentionally shared Northstar resources instead of recreating them in later recipes.
- Use top-level `sample-data/` only for fictional Northstar data intentionally reused across multiple recipes.
- Provide artifacts when they improve reproducibility, but do not hide the Microsoft concept being taught behind a prebuilt solution.
- Distinguish `authored` from `hands-on verified`. A recipe is hands-on verified only after it has been performed in the real Northstar environment, its behavior observed, and unclear instructions corrected.

## Agent capability boundaries

- Do not assume Codex, GitHub Copilot, Claude Code, ChatGPT, or another agent has the same filesystem, shell, portal, connector, or authenticated-tool capabilities.
- Prompts should describe goals, constraints, expected end state, verification, and stop conditions rather than depend on one product's special features.
- Inspect and act only through safe capabilities actually available in the current agent environment. If a capability is unavailable, report the limitation and name the smallest human action needed.
- Never fabricate a successful command, portal action, authentication state, resource, or verification result.
- Never request or expose passwords, client secrets, access tokens, API keys, connection strings, or other credentials.
- Keep inspection separate from provisioning. The Getting Started inspection is read-only; it must not create `rg-northstar`, Microsoft 365 resources, Power Platform resources, or Azure services.

## Repository boundaries

- Put recipes in `recipes/`.
- Put durable reference material and conventions in `docs/`.
- Add sample data only when a concrete recipe needs it.
- Keep the README human-facing, the roadmap sequence-focused, and this file focused on agent behavior.
