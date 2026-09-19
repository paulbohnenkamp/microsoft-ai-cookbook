# Author Recipe 006: Add service request tracking and management fields

This is the preserved authoring prompt for Recipe 006. It defines the design
to document; it does not authorize a hands-on Microsoft 365 run.

## Read first

Read `AGENTS.md`, `README.md`, `ROADMAP.md`,
`docs/cookbook-environment.md`, and the README, author prompt, and build prompt
for verified Recipes 001–005. Treat those recipes as the current Northstar
implementation. Consult current first-party Microsoft documentation for
SharePoint field types, SharePoint connector actions, Power Automate
expressions, and the Teams card action. Mark each behavior as documented,
previously observed, or pending Recipe 006 verification.

## Authoring goal

Create exactly:

```text
recipes/006-service-request-tracking/README.md
recipes/006-service-request-tracking/prompts/author.md
recipes/006-service-request-tracking/prompts/build.md
```

Recipe 006 teaches how to evolve the verified Northstar SharePoint-backed
workflow with operational tracking fields. Do not execute it, create Recipe
007, or change any Microsoft resource while authoring.

## Learning and data boundary

Explain three categories:

1. Requester-supplied data: Employee Name, Request Type, Description, and
   Urgent.
2. System-generated data: SharePoint item identity and the created timestamp.
3. Support-managed data: Status, Priority, Assigned To, and Assigned Date.

Keep the normalized request exactly as it is. Do not add Service Request ID,
Request Date, Status, Priority, Assigned To, or Assigned Date to the normalized
object. The lesson is to shape the input first, then add storage and
operational metadata at the appropriate boundary; KISS still applies.

## Design decisions to document

Use the existing `IT Service Requests` list and evaluate these fields:

- `Service Request ID`: Single line of text, derived from the SharePoint item
  ID after Create item and persisted with Update item.
- `Status`: Choice `New`, `In Progress`, `Resolved`, with default `New`.
- `Priority`: Choice `Low`, `Normal`, `High`, with initial default `Normal`.
  Keep it independent from the requester’s Urgent value.
- `Assigned To`: single Person or Group, blank in this recipe.
- `Assigned Date`: Date and Time, blank in this recipe.
- Do not add Request Date if the existing SharePoint `Created` metadata is
  sufficient.

Treat these as authored baseline decisions that the build run must verify in
the current UI and connector. If a capability or required-field behavior
differs, record the difference and adjust the documentation only after real
observation; do not invent a user, date, ID, or workaround.

Use this baseline expression, and verify its exact behavior hands-on:

```text
concat('SR-', formatNumber(outputs('Create_item')?['body/ID'], '000'))
```

Explain the tradeoff: persisting the readable ID requires an extra Update item
write, but makes support search, reporting, and later cards straightforward.

## Flow and card scope

The target flow is:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> SharePoint - Update item
    -> Microsoft Teams - Post card in a chat or channel
```

Extend the existing display-only card with Service Request ID, Status, and
Priority. Keep the existing requester fields. Omit blank assignment fields.
Do not add buttons, approvals, response waits, or assignment behavior.

Recipe 005 observed a Teams posting/display-name issue involving a value like
`botcards_sent_on_behalf_of_user_display_name`. Require the build prompt to
inspect the current supported posting identity and record the actual result.
Do not prescribe a bot, Graph, Entra, API, or other workaround.

## README requirements

Use the established eleven-section recipe structure: business problem, what
you’ll learn, technologies, prerequisites, how it works, build steps,
security, test it, failure cases, why AI is or is not appropriate, and next
steps. Clearly label the recipe `authored; hands-on verification pending`.
Include the field/type/default table, Created metadata decision, ID expression,
Update item rationale, card scope, security boundary, and first-party links.

## Build prompt requirements

The future execution prompt must instruct the agent to:

1. Inspect the real environment and confirm Recipes 001–005 and all existing
   Northstar resources before changing anything.
2. Inspect the current SharePoint list schema and Teams card/posting behavior.
3. Add only the selected fields; preserve the form, normalized object, and
   existing flow stages.
4. Create the list item, derive the ID from its actual item ID, update the
   item, and preserve defaults and existing values.
5. Extend the card only with the selected nonblank operational fields.
6. Submit the Taylor Morgan test response and verify the complete run, list
   item, ID, metadata, defaults, card, and sender/display identity.
7. Record observed IDs and timestamps rather than predicting them.
8. Correct the docs and mark the recipe hands-on verified only after end-to-end
   evidence.
9. Stop before Recipe 007.

If `Assigned To` or another field is required unexpectedly, do not fabricate
data or broaden scope; document the blocker and actual behavior.

## Test data

Use:

- Employee Name: `Taylor Morgan`
- Request Type: `Access`
- Description: `I need access to the Finance project SharePoint site.`
- Urgent?: `No`

Expected normalized object:

```json
{
  "employeeName": "Taylor Morgan",
  "requestType": "Access",
  "description": "I need access to the Finance project SharePoint site.",
  "isUrgent": false
}
```

## Boundaries and completion

Do not execute the recipe or modify Forms, Power Automate, SharePoint, Teams,
Azure, Power Platform, OneDrive, or any other service. Do not create Recipe
007. Update `ROADMAP.md` only enough to change Recipe 006 to:

```text
Recipe 006: authored; hands-on verification pending
```

Do not change the 001–020 sequence or the status of Recipes 001–005.

After authoring, report the created files, selected field types/defaults,
Created metadata decision, exact expression, persistence/update rationale,
card scope, display-name investigation, test data, assumptions requiring
hands-on verification, confirmation that no Microsoft work occurred, and that
Recipe 007 was not started.
