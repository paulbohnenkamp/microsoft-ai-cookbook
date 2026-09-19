# Recipe 006: Add service request tracking and management fields

**Status:** authored; hands-on verification pending

## Business problem

The verified Northstar workflow captures and persists a request, then shows it
in Teams. Support now needs an operational identity and a small amount of
state without changing what the requester submitted.

## What you'll learn

- Distinguish requester-supplied, system-generated, and support-managed data.
- Evolve an existing SharePoint list deliberately.
- Use a SharePoint-generated item identity downstream.
- Keep the normalized request stable while adding operational metadata.

The normalized object remains:

```json
{
  "employeeName": "...",
  "requestType": "...",
  "description": "...",
  "isUrgent": true
}
```

## Microsoft technologies used

Microsoft Forms, Power Automate, SharePoint/Microsoft Lists, Microsoft Teams,
and Adaptive Cards.

## Prerequisites

Recipes 001–005 are hands-on verified. The existing `Northstar IT Service
Request` form, Northstar flow, `Northstar` SharePoint site, `IT Service
Requests` list, `Northstar` Team, and `IT Service Requests` channel are reused.

## How it works

The target flow is:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> SharePoint - Update item
    -> Microsoft Teams - Post card in a chat or channel
```

The existing four requester fields are preserved. The authored baseline adds
the following list fields:

| Field | Type | Baseline behavior |
| --- | --- | --- |
| Service Request ID | Single line of text | Persist a human-facing ID after Create item |
| Status | Choice: `New`, `In Progress`, `Resolved` | Default `New` |
| Priority | Choice: `Low`, `Normal`, `High` | Default `Normal`; independent of Urgent |
| Assigned To | Person or Group, single value | Blank until a support user assigns it |
| Assigned Date | Date and Time | Blank until an assignment occurs |

No custom Request Date column is added. SharePoint's existing `Created`
metadata is the request date for this learning arc, avoiding duplicate data.
These field types are an authored baseline and require hands-on confirmation
against the current list UI and connector behavior.

## Service Request ID design

The baseline derives the ID from the actual SharePoint item ID and persists it
with one update:

```text
concat('SR-', formatNumber(outputs('Create_item')?['body/ID'], '000'))
```

The zero-padded value is readable and deterministic. Persisting it costs an
extra `Update item` action, but gives support, reporting, and later Teams cards
a stable human-facing value without repeating the derivation. The expression,
field mapping, and whether the current connector returns the expected ID must
be verified hands-on.

## Adaptive Card

Extend the existing display-only card with Service Request ID, Status, and
Priority. Keep Employee, Request Type, Description, and Urgent. Do not show
blank Assigned To or Assigned Date fields, and do not add buttons or a response
wait. Preserve the existing card schema and only use the current supported
Teams action.

Recipe 005 observed a sender/display-name value resembling
`botcards_sent_on_behalf_of_user_display_name`. The build prompt investigates
the current supported posting identity and records what the actual Teams
experience displays. It does not add a bot, Graph, or other workaround.

## Build steps

Follow [`prompts/build.md`](prompts/build.md). It is an execution prompt for a
future hands-on run; authoring this recipe does not execute it.

## Security considerations

Access to the SharePoint list and private Teams channel controls visibility.
Keep Assigned To limited to the people who manage requests. Do not put
secrets, credentials, tokens, connection strings, or unnecessary sensitive
personal data in the list or card.

## Test it

Use this new response:

- Employee Name: `Taylor Morgan`
- Request Type: `Access`
- Description: `I need access to the Finance project SharePoint site.`
- Urgent?: `No`

Expected normalized request:

```json
{
  "employeeName": "Taylor Morgan",
  "requestType": "Access",
  "description": "I need access to the Finance project SharePoint site.",
  "isUrgent": false
}
```

Record actual response, run, item, ID, timestamp, and rendered-card values;
never predict them.

## Common failure cases

- `Update item` needs the actual integer SharePoint item ID from Create item.
- Choice defaults or Person/Group behavior may differ in the current list UI.
- A required field must not be filled with invented assignment data.
- A malformed expression can produce an empty or unformatted request ID.
- Teams may show Flow bot identity rather than a human display name.
- A second form, flow, list, or notification would break the learning arc.

## Why AI is not appropriate

The fields, ID derivation, defaults, and card values are deterministic. Runtime
AI would add variability and cost without improving this lesson.

## Next steps / related recipes

Recipe 007 will update and manage an existing request. It is not part of this
recipe and must not be started during authoring or verification of Recipe 006.

## Documentation status and references

This README records an authored design, not observed hands-on behavior. The
build run must distinguish Microsoft-documented connector behavior, behavior
already observed in Recipes 001–005, and Recipe 006 behavior still pending.

- [SharePoint column formatting and supported field types](https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/column-formatting)
- [SharePoint field element types](https://learn.microsoft.com/en-us/sharepoint/dev/schema/field-element-list)
- [SharePoint connector actions](https://learn.microsoft.com/en-us/sharepoint/dev/business-apps/power-automate/sharepoint-connector-actions)
- [SharePoint connector reference](https://learn.microsoft.com/en-us/connectors/sharepoint/)
- [Power Automate and Logic Apps expression functions](https://learn.microsoft.com/en-us/azure/logic-apps/expression-functions-reference)
- [Power Automate Adaptive Cards overview](https://learn.microsoft.com/en-us/power-automate/overview-adaptive-cards)
- [Microsoft Teams connector reference](https://learn.microsoft.com/en-us/connectors/teams/)
