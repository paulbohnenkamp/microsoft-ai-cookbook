# Author Recipe 004: Post a simple notification to Teams

## Purpose

Author the small Recipe 004 documentation set for the Microsoft Enterprise AI Cookbook:

```text
recipes/004-teams-notification/
    README.md
    prompts/author.md
    prompts/build.md
```

This prompt preserves the authoring intent for Recipe 004. It is an authoring prompt, not a hands-on execution prompt.

## Read first

Read:

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `docs/cookbook-environment.md`
- `recipes/001-forms-response/README.md`
- `recipes/001-forms-response/prompts/build.md`
- `recipes/002-normalize-request/README.md`
- `recipes/002-normalize-request/prompts/author.md`
- `recipes/002-normalize-request/prompts/build.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/003-sharepoint-list/prompts/author.md`
- `recipes/003-sharepoint-list/prompts/build.md`

Treat Recipes 001–003 as hands-on verified. Preserve their numbering, directories, content, and verified status.

Before finalizing the recipe, consult current first-party Microsoft documentation for the Teams connector action used to post a simple channel message. Distinguish documented behavior from the behavior that still requires hands-on verification.

## Learning objective

Teach one narrow concept: extending the existing verified Northstar request workflow with a simple Microsoft Teams notification.

The existing flow is:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
```

Recipe 004 extends it to:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Post notification to Teams
```

The notification must use the normalized request. Do not map raw Forms fields again.

## Teams design

Use the planned minimum destination:

- Team: `Northstar`
- Channel: `IT Service Requests`

The current documented action is **Microsoft Teams — Post message in a chat or channel** (`PostMessageToConversation`). Do not use an Adaptive Card action, approval action, bot, webhook, Graph call, or deprecated action merely because it is familiar. The exact designer fields and available posting identity remain pending hands-on verification.

The notification should contain only:

```text
New IT service request
Employee: <employeeName>
Request Type: <requestType>
Description: <description>
Urgent: <Yes or No>
```

Use a deterministic inline `if()` conversion for the Boolean urgent value if supported by the current designer. Do not add another action solely for formatting.

Do not include approvals, buttons, assignment, SLA logic, status management, AI classification, Adaptive Cards, or SharePoint-link construction.

## Authoring requirements

Create a concise README using the established structure:

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

The README must:

- state that Recipe 004 is authored and hands-on verification is pending;
- identify the current Teams action and link first-party documentation;
- distinguish verified prior behavior from pending Teams behavior;
- preserve the Recipe 003 flow and SharePoint schema;
- document that the Teams message uses normalized values;
- avoid claiming that the Team, channel, action, run, or message has been hands-on verified;
- state that Recipe 005 will teach Adaptive Cards.

Create a build prompt that later instructs an agent to:

1. Read the Recipe 004 README and relevant prior verified recipes.
2. Inspect the actual environment before changing anything.
3. Reuse the existing Form, flow, `DecisionForge (default)` environment, `Northstar` SharePoint site, and `IT Service Requests` list.
4. Confirm the verified Recipe 003 steps still exist in order.
5. Inspect whether the `Northstar` Team and `IT Service Requests` channel exist.
6. Create only missing minimum Teams resources.
7. Add only the current simple Teams message action after **Create item**.
8. Map from `Normalized Request`, not raw Forms fields.
9. Submit new fictional test data, not the Morgan Lee / response ID 3 test.
10. Verify the complete flow, SharePoint item, and actual Teams message.
11. Record the actual response ID and SharePoint item ID.
12. Correct README and build prompt for observed behavior only after successful verification.
13. Mark the recipe hands-on verified only after end-to-end observation.
14. Stop before Recipe 005.

## Test data

Use:

- Employee Name: `Alex Rivera`
- Request Type: `Software`
- Description: `I need the approved VPN client installed on my workstation.`
- Urgent?: `No`

Expected normalized object:

```json
{
  "employeeName": "Alex Rivera",
  "requestType": "Software",
  "description": "I need the approved VPN client installed on my workstation.",
  "isUrgent": false
}
```

The actual response ID and SharePoint item ID must be observed during execution.

## Boundaries

Do not execute Recipe 004 while authoring. Do not modify Forms, Power Automate, SharePoint, Teams, Azure, Power Platform, OneDrive, or any other Microsoft resource.

Do not create Recipe 005. Do not introduce Adaptive Cards, approvals, Copilot Studio, Azure OpenAI, agents, Graph, Entra application work, AI, file uploads, or speculative infrastructure.

## Roadmap and stop condition

Update `ROADMAP.md` only as necessary to record:

```text
Recipe 004: authored; hands-on verification pending
```

Do not change the refined recipe sequence. After creating the three Recipe 004 files and the minimal roadmap status update, stop.

## Final report

Report:

1. Files created and modified.
2. Exact Teams action selected for the authored recipe.
3. Planned Team and channel.
4. Notification fields.
5. Test data.
6. Assumptions requiring hands-on verification.
7. Confirmation Recipe 004 was not executed.
8. Confirmation Recipe 005 was not started.
9. The exact next execution prompt:

```text
Read and follow recipes/004-teams-notification/prompts/build.md exactly.
```
