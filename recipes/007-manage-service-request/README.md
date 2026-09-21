# Recipe 007: Update and manage a service request

**Status:** hands-on verified

## Business problem

Northstar can create and display an IT service request. A support person also
needs to manage that request after creation.

This recipe updates the existing SharePoint record for `SR-004`. It does not
create another request, change the requester’s answers, or synchronize the
old Teams card.

## What you'll learn

You will identify an existing business record, edit its operational fields,
save the change, and verify that the same record was updated.

The lifecycle operation is:

```text
find the request
    -> inspect its current state
    -> change operational fields
    -> save the existing item
    -> verify the stored state
```

The recipe teaches one new concept: updating an existing enterprise record.
It does not build a service-management application or a complete state
machine.

## Microsoft technologies used

- SharePoint / Microsoft Lists

Recipe 007 does not modify Power Automate, Teams, Forms, Azure, Power Apps,
Power BI, Graph, or Power Platform resources.

## Prerequisites

- Recipes 001–006 are hands-on verified.
- The `Northstar` SharePoint site and `IT Service Requests` list exist.
- The list contains `Service Request ID`, `Status`, `Priority`, `Assigned To`,
  and `Assigned Date` from Recipe 006.
- The support user has permission to edit list items.
- The support user can select an appropriate tenant user in the `Assigned To`
  Person or Group field.

## How it works

### Select the existing SharePoint item

Open the `Northstar` site and the `IT Service Requests` list. Find the item by
the business-facing `Service Request ID`, such as `SR-004`.

The list also has a platform identity. In the verified Recipe 006 test:

| Identity | Value | Use |
| --- | --- | --- |
| Service Request ID | `SR-004` | Human-facing search and verification |
| SharePoint item ID | `4` | Platform identity for the list item |

Use `Service Request ID` to find the request. Use the SharePoint item ID to
prove that the same item remains after the edit.

### Edit the operational fields directly

Use the current SharePoint list item form. Change only these fields:

| Field | Before | After |
| --- | --- | --- |
| Status | `New` | `In Progress` |
| Priority | `Normal` | `High` |
| Assigned To | blank | An actual approved tenant support user |
| Assigned Date | blank | The current assignment timestamp |

Leave `Employee Name`, `Request Type`, `Description`, and `Urgent` unchanged.
Keep `Service Request ID` unchanged.

The support user enters `Assigned Date` when the assignment occurs. Use the
date and time shown by the SharePoint form for the list's configured display
time zone. Do not copy the request's `Created` value. Do not overwrite
`Assigned Date` when a later edit changes only Priority or another field.

This recipe keeps timestamp generation manual because direct list editing is
the smallest meaningful mechanism for this lesson. A flow that detects item
changes and writes `Assigned Date` would introduce trigger conditions,
recursion risks, and repeated-update rules before the reader has learned the
basic update operation.

SharePoint's built-in `Created`, `Modified`, and `Modified By` metadata remain
available as supporting evidence. `Created` must stay unchanged. `Modified`
and `Modified By` should reflect the management edit.

### Why this recipe does not use the other mechanisms

- **Direct SharePoint editing** is selected because it exposes the update
  operation with the fewest moving parts. It also makes the list the visible
  operational record.
- **Power Automate** is not selected. An instant flow would add an interface
  and another write path without improving this small edit.
- **SharePoint plus Power Automate** is not selected. A modification-triggered
  flow would run on every edit unless it used change detection and trigger
  conditions. It could also update the same item and create a loop.
- **Interactive Adaptive Cards** are deferred. Recipe 006 already teaches
  card presentation, while response handling would become a second major
  concept. The existing card represents the intake-time state.
- **Power Apps** is not selected. A dedicated management UI is excessive for
  one list-item update.

The cookbook does not introduce a Microsoft service merely to demonstrate the
service.

## Build steps

Follow [`prompts/build.md`](prompts/build.md). The prompt inspects the actual
list and record before editing and stops before Recipe 008.

## Security considerations

- Give edit access to support users who manage requests. Do not grant broad
  edit access only to make the exercise easier.
- Select an actual approved tenant user for `Assigned To`. Do not invent an
  identity or expose unnecessary account details in documentation.
- Keep requester data and operational data visible only to the people who
  need them.
