
# Microsoft Enterprise AI Cookbook

The Microsoft Enterprise AI Cookbook is a practical collection of small recipes for building useful business solutions with Microsoft technologies.

It is written for application and solution engineers who need to understand business problems, choose appropriate Microsoft capabilities, and build reliable integrations. The cookbook focuses on Microsoft 365, Power Platform, Azure, identity, APIs, workflows, coding agents, and AI-enabled applications without turning every example into a platform project.

## How the cookbook works

- KISS: start with the smallest useful example and avoid unnecessary dependencies, abstractions, and infrastructure.
- One significant new concept per recipe: supporting technologies are included only when they help teach the primary concept.
- Progressive learning: build from simple Microsoft enterprise building blocks toward AI-enabled solutions.
- Putting It Together recipes: periodically compose previously learned capabilities into a useful business workflow without introducing much new technology.
- AI with a reason: use AI when it adds value; prefer deterministic code, APIs, expressions, queries, or workflows when they are the better fit.

Recipes use a consistent, lightweight format covering the business problem, learning goal, technologies, prerequisites, build steps, security, testing, failure cases, the role of AI, and next steps.

## Table of contents

This is the cookbook's long-term conceptual map. It is not a commitment to implement every topic immediately, and it is separate from the recipe sequence in `ROADMAP.md`.

1. **Getting Started**
   - How to use this cookbook
   - Meet Northstar
   - Understand the Microsoft environment
   - Set up the Northstar foundation
   - Create `rg-northstar`
   - Identify the Power Platform environment
   - Understand where Microsoft 365, Azure, and local resources live
   - Review the Northstar environment inventory
   - Inspect the existing environment with an AI coding agent
   - Recipe conventions
2. **Microsoft Business Workflows**
   - Microsoft Forms
   - Power Automate
   - SharePoint
   - OneDrive
   - Microsoft Teams and Adaptive Cards
   - Putting It Together workflows
3. **Microsoft 365 Application Integration**
   - Microsoft Graph
   - Microsoft Entra ID
   - Authentication and authorization
   - Microsoft 365 data and documents
4. **Microsoft AI Fundamentals**
   - Microsoft Foundry
   - Models and prompting
   - Structured output
   - AI safety
5. **Enterprise Knowledge and Search**
   - Azure AI Search
   - Document ingestion and retrieval
   - Grounded answers
   - Access control
6. **Tools and Agents**
   - Tool calling and business APIs as tools
   - Microsoft Agent Framework where appropriate
   - Agent workflows, state, and context
   - When not to use an agent
7. **Human-in-the-Loop Business Processes**
   - Reviews, approvals, and escalation
   - AI recommendations versus business actions
8. **AI Quality and Reliability**
   - Evaluation and test cases
   - Error analysis
   - Tracing and observability
   - Cost, latency, and content safety
9. **Putting It Together**
   - Complete business workflows
   - AI-assisted workflows
   - Microsoft 365 and AI solutions
   - Increasingly advanced enterprise patterns

## Fictional enterprise

The cookbook uses **Northstar**, a fictional mid-sized services company with six departments: Human Resources, Finance and Accounting, Marketing, Sales, Operations, and Information Technology. It uses Microsoft 365, Teams, SharePoint, OneDrive, Power Platform, Azure, and increasingly Microsoft AI capabilities. Northstar exists only to provide continuity between examples; it is not an application that the cookbook is trying to build.

The first learning arc uses a small internal IT service request. It grows from capture and presentation into tracking, lifecycle management, and deterministic reporting. The next arc uses that verified business process to introduce runtime AI for interpretation, structured output, retrieval, bounded tools, human decisions, and evaluation. Examples may use employees, customers, service requests, invoices, documents, policies, contracts, and approvals, but each recipe keeps the scenario intentionally small.

## Getting Started

Before Recipe 001, the reader establishes the Northstar foundation: the Microsoft tenant, Azure subscription, Azure region, `rg-northstar`, Power Platform environment, Microsoft 365 boundary, and local repository. The durable setup guide and environment inventory are in [`docs/cookbook-environment.md`](docs/cookbook-environment.md).

Getting Started does not provision every future Microsoft resource. Forms, flows, SharePoint lists, OneDrive folders, Teams resources, Azure services, and AI capabilities are introduced progressively when recipes need them.

The intended beginning is:

1. Clone or open `microsoft-ai-cookbook`.
2. Open it in a capable AI coding or agent environment.
3. Read the Getting Started documentation.
4. Give the agent [`prompts/getting-started/inspect-environment.md`](prompts/getting-started/inspect-environment.md).
5. Review what the agent can verify and what still needs human confirmation.
6. Establish the Northstar foundation from actual environment evidence.
7. Create and verify `rg-northstar`.
8. Record the verified environment, then begin Recipe 001.

The inspection prompt is intentionally tool-agnostic. Different coding agents may be able to inspect local files, run authenticated Azure tooling, use an integration, or none of these. The agent must report its limits rather than fabricate successful execution.

## Suggested learning path

Start with the recipes in `ROADMAP.md`. Recipes 001–008 establish and verify the deterministic Microsoft business process before Recipe 009 makes the first real runtime model call against the existing request description. Later recipes introduce structured output, AI-assisted triage, supporting files, retrieval, Graph and Entra where the application needs them, deterministic tools, bounded agent behavior, human approval, and evaluation. The roadmap is a proposal and will evolve as the recipes are written.

## Repository guide

- `recipes/` contains the cookbook recipes and the reusable recipe template.
- `prompts/` contains prompts that apply to the cookbook or environment as a whole. Recipe-specific prompts belong inside the relevant recipe directory.
- `docs/` contains reference material, the fictional-enterprise definition, and specifications.
- `sample-data/` contains only small fixtures needed by actual recipes.
- `AGENTS.md` describes working conventions for contributors and coding agents.

Recipes 001–008 are hands-on verified. The deterministic foundation is complete; Recipe 009 is the next planned recipe and the first runtime-AI recipe. No runtime-AI recipe has been hands-on verified yet.
