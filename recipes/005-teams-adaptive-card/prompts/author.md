# Author Recipe 005: Display a request with a Teams Adaptive Card

This authoring prompt was reconstructed from the established cookbook design
and verified implementation after the author-prompt convention was
introduced. It preserves the substantive authoring intent; it was not an
originally stored prompt.

## Purpose

Author:

```text
recipes/005-teams-adaptive-card/
    README.md
    prompts/author.md
    prompts/build.md
```

This is an authoring prompt, not a hands-on execution prompt. Do not execute
Recipe 005 or modify Microsoft resources while authoring it.

## Read first

Read `AGENTS.md`, `README.md`, `ROADMAP.md`,
`docs/cookbook-environment.md`, and the verified Recipes 001–004, including
their README files and author/build prompts. Treat Recipes 001–004 as the
current hands-on verified state.

Consult current first-party Microsoft documentation before selecting the
Teams connector action or Adaptive Card schema version. Distinguish behavior
verified in Recipes 001–004, behavior documented by Microsoft, and behavior
that Recipe 005 still needs to verify.

## Learning objective

Teach one narrow concept: display existing structured Northstar request data
in Microsoft Teams with a display-only Adaptive Card.

The workflow should remain approximately:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Post Adaptive Card to Teams
```

Use the current supported action name in the authored documentation. Select
the simplest action that posts a card without waiting for a response. Do not
teach approvals, buttons, assignments, bots, agents, or interactive business
processes.

## Existing resources and data boundary

Reuse the existing `Northstar IT Service Request` form, `DecisionForge
(default)` environment, existing flow, `Northstar` SharePoint site and `IT
Service Requests` list, `Northstar` Team, and `IT Service Requests` channel.
Do not create replacements or a second flow.

Use `Normalized Request` for `employeeName`, `requestType`, `description`,
and Boolean `isUrgent`. Render the Boolean as deterministic human-facing
`Yes` or `No`. If a Request ID is included, obtain it from SharePoint Create
item; do not invent a numbering scheme or duplicate normalization logic.

Keep the card small: a title and the Employee, Request Type, Description,
and Urgent fields. Use simple `TextBlock` and `FactSet` elements or an
equally understandable supported structure. Do not add images, logos,
decorative layouts, custom colors, unnecessary columns, or action buttons.

Select and document a schema version supported by the actual Teams/Power
Automate integration. The authored baseline is version `1.2` because it
supports the simple elements used here and is conservative across Teams
clients; hands-on execution must confirm the actual behavior.

Explain `$schema`, `type`, `version`, `body`, and the display elements without
hiding the lesson behind generated JSON or introducing a templating
framework.

## Recipe README

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

State that the recipe is authored and hands-on verification is pending. Link
the current first-party Microsoft guidance. Explain that the private Team
and channel control visibility, and that secrets and unnecessarily sensitive
data must not be put in cards. Explicitly explain why runtime AI is not
appropriate for deterministic rendering of known structured data.

## Build prompt

Create `recipes/005-teams-adaptive-card/prompts/build.md`. It must instruct
a future agent to:

1. Read the Recipe 005 README and relevant verified prior recipes.
2. Inspect the real environment before changing anything.
3. Reuse all existing Northstar resources.
4. Confirm the existing Recipe 004 five-step flow and Teams destination.
5. Confirm the current Teams connector exposes the authored display-only
   Adaptive Card action.
6. Follow current supported Microsoft behavior if the action name or UI
   differs, and document the difference.
7. Replace the Recipe 004 simple message with the minimum card behavior so a
   request is not posted twice.
8. Preserve Forms, normalization, SharePoint, and the existing schema.
9. Use normalized values for business fields and SharePoint output only for
   an optional persisted item ID.
10. Submit the Jordan Kim test request and verify the complete run, new
    SharePoint item, and visibly rendered Teams card.
11. Record actual current behavior and correct the README/build prompt only
    after successful hands-on verification.
12. Mark Recipe 005 hands-on verified only after end-to-end observation.
13. Stop without starting Recipe 006.

Carry forward Recipe 004's lesson that a successful Teams action may not
expose useful run inputs/outputs. The visible rendered card in `Northstar` /
`IT Service Requests` is required presentation evidence.

## Boundaries

Do not execute the recipe while authoring. Do not modify Forms, Power
Automate, SharePoint, Teams, Azure, Power Platform, OneDrive, or any other
Microsoft resource. Do not create another Team, channel, flow, form, or
list. Do not introduce approvals, response-waiting cards, file uploads,
Copilot Studio, Azure OpenAI, agents, Graph, Entra application work, or
runtime AI. Do not start Recipe 006.

## Test data

Use a new fictional request:

- Employee Name: `Jordan Kim`
- Request Type: `Hardware`
- Description: `My external monitor is not being detected by my workstation.`
- Urgent?: `Yes`

Expected normalized object:

```json
{
  "employeeName": "Jordan Kim",
  "requestType": "Hardware",
  "description": "My external monitor is not being detected by my workstation.",
  "isUrgent": true
}
```

Do not predict Forms response IDs, SharePoint item IDs, or Power Automate run
IDs.

## Roadmap and stop condition

Update `ROADMAP.md` only enough to record:

```text
Recipe 005: authored; hands-on verification pending
```

Do not change the established roadmap sequence. After the three Recipe 005
files are authored, stop and report what was created, the selected action and
schema version, planned fields, replacement decision, test data, assumptions
requiring hands-on verification, and that Recipes 005 and 006 were not
executed or started.
