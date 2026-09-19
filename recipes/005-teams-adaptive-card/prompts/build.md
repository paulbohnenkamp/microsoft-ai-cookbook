# Build Recipe 005 in the Northstar environment

You are helping a reader perform Recipe 005 from this directory.

## Goal

Replace the Recipe 004 simple Teams notification with one display-only
Adaptive Card action in the existing flow:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Microsoft Teams - Post card in a chat or channel
```

The authored action is **Microsoft Teams — Post card in a chat or channel**.
Confirm that exact action, or record the current supported equivalent, before
changing the flow. Do not use an action that waits for a response.

## Read first

Read this README, `AGENTS.md`, and the verified Recipes 001–004, especially
Recipes 003 and 004. Inspect the actual repository and available capabilities.

## Capability and authentication boundary

If you can safely interact with the current Microsoft Forms, Power Automate,
SharePoint, Microsoft Lists, and Teams experiences, perform the approved
steps. Otherwise give the human the smallest exact UI action needed and wait.
Do not request or handle passwords, secrets, tokens, keys, or connection
strings. Never claim a resource, run, SharePoint item, or rendered card
exists unless you inspected it.

Keep Forms, Power Automate, SharePoint, and Teams tabs open while the human
completes mobile MFA. If browser state is lost, finish sign-in before opening
replacement tabs and continue from the resulting state. Do not recreate
resources unnecessarily.

## Scope and guardrails

- Reuse `DecisionForge (default)` and the existing Northstar tenant.
- Reuse the existing Form, flow, normalized request, SharePoint site/list,
  `Northstar` Team, and `IT Service Requests` channel.
- Confirm the Recipe 004 five-step flow still works before changing it.
- Replace only the Recipe 004 **Post message in a chat or channel** action;
  do not leave both actions posting for every request unless current
  Microsoft behavior gives a strong documented reason.
- Do not create another Form, flow, Team, channel, list, environment, or
  Azure resource.
- Do not change the Form schema, normalized request schema, SharePoint list
  schema, or earlier flow behavior.
- Do not add approvals, buttons, response waits, assignment, file uploads,
  OneDrive, Dataverse, Graph, Entra application work, Copilot Studio, Azure
  OpenAI, agents, monitoring, or runtime AI.
- Do not begin Recipe 006.

## Inspect before changing anything

1. Confirm Recipes 001–004 are hands-on verified in the repository.
2. Confirm the existing Form still has only Employee Name, Request Type,
   Description, and Urgent?.
3. Confirm the existing flow is in `DecisionForge (default)` and contains:

   ```text
   When a new response is submitted
       -> Get response details
       -> Normalized Request
       -> SharePoint - Create item
       -> Post message in a chat or channel
   ```

4. Confirm the `Northstar` Team and `IT Service Requests` channel exist.
5. Confirm the current Teams connector exposes **Post card in a chat or
   channel** or document the exact supported current equivalent.
6. If a required existing resource is missing or the flow has drifted,
   stop and report the difference before creating or changing anything.

## Configure the card

1. Open the existing flow and preserve all Forms, normalization, and
   SharePoint actions.
2. Replace the simple Teams message action with the current display-only
   Adaptive Card action for Team `Northstar` and channel `IT Service
   Requests`.
3. Use the minimum supported card payload. The authored baseline is schema
   version `1.2` and uses a title `TextBlock` plus a `FactSet` for Employee,
   Request Type, Description, and Urgent. Do not add action buttons.
4. Map business values from `Normalized Request`, not the original Forms
   fields:

   ```text
   employeeName
   requestType
   description
   isUrgent -> Yes / No for display
   ```

5. If Request ID is included, obtain it from SharePoint **Create item**. Do
   not invent an ID.
6. Save the flow. If the current action name, schema support, or expression
   editor differs, use the current supported behavior and record the exact
   difference for documentation correction after verification.

## Required test

Submit a new response through the existing Form:

- Employee Name: `Jordan Kim`
- Request Type: `Hardware`
- Description: `My external monitor is not being detected by my workstation.`
- Urgent?: `Yes`

Do not predict the Forms response ID, SharePoint item ID, or flow run ID.

## Required verification

Verify the complete latest run:

- The Forms trigger succeeded and received the new response.
- **Get response details** succeeded.
- **Normalized Request** produced:

  ```json
  {
    "employeeName": "Jordan Kim",
    "requestType": "Hardware",
    "description": "My external monitor is not being detected by my workstation.",
    "isUrgent": true
  }
  ```

- SharePoint **Create item** succeeded and contains the expected four values.
- The final Teams card action succeeded.
- The actual rendered card is visible in `Northstar` / `IT Service Requests`
  and shows the expected employee, request type, description, and `Yes`
  urgent value.

If Power Automate exposes no useful Teams run inputs or outputs, do not treat
that alone as failure. The visible rendered card is the required final
presentation evidence, as established by Recipe 004.

Record actual response ID, SharePoint item ID, run result, action label,
posting configuration, and rendered card behavior. Do not invent any value.

## Security and AI boundary

The private Team and channel determine who can see the request. Do not put
secrets, credentials, tokens, or unnecessarily sensitive data in the card.
Runtime AI is not part of this recipe because it would add no value to
deterministically render known structured data.

## Documentation correction and completion

Only after successful end-to-end verification, update this README and this
build prompt with observed current action names, UI behavior, schema support,
authentication or permissions issues, actual IDs, run result, and visible
card evidence. Mark Recipe 005 **hands-on verified** only then.

Stop after the verification report. Do not start Recipe 006.

## Observed verification

This recipe has been hands-on verified in the Northstar environment. The
current designer exposed **Post card in a chat or channel** and accepted the
schema `1.2` payload with inline `@{...}` expressions. The saved posting
configuration was **Post as: Flow bot**, **Post in: Channel**, Team
`Northstar`, and channel `IT Service Requests`.

The Jordan Kim test produced Forms response ID `5`, SharePoint item ID `3`,
and a successful run through all five actions. `Normalized Request` produced
the expected Boolean `isUrgent: true`. The actual Teams channel visibly
rendered the Adaptive Card with the expected title, employee, request type,
description, and `Urgent: Yes`. The simple Recipe 004 message was replaced,
so the test produced one card notification rather than a duplicate message
and card.
