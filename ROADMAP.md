# Roadmap

This roadmap proposes the first learning sequence. It favors small, verifiable steps and introduces only one significant new concept at a time.

## Before Recipe 001: Getting Started

Complete [Northstar Environment Setup](docs/cookbook-environment.md) before beginning Recipe 001. Getting Started establishes the Microsoft tenant, Azure subscription, selected Azure region, `rg-northstar`, Power Platform environment, Microsoft 365 boundary, local repository, and environment inventory. It is prerequisite setup, not Recipe 000.

Recipes then add Microsoft 365, Power Platform, identity, Azure, and AI resources progressively. They should reuse the established Northstar environment when a resource is intentionally shared, while keeping recipe-specific artifacts scoped to the recipe.

## Learning sequence

### Stage 1 — Microsoft business workflow and service-request management

1. **Inspect a Microsoft Forms response in Power Automate** — learn a form trigger, response details, and run history.
2. **Normalize request data in a flow** — learn how to shape a Forms response into a clear Northstar request representation before it crosses a storage boundary.
3. **Save the normalized request to a SharePoint list** — learn how to persist the shaped request and map it to SharePoint columns.
4. **Post a simple notification to Teams** — learn a focused collaboration notification.
5. **Display a request with a Teams Adaptive Card** — learn structured presentation of selected fields.
6. **Add service request tracking and management fields** — distinguish requester-supplied data from system-generated identity and support-managed operational fields while evolving the existing SharePoint model.
7. **Update and manage a service request** — find an existing request, update its operational state, persist the changes, and verify the lifecycle record.
8. **Report on service requests** — answer deterministic business questions over structured request data and decide when reporting is sufficient without runtime AI.
### Stage 2 — Add AI to the existing business problem

The deterministic foundation is now sufficient. Recipe 009 begins the first
runtime-AI arc with the existing service-request description; the cookbook
should not add unrelated Microsoft prerequisites before making that first
model call.

9. **Classify a service request with Azure AI** — send an existing request description to an Azure-hosted model, inspect the classification, and compare it with the requester-selected Request Type without replacing that authoritative field.
10. **Return structured AI output for a service request** — establish a small predictable output contract, validate it, and keep model output separate from authoritative business state.
11. **Add AI-assisted service request triage** — use Description, Request Type, and Urgent to suggest a summary, classification, priority, or reason while preserving human and business authority.
12. **Use a supporting file with an AI-assisted service request** — follow the actual current Forms and Microsoft 365 upload/storage path for a screenshot, PDF, or error document, then use relevant file content only where it helps the AI-assisted scenario.

Supporting files are placed after the first model call, structured output, and
triage so the reader understands the AI boundary before adding another input
type. Authoring must verify the current Microsoft storage and access path; it
must not assume OneDrive or another destination in advance.

13. **Retrieve relevant Northstar support knowledge with Azure AI Search** — introduce enterprise retrieval as a distinct capability that finds grounded support documentation for a request before combining retrieval with generation.
14. **Read Microsoft 365 data with Microsoft Graph** — introduce Graph when the AI-enabled application needs Microsoft 365 data or actions that the existing connectors do not appropriately expose.
15. **Protect the AI application with Microsoft Entra ID** — introduce sign-in, identity, and authorization before the application exposes protected data or business operations.
16. **Give an AI application one deterministic service-request tool** — let the application retrieve a known request by Service Request ID while the tool remains authoritative for identity, authorization, validation, data access, and business rules.
17. **Build a bounded AI-assisted service-request workflow** — combine interpretation, relevant retrieval, one deterministic lookup tool, and a proposed next step without creating a general autonomous agent.
18. **Add human approval before an AI-assisted action** — place a human decision between an AI recommendation and a consequential deterministic update such as changing Priority or Status.
19. **Evaluate the AI-assisted service-request feature** — use repeatable test cases, expected behavior, error analysis, structured evaluation, and regression checks against the known Northstar business scenario.

