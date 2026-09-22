# Microsoft Enterprise AI Cookbook

A practical collection of small recipes for building useful business solutions
with Microsoft 365, Power Platform, Azure, identity, APIs, workflows, and AI.

## What it demonstrates

- Starts with the smallest useful business example rather than a platform-sized
  implementation.
- Progresses from deterministic Microsoft workflows to AI-enabled integrations.
- Covers Teams, SharePoint, OneDrive, Power Automate, Microsoft Graph, Entra ID,
  Microsoft Foundry, Azure AI Search, tool calling, and human review.
- Treats security, testing, failure cases, evaluation, and observability as
  part of each recipe.

Northstar is a fictional company used to give the recipes a consistent business
context. It is not an application the cookbook is trying to build.

## AI interaction flow

1. Start with a concrete business problem and the smallest useful workflow.
2. Use deterministic Microsoft services, APIs, expressions, or queries where
   they are the better fit.
3. Add AI for interpretation, recommendations, structured outputs, or agent
   workflows when it adds value.
4. Verify security, failure cases, testing, evaluation, and human review.
5. Capture the result as a reusable recipe.

This demonstrates progressive AI adoption, boundary-aware integration design,
and choosing AI for a reason rather than treating every workflow as an agent.

## Technology used

- **Microsoft 365 / Teams / SharePoint / OneDrive** — provide collaboration,
  documents, and business data.
- **Power Platform / Power Automate** — implement deterministic business
  workflows and approvals.
- **Microsoft Graph / Entra ID** — integrate Microsoft 365 data and identity.
- **Azure / Microsoft Foundry** — provide cloud services, models, and AI
  application capabilities.
- **Azure AI Search** — supports enterprise knowledge retrieval and grounding.
- **YAML / Markdown** — define recipes, prompts, specifications, and guidance.

## Quick start

```bash
git clone https://github.com/paulbohnenkamp/microsoft-ai-cookbook.git
cd microsoft-ai-cookbook
```

Read [Getting Started](docs/cookbook-environment.md), then follow the sequence
in [the recipe roadmap](ROADMAP.md).

## Further reading

- [Recipe index](recipes/README.md)
- [Recipe template](docs/recipe-template.md)
- [Fictional enterprise](docs/fictional-enterprise.md)
- [Documentation index](docs/README.md)