- Do not request or record passwords, tokens, keys, secrets, or connection
  strings.

## Test it

Use `SR-004` if it still has the verified Recipe 006 state:

| Field | Before | Target after the edit |
| --- | --- | --- |
| Service Request ID | `SR-004` | `SR-004` |
| SharePoint item ID | `4` | `4` |
| Employee Name | Taylor Morgan | Taylor Morgan |
| Request Type | Access | Access |
| Description | `I need access to the Finance project SharePoint site.` | unchanged |
| Urgent | No | No |
| Status | New | In Progress |
| Priority | Normal | High |
| Assigned To | blank | actual approved tenant support user |
| Assigned Date | blank | actual assignment timestamp |
| Created | `2026-09-19T17:58:59Z` | unchanged |

If `SR-004` is unavailable or has changed, inspect the difference. Do not
reset legitimate data just to match this table. Select another suitable test
record or create a fresh record through the already-verified Recipe 006 path
only when a fresh lifecycle test is genuinely needed.

## Hands-on verification

The existing `Northstar` SharePoint site's `IT Service Requests` list was
updated through the direct SharePoint item form. Before the lifecycle edit,
the live `Priority` column was corrected in place from `Low`, `Normal`,
`Choice 3` to `Low`, `Normal`, `High`; `SR-004` remained `New` with
`Normal`. No list or column was recreated.

The saved lifecycle update preserved the same item and produced these observed
results:

| Field | Before | After |
| --- | --- | --- |
| SharePoint item ID | `4` | `4` |
| Service Request ID | `SR-004` | `SR-004` |
| Employee Name | Taylor Morgan | Taylor Morgan |
| Request Type | Access | Access |
| Description | `I need access to the Finance project SharePoint site.` | unchanged |
| Urgent | No | No |
| Status | New | In Progress |
| Priority | Normal | High |
| Assigned To | blank | Paul Bohnenkamp |
| Assigned Date | blank | `9/20/2026 6:44 PM` |

The list displays dates in Pacific time (`UTC-08:00`). SharePoint metadata
showed `Created` as `9/19/2026 10:58 AM`, `Modified` as `9/20/2026 6:45 PM`,
and `Modified By` as Paul Bohnenkamp. The list still contained four items, so
no duplicate was created. Requester-supplied data remained unchanged.

## Common failure cases

- **The request cannot be found.** Search by `Service Request ID`, not only by
  the internal numeric ID. Inspect the list before choosing another record.
- **The item has already changed.** Do not overwrite unexpected operational
  state. Record the difference and choose the smallest safe test path.
- **The Person or Group field shows no suitable user.** Stop and ask a human
  to identify the approved support user. Do not guess an account.
- **The edit creates a second item.** Stop. Verify that the item ID and
  Service Request ID before and after the operation are identical.
- **Requester data changes.** Restore nothing blindly. Report the difference
  and do not claim a successful lifecycle update.
- **A flow or card is proposed to solve the update.** Do not add it. The
  selected design uses the existing SharePoint item form only.
- **The SharePoint UI differs.** Record the current behavior and correct this
  README and `build.md` after a successful hands-on verification.

## Why AI is not appropriate

The operation is deterministic. A support user selects a known request and
chooses explicit values for status, priority, assignee, and assignment time.
Runtime AI should not decide the assignee, status, or priority.

Later recipes may use AI to suggest actions with human review. Recipe 007
does not need runtime AI.

## Next steps / related recipes

Recipe 008 will report over the accumulated structured request data. Recipe
007 does not implement reporting, Power BI, approvals, escalation, SLA
tracking, assignment history, or Teams synchronization.

## Official references

- [Edit list items](https://support.microsoft.com/en-us/SharePoint/lists/data-and-lists/edit-list-items)
- [List and library column types and options](https://support.microsoft.com/en-us/sharepoint/lists/data-and-lists/list-and-library-column-types-and-options)
- [Microsoft SharePoint connector for Power Automate](https://learn.microsoft.com/en-us/sharepoint/dev/business-apps/power-automate/sharepoint-connector-actions-triggers)
- [SharePoint field element reference](https://learn.microsoft.com/en-us/sharepoint/dev/schema/field-element-list)