### Stage 3 — Combine

20. **Putting It Together: AI-assisted service request processing** — compose the verified Forms, Power Automate, SharePoint, Teams, tracking, lifecycle, and Power BI foundation with selective AI interpretation, structured output, relevant retrieval, a deterministic tool, human approval, and evaluation where justified.

The final recipe should combine learned capabilities rather than introduce a
large new platform. It should not turn the workflow into an agent merely
because AI is available.

The order may change as recipes are implemented and validated. A future roadmap revision should preserve the learning principle even if Microsoft product capabilities or recommended SDKs evolve. Recipe numbers represent the learning/build sequence, not the conceptual TOC chapters.

## Northstar service-request design

Recipes 001–008 establish the verified deterministic workflow:

```text
Northstar IT Service Request
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint Create item
    -> Post card in a chat or channel
    -> Northstar / IT Service Requests
```

The normalized request remains small:

```json
{
  "employeeName": "...",
  "requestType": "...",
  "description": "...",
  "isUrgent": true
}
```

Recipe 006 evolves the existing SharePoint-backed solution without
retroactively changing that normalized object. It should distinguish three
categories of data:

- **Requester-supplied data:** Employee Name, Request Type, Description, and Urgent.
- **System-generated data:** a persistent SharePoint item identity, a useful business-facing Service Request ID when justified, and Request Date.
- **Support-managed data:** Status, Priority, Assigned To, and Assigned Date.

Recipe 006 verified `Service Request ID`, `Status`, `Priority`, `Assigned To`,
and `Assigned Date`. SharePoint's existing `Created` metadata is used as the
request date; no duplicate Request Date column was added. The SharePoint item
ID provides the deterministic human-facing identifier `SR-004` in the
verified test.

Keep **Urgent** as the requester's indication and **Priority** as a
support/business assessment. Do not establish `Urgent = Yes -> Priority = High`
as a durable rule in the roadmap, and do not add AI triage yet.

Recipe 006 extends the Teams Adaptive Card with Service Request ID and
selected tracking fields while keeping the card uncluttered. The verified
card rendered Request ID, Employee, Request Type, Description, Urgent,
Status, and Priority. The sender displayed as `Workflows` in the verified
run.

Recipe 005 also exposed a known Teams presentation issue: the card displayed a
heading similar to `botcards_sent_on_behalf_of_user_display_name`. Recipe 006
verification used the current Flow bot posting configuration and the new card
displayed `Workflows`. If a future run exposes the earlier behavior again,
document it rather than adding a workaround or infrastructure. This issue is
not Recipe 006's primary learning objective.

Recipe 007 should teach the request lifecycle, not an approval-card shortcut:
identify an existing request, update operational fields, persist the changes,
and verify the stored record. Its trigger or user interface remains open for
authoring; use the simplest meaningful Microsoft mechanism and do not assume
Adaptive Card response actions are required.

Recipe 008 establishes the deterministic-reporting boundary. Questions such
as “How many Hardware requests were submitted?” or “How many requests are
High priority?” remain structured-data questions for Power BI or another
deterministic query. Questions such as “What kind of problem is this employee
describing?” or “What recurring problems are employees describing?” interpret
unstructured text and are the reason Recipe 009 begins the AI arc.

The remaining sequence preserves this boundary: deterministic identity,
authorization, persistence, reporting, and approved updates stay authoritative;
AI is introduced for interpretation, classification, summarization, semantic
retrieval, and bounded recommendations.

## Current status

- Foundation: established
- Recipe 001: hands-on verified
- Recipe 002: hands-on verified
- Recipe 003: hands-on verified
- Recipe 004: hands-on verified
- Recipe 005: hands-on verified
- Recipe 006: hands-on verified
- Recipe 007: hands-on verified
- Recipe 008: hands-on verified
- Recipe 009: planned; not authored
- Recipes 010–020: planned; not authored
