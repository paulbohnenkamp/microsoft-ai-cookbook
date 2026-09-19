# Build Recipe 004 in the Northstar environment

You are helping a reader perform Recipe 004 from this directory.

## Goal

Extend the hands-on verified Recipe 003 flow with one Microsoft Teams message action:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Microsoft Teams - Post message in a chat or channel
```

Notify the IT team about a new request. Use the normalized request. Do not normalize again and do not map raw Forms fields directly into Teams.

## Read first

Read:

- `AGENTS.md`
- `recipes/004-teams-notification/README.md`
- `recipes/001-forms-response/README.md`
- `recipes/002-normalize-request/README.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/003-sharepoint-list/prompts/build.md`

Inspect the actual repository and available capabilities.

## Capability boundary

If you can safely interact with the current Microsoft Forms, Power Automate, SharePoint, Microsoft Lists, and Teams web experiences, perform the approved steps. If you cannot, give the human the smallest exact UI action needed and wait.

Do not request or handle passwords, client secrets, access tokens, API keys, connection strings, or other credentials. Never claim that a Team, channel, action, run, SharePoint item, or Teams message exists unless you inspected it.

## Scope and guardrails

- Use the existing Northstar tenant and `DecisionForge (default)` Power Platform environment.
- Reuse `Northstar IT Service Request`.
- Reuse `Northstar IT Service Request - Inspect Response`.
- Reuse the existing `Northstar` SharePoint site and `IT Service Requests` list.
- Do not create another Form or flow.
- Add only one Microsoft Teams **Post message in a chat or channel** action after SharePoint **Create item**.
- Use the minimum Team and channel resources required: Team `Northstar`, channel `IT Service Requests`.
- Do not create or modify Azure resources, including `rg-northstar`.
- Do not create or modify OneDrive, Dataverse, Graph, AI, Foundry, networking, databases, hosting, or future recipe resources.
- Do not add Adaptive Cards, approvals, buttons, assignment, SLA logic, status fields, request IDs, webhooks, bots, or extra formatting actions.
- Do not change the Form, normalized object, or SharePoint schema.
- Do not begin Recipe 005.

## Inspect before changing anything

1. Confirm that Recipes 001, 002, and 003 are hands-on verified in the repository.
2. Confirm that `Northstar IT Service Request` still exists with only Employee Name, Request Type, Description, and Urgent?.
3. Confirm that `Northstar IT Service Request - Inspect Response` exists in `DecisionForge (default)`.
4. Confirm the existing flow contains, in order:

   ```text
   When a new response is submitted
       -> Get response details
       -> Normalized Request
       -> SharePoint - Create item
   ```

5. If the Form, flow, environment, SharePoint site, or list is missing, stop and report the exact missing resource. Do not create replacements.
6. Inspect whether the `Northstar` Team exists.
7. Inspect whether its `IT Service Requests` channel exists.

## Create or reuse the Teams destination

1. Reuse the existing `Northstar` Team when it is suitable.
2. If it is absent, create only the minimum Team required by this recipe using the current Microsoft Teams experience.
3. Reuse the existing `IT Service Requests` channel when it exists.
4. If it is absent, create only that channel in the `Northstar` Team.
5. Do not create additional Teams, channels, apps, bots, webhooks, connectors, or unrelated content.
6. Do not assume that the Team or channel exists from the roadmap alone; inspect it.

## Extend the verified flow

1. Open the existing flow in `DecisionForge (default)`.
2. Confirm the Recipe 003 **Create item** action still succeeds from the normalized request.
3. Add the current Microsoft Teams connector action **Post message in a chat or channel** after **Create item**. Do not use an Adaptive Card action.
4. Configure it for the `Northstar` Team and `IT Service Requests` channel. Use the simplest supported posting identity and content type exposed by the current designer; record the actual choices.
5. Compose the message from `Normalized Request` only:

   ```text
   New IT service request
   Employee: <employeeName>
   Request Type: <requestType>
   Description: <description>
   Urgent: <Yes or No>
   ```

   Use the normalized `employeeName`, `requestType`, and `description` values. For `Urgent`, use the normalized Boolean with the deterministic inline expression `if(<isUrgent>, 'Yes', 'No')` if the current designer supports it. Otherwise preserve the Boolean and document the observed behavior.

6. Do not select the original Forms dynamic-content fields.
7. Do not add a Compose action, Parse JSON, variable, Adaptive Card, approval, or artificial SharePoint identifier just to build the message.
8. Save the flow.

## Required test

Submit a new response through the existing Form:

- Employee Name: `Alex Rivera`
- Request Type: `Software`
- Description: `I need the approved VPN client installed on my workstation.`
- Urgent?: `No`

Do not reuse Morgan Lee / response ID 3 as the new test.

## Required verification

Inspect the actual latest run, SharePoint list item, and Teams channel. Confirm:

- The new Form response was received.
- **When a new response is submitted** succeeded.
- **Get response details** succeeded.
- **Normalized Request** succeeded and produced exactly:

  ```json
  {
    "employeeName": "Alex Rivera",
    "requestType": "Software",
    "description": "I need the approved VPN client installed on my workstation.",
    "isUrgent": false
  }
  ```

- **Create item** succeeded.
- The complete flow run succeeded through **Post message in a chat or channel**.
- A new actual SharePoint item exists with:
  - Employee Name: Alex Rivera
  - Request Type: Software
  - Description: I need the approved VPN client installed on my workstation.
  - Urgent: No
- The actual `Northstar` / `IT Service Requests` channel contains the expected notification:

  ```text
  New IT service request
  Employee: Alex Rivera
  Request Type: Software
  Description: I need the approved VPN client installed on my workstation.
  Urgent: No
  ```

Record the actual Forms response ID and SharePoint item ID. Do not predict them.

## Authentication and human interaction

- Keep Forms, Power Automate, SharePoint, and Teams tabs open while the user completes mobile MFA.
- If the browser closes during MFA, finish sign-in before opening replacement tabs.
- If a human must approve MFA or perform a UI action, explain the smallest exact action necessary and wait.
- Continue only from the actual resulting state. Do not infer success.

## Documentation correction

After successful verification, update only `recipes/004-teams-notification/README.md` and this `build.md` with observed Microsoft behavior that was unclear or wrong. Preserve the narrow notification objective.

Record:

- actual Team and channel state;
- the exact action label and posting configuration shown by the current designer;
- whether inline Boolean-to-Yes/No formatting worked;
- any authentication, MFA, redirect, connector, permissions, or browser behavior;
- actual response ID, SharePoint item ID, complete run result, and visible Teams message.

The verified current behavior for this environment is:

- The `Northstar` Team and `IT Service Requests` channel were absent. The current Teams experience created a private `Northstar` Team with `IT Service Requests` as its first channel; no additional members were added.
- The current Power Automate action is **Post message in a chat or channel**. The saved configuration used **Post as: Flow bot**, **Post in: Channel**, Team `Northstar`, and channel `IT Service Requests`.
- The message editor accepted expressions inserted through its `/` menu and expression editor. The saved message used `outputs('Normalized_Request')?['employeeName']`, `outputs('Normalized_Request')?['requestType']`, `outputs('Normalized_Request')?['description']`, and `if(outputs('Normalized_Request')?['isUrgent'], 'Yes', 'No')`.
- The test response was Alex Rivera / Software / `I need the approved VPN client installed on my workstation.` / No. The Form individual response view showed response ID `4`.
- The complete flow run succeeded through all five actions. SharePoint **Create item** returned HTTP 201 and item ID `2`.
- The current designer showed no run inputs or outputs for the Teams action, so the visible message in the actual `Northstar` / `IT Service Requests` channel was used to verify the notification.

Mark Recipe 004 **hands-on verified** only after the complete run, real SharePoint item, and actual Teams message have all been inspected. Those checks are now complete for this environment.

## Stop condition

Stop after the end-to-end verification report. Do not create Adaptive Cards or begin Recipe 005.

## Completion report

Report:

- What was reused and what was created.
- Microsoft environment used.
- Team and channel used.
- Exact Teams action and posting configuration.
- Notification fields and actual message.
- Actual Form response ID and SharePoint item ID.
- Whether the complete flow run succeeded.
- Actual normalized output and persisted SharePoint values.
- Confirmation that Teams used normalized data, not raw Forms fields.
- Any UI, authentication, redirect, connector, permissions, or expression issues.
- Documentation corrections made.
- Any human action still required.

Then stop. Do not begin Recipe 005.
