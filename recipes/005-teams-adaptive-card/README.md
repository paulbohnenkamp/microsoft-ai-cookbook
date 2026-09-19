# Recipe 005: Display a request with a Teams Adaptive Card

**Status:** hands-on verified

## Business problem

Northstar now has a working internal IT service-request workflow. A simple
Teams notification is useful, but the IT team needs a predictable visual
summary of each request. This recipe replaces that notification with a small
display-only Adaptive Card.

## What you'll learn

You will post structured data from an existing Power Automate flow to a
Microsoft Teams channel as an Adaptive Card. The card is presentation only;
it does not collect a response or start an approval process.

The new concept is:

```text
Normalized Request -> Adaptive Card -> Teams
```

## Microsoft technologies used

- Microsoft Forms
- Power Automate
- SharePoint
- Microsoft Teams
- Adaptive Cards

## Prerequisites

- Recipes 001–004 are complete in the Northstar environment.
- The existing `Northstar IT Service Request` form, flow, normalized request,
  `Northstar` SharePoint site and `IT Service Requests` list are available.
- The `Northstar` Team and `IT Service Requests` channel are available.
- Access to the `DecisionForge (default)` Power Platform environment.

Recipe 005 reuses these resources. It does not create a second flow, Team,
channel, form, list, or Power Platform environment.

## How it works

The flow remains one workflow:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
    -> Microsoft Teams - Post card in a chat or channel
```

The verified action is **Microsoft Teams — Post card in a chat or channel**.
It replaces Recipe 004's **Post message in a chat or channel** action so one
request does not create duplicate notifications. The current connector
exposes both a display card action and separate actions that wait for a
response; this recipe uses the display-only action and no buttons.

The card uses values from `Normalized Request`, not the original Forms
fields. If a Request ID is included, it comes from the output of SharePoint
**Create item**.

### Card JSON

The verified small payload uses Adaptive Card schema version `1.2`, a
conservative version for the Teams/Power Automate integration and for narrow
Teams clients. It uses only widely supported display elements:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.2",
  "body": [
    {
      "type": "TextBlock",
      "text": "New IT Service Request",
      "weight": "Bolder",
      "size": "Medium"
    },
    {
      "type": "FactSet",
      "facts": [
        { "title": "Employee", "value": "<employeeName>" },
        { "title": "Request Type", "value": "<requestType>" },
        { "title": "Description", "value": "<description>" },
        { "title": "Urgent", "value": "<Yes or No>" }
      ]
    }
  ]
}
```

`$schema` identifies the Adaptive Card schema, `type` identifies the card,
`version` selects the host-compatible schema version, and `body` contains the
elements rendered in the card. The Power Automate action receives dynamic
values in place of the placeholders. The exact designer field and expression
syntax must be confirmed during hands-on execution.

## Build steps

The checked-in execution prompt is [`prompts/build.md`](prompts/build.md).
It requires an agent to inspect the existing environment and flow, confirm
the current connector action, replace only the Recipe 004 Teams step, submit
a new test response, and verify the rendered card in the actual channel.

Do not execute this recipe from the authoring task.

## Security considerations

- The private `Northstar` Team and `IT Service Requests` channel determine who
  can see the request.
- Do not place passwords, secrets, tokens, connection strings, or
  unnecessarily sensitive information in a card.
- Keep the card limited to the four known request fields and an actual
  SharePoint item ID if that identifier is useful.
- Do not assume a successful Power Automate action proves that the card is
  visible; inspect the actual Teams channel.

## Test it

The hands-on test used this fictional request:

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

The card should visibly communicate **New IT Service Request**, Employee
`Jordan Kim`, Request Type `Hardware`, the submitted description, and Urgent
`Yes`. A Request ID is optional and must be the actual SharePoint Create item
result. Response IDs, item IDs, and run IDs must be observed rather than
predicted.

Observed verification in the Northstar environment:

- Forms response ID: `5`.
- The complete five-action flow run succeeded.
- `Normalized Request` produced the expected object with `isUrgent: true`.
- SharePoint item ID: `3`, with Jordan Kim, Hardware, the submitted monitor
  description, and Urgent `Yes`.
- The actual `Northstar` / `IT Service Requests` channel visibly rendered the
  card with the title and all four expected fields.

## Common failure cases

- **The display-only action is unavailable.** The current designer exposed
  **Post card in a chat or channel** alongside the response-waiting action.
  Inspect the current Teams connector and document the exact supported action
  before changing the recipe. Do not silently choose a wait-for-response
  action.
- **The card renders incorrectly.** Validate the JSON, keep the schema at the
  authored compatible version, and check the actual Teams rendering.
- **The card shows raw or blank values.** Use the normalized request outputs;
  do not map the Forms fields again or duplicate normalization logic.
- **The flow posts both a message and a card.** Replace the Recipe 004 Teams
  notification unless hands-on Microsoft behavior gives a strong reason not
  to.
- **The Teams action succeeds but run details are unhelpful.** Use the actual
  rendered card in `Northstar` / `IT Service Requests` as final presentation
  evidence, as Recipe 004 did for the simple message.
- **Authentication, MFA, permissions, or browser state blocks progress.** Ask
  for the smallest human action required and wait; never fabricate success.

## Why AI is not appropriate

Runtime AI is not needed. The workflow renders known structured data into a
known visual representation and deterministically chooses the destination
and `Yes`/`No` urgent display. An AI coding agent may help author the JSON or
configure the flow, but no model belongs in this runtime step.

## Next steps

After this recipe is hands-on verified, continue to Recipe 006: Putting It
Together: internal service request intake. Do not add approvals, buttons,
file handling, agents, or runtime AI here.

## Verification status

This recipe is hands-on verified in `DecisionForge (default)`. The existing
Form, flow, normalized request, SharePoint site/list, Team, and channel were
reused. The Recipe 004 simple message was replaced with **Post card in a chat
or channel**, configured as Flow bot -> Channel -> Northstar / IT Service
Requests. The current designer accepted inline `@{...}` expressions in the
Adaptive Card JSON, and the rendered card was visibly verified in Teams.

## Official references

- [Microsoft Teams connector](https://learn.microsoft.com/en-us/connectors/teams/)
- [Overview of adaptive cards for Microsoft Teams](https://learn.microsoft.com/en-us/power-automate/overview-adaptive-cards)
- [Create flows that post adaptive cards to Microsoft Teams](https://learn.microsoft.com/en-us/power-automate/create-adaptive-cards)
- [Adaptive Card schema explorer](https://learn.microsoft.com/en-us/adaptive-cards/schema-explorer/adaptive-card)
