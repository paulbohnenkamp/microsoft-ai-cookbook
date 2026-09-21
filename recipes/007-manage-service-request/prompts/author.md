# Author Recipe 007: Update and manage a service request

This is the preserved authoring prompt for Recipe 007. It defines the recipe
design and creates the future build prompt. It does not authorize a
hands-on Microsoft 365 run.

## Read first

Read `AGENTS.md`, `README.md`, `ROADMAP.md`,
`docs/cookbook-environment.md`, and the prior verified Recipes 003–006,
including their README files and build prompts. Treat Recipes 001–006 as the
current verified Northstar state.

Research current first-party Microsoft guidance for SharePoint list-item
editing, Person or Group columns, and Created/Modified metadata. Do not rely
on remembered SharePoint, Power Automate, Teams, Power Apps, or Adaptive Card
behavior.

## Authoring goal

Create exactly:

```text
recipes/007-manage-service-request/README.md
recipes/007-manage-service-request/prompts/author.md
recipes/007-manage-service-request/prompts/build.md
```

Do not execute Recipe 007. Do not modify Microsoft 365, SharePoint, Power
Automate, Teams, Azure, Power Platform, Power Apps, Power BI, Graph, or AI
resources. Do not author Recipe 008.

## Learning objective

Teach this lifecycle operation:

```text
identify an existing business record
    -> retrieve and inspect it
    -> change operational fields
    -> persist the update
    -> verify the stored state
```

Recipe 007 teaches one significant new concept: updating an existing
enterprise business record. Do not turn it into a service-management
application, state machine, approval system, assignment-history system, SLA
tracker, escalation process, or reporting solution.

## Selected Microsoft mechanism

Select direct editing of the existing SharePoint list item through the current
SharePoint/Microsoft Lists item form.

Do not introduce Power Automate merely because earlier recipes use it. Do not
add a modification-triggered flow for `Assigned Date`; that would introduce
trigger conditions, change detection, recursive writes, and repeat-update
rules before the reader has learned the basic update operation.

Do not use an interactive Adaptive Card. Recipe 006 already teaches card
presentation, and response handling would obscure the update lesson.

Do not use Power Apps. A dedicated management UI is excessive for one list
item.

Explain why direct SharePoint editing is preferable for this small recipe:
the list is already the operational record, the item form exposes the update
directly, and the recipe adds no second write path or synchronization problem.

## Existing verified record

Use `SR-004` as the preferred test record if it remains available and still
has the Recipe 006 state:

```text
Service Request ID: SR-004
SharePoint item ID: 4
Employee: Taylor Morgan
Request Type: Access
Description: I need access to the Finance project SharePoint site.
Urgent: No
Status: New
Priority: Normal
Assigned To: blank
Assigned Date: blank
Created: 2026-09-19T17:58:59Z
```

Do not hard-code the record in the build implementation. The build prompt must
inspect the current list and select another safe test record if `SR-004` is
missing or has legitimately changed. It must not reset legitimate data.

## Data boundaries and target state

Keep requester-supplied data unchanged:

- Employee Name
- Request Type
- Description
- Urgent

Change only support-managed operational data:

- Status: `New` -> `In Progress`
- Priority: `Normal` -> `High`
- Assigned To: blank -> an actual approved tenant support user
- Assigned Date: blank -> the current assignment timestamp

Keep `Service Request ID` and the SharePoint item identity stable. Do not
infer `Priority` from `Urgent`; `Urgent` remains the requester’s indication
and `Priority` remains a support decision.

The support user enters `Assigned Date` when the assignment occurs. Use the
current date and time shown by the SharePoint form. Do not use `Created`.
Preserve an existing `Assigned Date` during later non-assignment edits.
Explain that this manual timestamp is the smallest design that preserves the
meaning of assignment without adding a modification-triggered flow.

Use `Created`, `Modified`, and `Modified By` as platform-managed supporting
metadata. `Created` must remain unchanged. `Modified` and `Modified By` should
show the management edit.

## Recipe README requirements

Use the established concise structure:

1. Business problem
2. What you'll learn
3. Microsoft technologies used
4. Prerequisites
5. How it works
6. Build steps
7. Security considerations
8. Test it
9. Common failure cases
10. Why AI is or is not appropriate
11. Next steps / related recipes

State that the recipe is `authored; hands-on verification pending`. Explain
the business ID versus SharePoint item ID, the exact before/after operation,
the direct-edit decision, the manual assignment timestamp, the metadata
evidence, the unchanged requester boundary, and why Teams does not
participate.

Link the current first-party Microsoft guidance used for those claims.

## Build prompt requirements

Create `recipes/007-manage-service-request/prompts/build.md`. It must tell a
future agent to:

1. Read the recipe and relevant verified prior recipes.
2. Inspect the actual Northstar SharePoint site, list, columns, and session.
3. Confirm Recipe 006 remains verified and the list contains the tracking
   fields.
4. Locate an existing request by `Service Request ID`, preferring `SR-004`.
5. Inspect the current item before editing and stop on unexpected state.
6. Preserve Employee Name, Request Type, Description, and Urgent.
7. Set Status to `In Progress` and Priority to `High`.
8. Select an actual appropriate tenant user for Assigned To. Ask for the
   smallest human action if the correct user cannot be determined.
9. Enter the current assignment date and time in Assigned Date.
10. Save the same SharePoint item.
11. Verify the item ID and Service Request ID are unchanged.
12. Verify requester data, Created, operational fields, Modified, and Modified
    By from the actual list.
13. Verify that no duplicate item was created.
14. Correct the README/build prompt only after successful hands-on behavior is
    observed.
15. Mark Recipe 007 verified only after the complete update is observed.
16. Stop without starting Recipe 008.

Do not introduce a flow, Teams notification, interactive card, Power Apps app,
Power BI report, Graph call, Entra work, Azure service, or runtime AI.

## Roadmap

Update `ROADMAP.md` only enough to mark:

```text
Recipe 007: authored; hands-on verification pending
```

Do not change the established 001–020 sequence or the statuses of Recipes
001–006.

## Security and AI boundary

Mention SharePoint edit permissions, least privilege for support users,
Person or Group selection, and the need to avoid unnecessary account details.
Do not turn identity into a separate lesson; Microsoft Entra ID has a later
recipe.

Runtime AI is not appropriate. The operation uses explicit deterministic
values and an actual human-selected assignee. AI must not decide the status,
priority, or assignee.

## Stop condition

After authoring Recipe 007, stop. Report the created and modified files, the
selected mechanism and rejected alternatives, the before/after state, the
identity and metadata rules, the absence of Power Automate and Teams changes,
the assumptions requiring hands-on verification, and confirmation that
Recipes 007 and 008 were not executed or started.
