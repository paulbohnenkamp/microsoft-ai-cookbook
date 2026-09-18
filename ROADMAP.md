# Roadmap

This roadmap proposes the first learning sequence. It favors small, verifiable steps and introduces only one significant new concept at a time.

## Before Recipe 001: Getting Started

Complete [Northstar Environment Setup](docs/cookbook-environment.md) before beginning Recipe 001. Getting Started establishes the Microsoft tenant, Azure subscription, selected Azure region, `rg-northstar`, Power Platform environment, Microsoft 365 boundary, local repository, and environment inventory. It is prerequisite setup, not Recipe 000.

Recipes then add Microsoft 365, Power Platform, identity, Azure, and AI resources progressively. They should reuse the established Northstar environment when a resource is intentionally shared, while keeping recipe-specific artifacts scoped to the recipe.

## Initial learning sequence

### Stage 1 — Microsoft business workflow fundamentals

1. **Inspect a Microsoft Forms response in Power Automate** — learn a form trigger, response details, and run history.
2. **Save a request to a SharePoint list** — learn a structured SharePoint destination and field mapping.
3. **Normalize request data in a flow** — learn expressions and deliberate data shaping before storage.
4. **Create an archive file in OneDrive** — learn file creation and a simple document boundary.
5. **Post a simple notification to Teams** — learn a focused collaboration notification.
6. **Display a request with a Teams Adaptive Card** — learn structured presentation of selected fields.
7. **Putting It Together: internal service request intake** — compose Forms, Power Automate, SharePoint, OneDrive, and Teams with little new technology.

### Stage 2 — Enterprise application integration

8. **Read a Microsoft 365 resource with Microsoft Graph** — learn a narrowly scoped REST API call.
9. **Protect an application with Microsoft Entra ID** — learn sign-in and the boundary between authentication and authorization.

### Stage 3 — Add AI

10. **Call a model for a small classification task** — learn a model call and where deterministic rules remain preferable.
11. **Request structured model output** — learn schema-constrained results and validation at the application boundary.
12. **Search a small document collection with Azure AI Search** — learn retrieval as a separate capability before adding generation.
13. **Give an application one business tool** — learn tool calling with a deterministic operation and explicit authorization.
14. **Build a small agent workflow** — combine model output, retrieval, and one tool only where the workflow benefits from it.
15. **Add human approval to an AI-assisted action** — learn how to place a human decision at the boundary before a consequential business action.
16. **Evaluate an AI feature** — learn repeatable test cases, evaluation, and basic reliability analysis as a distinct capability.

### Stage 4 — Combine

17. **Putting It Together: AI-assisted service request processing** — revisit the earlier deterministic service-request workflow and add AI selectively for classification or other useful assistance, with structured results and human approval where required.

The final recipe is conceptual at this stage. It should not turn the workflow into an agent merely because AI is available.

The order may change as recipes are implemented and validated. A future roadmap revision should preserve the learning principle even if Microsoft product capabilities or recommended SDKs evolve. Recipe numbers represent the learning/build sequence, not the conceptual TOC chapters.

## Current status

- Foundation: established
- Recipe 001: authored; hands-on verification pending
- Putting It Together recipe: not started
