# Recipe 004: Post a simple notification to Teams

**Status:** hands-on verified

## Business problem

Northstar now captures, shapes, and stores an internal IT service request. The IT team also needs to know when a new request has been submitted. This recipe extends the existing workflow with one simple Microsoft Teams channel notification.

## What you'll learn

You will add a Microsoft Teams **Post message in a chat or channel** action to the verified request flow. The message uses the normalized request rather than mapping the original Forms questions again.

This recipe introduces one significant new concept:

```text
Power Automate -> Microsoft Teams notification
```

It does not introduce Adaptive Cards, approvals, buttons, assignment, AI, or status management.

## Microsoft technologies used

- Microsoft Forms
- Power Automate
- SharePoint / Microsoft Lists
- Microsoft Teams

## Prerequisites

- Recipes 001, 002, and 003 are hands-on verified.
- The form `Northstar IT Service Request` exists.
- The flow `Northstar IT Service Request - Inspect Response` exists in `DecisionForge (default)` and contains:

  ```text
  When a new response is submitted
      -> Get response details
      -> Normalized Request
      -> SharePoint - Create item
  ```

- The `Northstar` SharePoint site and `IT Service Requests` list exist.
- A browser is signed in with the intended Northstar account.
- The minimum Teams destination is available or can be created: Team `Northstar`, channel `IT Service Requests`.

This recipe does not use OneDrive, Dataverse, Graph, Entra application registrations, Azure, AI services, agents, or Adaptive Cards.

## How it works

The target flow is:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Microsoft Teams - Post message in a chat or channel
```

The Teams message should communicate:

```text
New IT service request

Employee: <employeeName>
Request Type: <requestType>
Description: <description>
Urgent: <Yes or No>
```

The message should read the first three values from `Normalized Request`. For the human-facing urgent value, use the deterministic expression `if(<isUrgent>, 'Yes', 'No')` if the current designer accepts it inline; do not add another action merely to format the Boolean.

The message does not need to include the SharePoint item ID. The item is already persisted by Recipe 003, and adding a link or identifier would distract from the notification lesson.

## Teams destination

The planned destination is:

- Team: `Northstar`
- Channel: `IT Service Requests`

The build prompt must inspect the actual environment first. If either resource is missing, it may create only the minimum missing Team or channel required for this recipe. It must not create additional Teams, channels, apps, bots, webhooks, connectors, or Azure resources.

In the verified Northstar environment, the Team and channel were initially absent. The current Teams experience created a private `Northstar` Team and its first channel, `IT Service Requests`, with no additional members added.

The verified action is the current Microsoft Teams connector action **Post message in a chat or channel**. The saved configuration used **Post as: Flow bot**, **Post in: Channel**, Team `Northstar`, and channel `IT Service Requests`. The message editor accepted inline expressions from `Normalized Request`, including `if(outputs('Normalized_Request')?['isUrgent'], 'Yes', 'No')`.

## Build steps

The executable procedure is preserved in [`prompts/build.md`](prompts/build.md). At a high level, it:

1. Reconfirms the existing Form, flow, Power Platform environment, SharePoint site, and list.
2. Inspects the `Northstar` Team and `IT Service Requests` channel.
3. Creates only a missing minimum Teams resource when necessary.
4. Adds one **Post message in a chat or channel** action after **Create item**.
5. Maps the notification from `Normalized Request`, not raw Forms fields.
6. Saves, submits a new request, and verifies the flow, SharePoint item, and actual Teams message.

## Security considerations

- Keep the Team and channel membership limited to the intended Northstar IT audience.
- Do not post secrets, credentials, tokens, keys, connection strings, or sensitive personal data.
- Use only fictional Northstar test data.
- Do not broaden permissions or create public Teams resources merely to make testing easier.

## Test it

Use a new request so this run is distinct from earlier verification:

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

Expected SharePoint values:

| Column | Value |
| --- | --- |
| Employee Name | Alex Rivera |
| Request Type | Software |
| Description | I need the approved VPN client installed on my workstation. |
| Urgent | No |

Expected Teams notification in `Northstar` / `IT Service Requests`:

```text
New IT service request
Employee: Alex Rivera
Request Type: Software
Description: I need the approved VPN client installed on my workstation.
Urgent: No
```

The actual Forms response ID, SharePoint item ID, flow run result, and Teams message must be observed during hands-on execution. Do not predict or invent them.

## Common failure cases

- **The existing Form or flow is missing.** Confirm the signed-in account and `DecisionForge (default)`. Do not create replacements.
- **The SharePoint step is missing or changed.** Stop and report the difference before adding Teams behavior.
- **The Northstar Team or channel is missing.** Inspect first, then create only the minimum missing destination.
- **The Teams action exposes raw Forms values.** Do not use them. Use the normalized properties from `Normalized Request`.
- **The urgent value is shown as `true` or `false`.** Use the small deterministic `if()` expression in the message body if the current designer supports it. Do not use AI or add a formatting workflow.
- **The action name or fields differ.** Follow the current Microsoft Teams connector UI, record the observed terminology, and correct this README and `build.md` after successful verification.
- **Authentication, MFA, permissions, or browser state blocks progress.** Ask for the smallest human action required and wait. Do not claim success from authored instructions.

## Why AI is not appropriate

Runtime AI is not needed. The workflow sends known structured data to a known Teams destination after a request is submitted. A deterministic Teams action and a small `if()` expression are predictable, inexpensive, and testable. An AI coding agent may help build the flow, but AI does not belong inside this runtime step.

## Next step

After this recipe is hands-on verified, continue to Recipe 005: display a request with a Teams Adaptive Card. Do not add Adaptive Cards to this recipe.

## Verification status

This recipe is hands-on verified in `DecisionForge (default)`. The existing Form, flow, SharePoint site, and list were reused. A private `Northstar` Team and `IT Service Requests` channel were created, the flow was extended with **Post message in a chat or channel**, and the complete run succeeded.

Observed verification:

- Form response ID: `4` (Alex Rivera in the individual response view).
- Normalized output:

  ```json
  {
    "employeeName": "Alex Rivera",
    "requestType": "Software",
    "description": "I need the approved VPN client installed on my workstation.",
    "isUrgent": false
  }
  ```

- SharePoint item ID: `2`, with Employee Name `Alex Rivera`, Request Type `Software`, the submitted VPN-client description, and Urgent `No`.
- The actual Teams channel contained:

  ```text
  New IT service request
  Employee: Alex Rivera
  Request Type: Software
  Description: I need the approved VPN client installed on my workstation.
  Urgent: No
  ```

The Power Automate run showed all five actions as **Succeeded**. The Teams action displayed no run inputs or outputs in the current designer, so the visible channel message was used as the authoritative notification verification.

## Official references

- [Send a message in Teams using Power Automate](https://learn.microsoft.com/en-us/power-automate/teams/send-a-message-in-teams)
- [Microsoft Teams connector](https://learn.microsoft.com/en-us/connectors/teams/)
