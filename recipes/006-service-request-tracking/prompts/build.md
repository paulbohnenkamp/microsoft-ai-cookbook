# Build Recipe 006 in the Northstar environment

This is a future hands-on execution prompt. Do not execute it while
authoring Recipe 006.

## Goal

Evolve the existing Northstar flow and `IT Service Requests` SharePoint list
to track operational metadata while preserving the verified normalized request:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> SharePoint - Update item
    -> Microsoft Teams - Post card in a chat or channel
```

Use the existing `Northstar IT Service Request` form, Northstar flow,
`Northstar` SharePoint site/list, `Northstar` Team, and `IT Service Requests`
channel in `DecisionForge (default)`. Do not create replacements.

## Read first

Read this README, `AGENTS.md`, `README.md`, `ROADMAP.md`,
`docs/cookbook-environment.md`, and the verified Recipes 001–005. Consult the
current Microsoft documentation linked by the README before relying on an
action name or field behavior.

## Authentication and safety

Inspect the current environment before changing it. Keep the Forms, Power
Automate, SharePoint, and Teams sessions available while a human completes
mobile MFA; do not kill an active browser session. Never request or handle
passwords, tokens, keys, secrets, or connection strings. If a required
resource is missing or the flow has drifted, stop and report the difference.

Do not modify Azure, Power Platform environments, Forms questions, the
normalized object, or unrelated resources. Do not begin Recipe 007.

## Inspect before changing

1. Confirm Recipes 001–005 are hands-on verified in the repository.
2. Confirm the form still has only Employee Name, Request Type, Description,
   and Urgent?.
3. Confirm the existing list has the four requester fields and inspect its
   actual internal/display names and required settings.
4. Confirm the flow still contains the verified Forms, normalization, Create
   item, and Teams card stages.
5. Confirm the Northstar Team and IT Service Requests channel.
6. Confirm the current SharePoint connector exposes Create item and Update
   item, and the Teams connector exposes the current display-only card action.

## Configure the list

Add only these fields, using the current UI and recording any difference:

| Field | Type | Value in this recipe |
| --- | --- | --- |
| Service Request ID | Single line of text | Filled after Create item |
| Status | Choice: New, In Progress, Resolved | Default New |
| Priority | Choice: Low, Normal, High | Default Normal |
| Assigned To | Person or Group, single value | Blank |
| Assigned Date | Date and Time | Blank |

Use the existing SharePoint `Created` metadata as Request Date; do not add a
duplicate custom date field. Leave assignment fields blank rather than
inventing a person or timestamp. If the current list/connector requires an
unexpected value, stop and record it instead of broadening scope.

## Configure the flow

1. Preserve the existing Forms trigger, Get response details, and Normalized
   Request action. The normalized output must remain exactly:

   ```json
   {
     "employeeName": "...",
     "requestType": "...",
     "description": "...",
     "isUrgent": true
   }
   ```

2. Preserve the existing Create item mappings and allow the list defaults to
   set Status and Priority.
3. Add one SharePoint Update item action using the actual integer ID returned
   by Create item. Map existing fields and defaults without overwriting them.
4. Populate Service Request ID with this baseline expression:

   ```text
   concat('SR-', formatNumber(outputs('Create_item')?['body/ID'], '000'))
   ```

   Verify the action name and expression editor in the current designer. If
   the actual action name differs, use the current supported reference and
   record it. Do not predict the resulting ID.
5. Extend the existing display-only Adaptive Card with Service Request ID,
   Status, and Priority. Keep Employee, Request Type, Description, and Urgent.
   Do not display blank Assigned To or Assigned Date fields. Do not add
   buttons, approvals, response waits, or duplicate notifications.
6. Inspect the Teams posting identity and the display-name behavior observed
   in Recipe 005. Use only supported current action settings; do not add a
   bot, Graph, Entra app, API, or workaround merely to change the sender.

## Required test

Submit a new response through the existing form:

- Employee Name: `Taylor Morgan`
- Request Type: `Access`
- Description: `I need access to the Finance project SharePoint site.`
- Urgent?: `No`

Do not predict the Forms response ID, flow run ID, SharePoint item ID, or
timestamp.

## Required verification

Verify the latest complete run and record actual evidence:

- Forms trigger and Get response details succeeded.
- Normalized Request produced the exact expected object:

  ```json
  {
    "employeeName": "Taylor Morgan",
    "requestType": "Access",
    "description": "I need access to the Finance project SharePoint site.",
    "isUrgent": false
  }
  ```

- Create item succeeded with the four requester values and expected defaults.
- Update item succeeded against the actual item ID.
- The persisted Service Request ID exactly matches the observed item ID and
  authored expression.
- SharePoint Created metadata is visible and no duplicate Request Date was
  added.
- Assigned To and Assigned Date remain blank.
- The Teams card visibly shows the selected fields and no blank assignment
  placeholders.
- The actual Teams sender/display name is recorded, including any remaining
  `botcards_sent_on_behalf_of_user_display_name`-style behavior.

Record response ID, run ID, item ID, request ID, timestamps, action labels,
field types/defaults, posting configuration, and rendered-card behavior. If
the connector exposes no useful Teams output, use the visible rendered card
as presentation evidence.

## Documentation and stop condition

Only after successful end-to-end verification, update this README and build
prompt with observed action names, field behavior, expression behavior,
authentication/permission issues, IDs, and results. Mark Recipe 006
hands-on verified only when the full run, list item, and card are observed.

Stop after the verification report. Do not create or start Recipe 007.
