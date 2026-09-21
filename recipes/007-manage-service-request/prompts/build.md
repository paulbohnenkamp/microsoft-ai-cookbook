# Build Recipe 007 in the Northstar environment

You are helping a reader perform Recipe 007 from this directory.

## Goal

Update one existing item in the `Northstar` SharePoint site's `IT Service
Requests` list. Do not create a second request.

Use the existing SharePoint list item form:

```text
find Service Request ID
    -> inspect the existing item
    -> edit operational fields
    -> save the same item
    -> verify the stored state
```

Do not create or modify a Power Automate flow. Do not update Teams. Recipe
006's Adaptive Card represents the request at intake time and is outside this
recipe's scope.

## Read first

Read:

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `docs/cookbook-environment.md`
- `recipes/007-manage-service-request/README.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/004-teams-notification/README.md`
- `recipes/005-teams-adaptive-card/README.md`
- `recipes/006-service-request-tracking/README.md`

Read the current Microsoft guidance linked by the Recipe 007 README before
relying on remembered list navigation or column behavior.

## Authentication and safety

Inspect the current SharePoint session before changing anything. Preserve the
browser session if a human must complete MFA. Do not request or handle
passwords, tokens, keys, secrets, or connection strings.

Do not modify Forms, Power Automate, Teams, Azure, Power Platform, Power Apps,
Power BI, Graph, or AI resources. Do not start Recipe 008.

## Inspect before editing

1. Confirm Recipes 001–006 are hands-on verified in the repository.
2. Confirm the `Northstar` SharePoint site and `IT Service Requests` list
   exist.
3. Confirm the list contains these fields with the Recipe 006 design:
   `Employee Name`, `Request Type`, `Description`, `Urgent`, `Service Request
   ID`, `Status`, `Priority`, `Assigned To`, and `Assigned Date`.
4. Confirm `Created`, `Modified`, and `Modified By` are available as standard
   SharePoint metadata or can be shown in the current view.
5. Find the test item by `Service Request ID`. Prefer `SR-004`.
6. Inspect the item before editing. Record its SharePoint item ID, Service
   Request ID, requester fields, operational fields, and `Created` value.
7. If `SR-004` is missing or differs from the expected state, do not reset it.
   Choose another suitable existing test item or create a fresh test record
   through the already-verified Recipe 006 intake path only if necessary.

## Perform the lifecycle update

Use the current SharePoint list experience to edit one item. Microsoft’s
current list guidance uses the item form from the list view and requires edit
permission.

1. Open the item identified by its `Service Request ID`.
2. Confirm that `Employee Name`, `Request Type`, `Description`, and `Urgent`
   match the pre-edit values.
3. Leave those four requester-supplied fields unchanged.
4. Leave `Service Request ID` unchanged.
5. Set `Status` to `In Progress`.
6. Set `Priority` to `High`.
7. Select an actual appropriate tenant support user in `Assigned To`.
   Prefer the signed-in support user only when that user is an approved
   assignee. If a human must identify the correct user, stop and request that
   smallest action.
8. Set `Assigned Date` to the current assignment date and time shown by the
   SharePoint form. Do not use the item's `Created` value.
9. Save the item.

This recipe intentionally enters the assignment timestamp in the item form.
It does not add a flow to detect modifications or write the same item again.
If the item is edited later for another reason, do not overwrite an existing
`Assigned Date`.

## Required verification

Open the saved item and verify all of the following from the actual list:

- The SharePoint item ID before and after is identical.
- `Service Request ID` before and after is identical.
- `Employee Name`, `Request Type`, `Description`, and `Urgent` are unchanged.
- `Status` is `In Progress`.
- `Priority` is `High`.
- `Assigned To` contains the actual selected tenant user.
- `Assigned Date` contains the timestamp entered at assignment time.
- `Created` is unchanged.
- `Modified` is later than the original `Modified` value.
- `Modified By` reflects the user who saved the management edit.
- No second list item was created.

Record actual values. Do not predict an assignee, timestamp, item ID, or
metadata value.

## Documentation correction

Only after successful hands-on verification, update this README and this
build prompt with observed SharePoint navigation, Person or Group behavior,
date/time behavior, permissions or authentication issues, actual before and
after values, item identity, and metadata. Mark Recipe 007 hands-on verified
only after the same item and all required field boundaries are observed.

If actual Microsoft behavior differs from this design, preserve the learning
objective and document the smallest supported correction. Do not add a flow,
Power Apps app, Teams synchronization, reporting, or another service to work
around a minor UI difference.

## Stop condition

Stop after the verification report. Do not begin Recipe 008.

## Observed verification

The existing `Northstar` SharePoint site's `IT Service Requests` list was
updated through the direct item form. The live `Priority` column was inspected
before editing and contained `Low`, `Normal`, and unintended `Choice 3`. The
existing third choice was corrected in place to `High`, and reopening the
column definition verified exactly `Low`, `Normal`, and `High` with default
`Normal`. Existing list items were preserved.

For the lifecycle update, SharePoint item ID `4` and Service Request ID
`SR-004` remained unchanged. The saved values were:

- Employee Name: Taylor Morgan
- Request Type: Access
- Description: `I need access to the Finance project SharePoint site.`
- Urgent: No
- Status: In Progress
- Priority: High
- Assigned To: Paul Bohnenkamp
- Assigned Date: `9/20/2026 6:44 PM` in the list's Pacific display time

The observed standard metadata was `Created` `9/19/2026 10:58 AM`, `Modified`
`9/20/2026 6:45 PM`, and `Modified By` Paul Bohnenkamp. The list still had four
items, confirming that no duplicate was created. Requester-supplied data was
unchanged. Recipe 007 is hands-on verified. Recipe 008 was not started.

## Completion report

Report:

- The SharePoint site and list reused.
- The exact mechanism used to update the item.
- The item’s Service Request ID and SharePoint item ID before and after.
- The requester-supplied values before and after.
- Status, Priority, Assigned To, and Assigned Date before and after.
- Created, Modified, and Modified By values that were observed.
- Confirmation that no duplicate item was created.
- Any authentication, permission, or UI differences.
- Files changed.
- Confirmation that Recipe 008 was not started.
