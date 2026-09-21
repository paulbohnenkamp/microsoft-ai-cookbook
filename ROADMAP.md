# Roadmap

This roadmap proposes the first learning sequence. It favors small, verifiable steps and introduces only one significant new concept at a time.

## Before Recipe 001: Getting Started

Complete [Northstar Environment Setup](docs/cookbook-environment.md) before beginning Recipe 001. Getting Started establishes the Microsoft tenant, Azure subscription, selected Azure region, `rg-northstar`, Power Platform environment, Microsoft 365 boundary, local repository, and environment inventory. It is prerequisite setup, not Recipe 000.

Recipes then add Microsoft 365, Power Platform, identity, Azure, and AI resources progressively. They should reuse the established Northstar environment when a resource is intentionally shared, while keeping recipe-specific artifacts scoped to the recipe.

## Initial learning sequence

### Stage 1 — Microsoft business workflow and service-request management

1. **Inspect a Microsoft Forms response in Power Automate** — learn a form trigger, response details, and run history.
2. **Normalize request data in a flow** — learn how to shape a Forms response into a clear Northstar request representation before it crosses a storage boundary.
3. **Save the normalized request to a SharePoint list** — learn how to persist the shaped request and map it to SharePoint columns.
4. **Post a simple notification to Teams** — learn a focused collaboration notification.
5. **Display a request with a Teams Adaptive Card** — learn structured presentation of selected fields.
6. **Add service request tracking and management fields** — distinguish requester-supplied data from system-generated identity and support-managed operational fields while evolving the existing SharePoint model.
7. **Update and manage a service request** — find an existing request, update its operational state, persist the changes, and verify the lifecycle record.
8. **Report on service requests** — answer deterministic business questions over structured request data and decide when reporting is sufficient without runtime AI.
9. **Putting It Together: internal service request management** — compose intake, tracking, management, Teams presentation, and reporting into a coherent small enterprise workflow.

### Stage 2 — Enterprise application integration

10. **Read a Microsoft 365 resource with Microsoft Graph** — learn a narrowly scoped REST API call.
11. **Protect an application with Microsoft Entra ID** — learn sign-in and the boundary between authentication and authorization.
12. **Add a supporting file to an IT service request** — learn the current Forms file-upload and Microsoft 365 storage/handling path when a request has a real supporting file such as a screenshot, PDF, or error document.

The file-handling recipe is intentionally later than the core intake workflow. It should follow the actual current Microsoft behavior for where Forms uploads are stored and how Power Automate accesses them; it must not assume that OneDrive is the final destination before that behavior is verified.

### Stage 3 — Add AI

13. **Call a model for a small classification task** — learn a model call and where deterministic rules remain preferable.
14. **Request structured model output** — learn schema-constrained results and validation at the application boundary.
15. **Search a small document collection with Azure AI Search** — learn retrieval as a separate capability before adding generation.
16. **Give an application one business tool** — learn tool calling with a deterministic operation and explicit authorization.
17. **Build a small agent workflow** — combine model output, retrieval, and one tool only where the workflow benefits from it.
18. **Add human approval to an AI-assisted action** — learn how to place a human decision at the boundary before a consequential business action.
19. **Evaluate an AI feature** — learn repeatable test cases, evaluation, and basic reliability analysis as a distinct capability.

### Stage 4 — Combine

20. **Putting It Together: AI-assisted service request processing** — revisit the earlier deterministic service-request workflow and add AI selectively for classification or other useful assistance, with structured results and human approval where required.

The final recipe is conceptual at this stage. It should not turn the workflow into an agent merely because AI is available.

The order may change as recipes are implemented and validated. A future roadmap revision should preserve the learning principle even if Microsoft product capabilities or recommended SDKs evolve. Recipe numbers represent the learning/build sequence, not the conceptual TOC chapters.

## Northstar service-request design

Recipes 001–006 establish the verified deterministic workflow:

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

Recipe 008 should report over the accumulated structured request data. Useful
questions include counts by status, priority, request type, urgency, or
assignee, and distributions across those fields. Power BI is the leading
candidate because reporting gives it a meaningful business reason, but it is
not committed yet. Recipe 008 authoring should compare Power BI with
SharePoint views or other current Microsoft reporting capabilities and avoid
unnecessary licensing, capacity, or infrastructure.

Recipe 008 should make the deterministic-reporting boundary explicit. A
question such as “How many Hardware requests were submitted?” is a structured
data query and does not need runtime AI. Later questions such as summarizing
recurring themes in free-text descriptions may justify AI. Recipes 006–009
should create useful data for those future questions without adding runtime AI
prematurely.

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
- Recipe 009: not authored
- Recipes 010–020: planned; not authored
