# Recipe 003: Save the normalized request to a SharePoint list

**Status:** hands-on verified

## Business problem

Northstar can now inspect a Forms response and shape it into a small internal request representation. The next practical need is to persist that representation as structured business data that people can review later.

This recipe adds one SharePoint destination. It deliberately consumes the normalized request from Recipe 002 instead of coupling SharePoint directly to the Forms question fields.

## What you'll learn

You will create or reuse a small Northstar SharePoint site and an `IT Service Requests` list, then extend the verified flow with one **Create item** action. The action maps four normalized properties into typed SharePoint columns and verifies a real persisted item.

The boundary is:

```text
Microsoft Forms
    -> Northstar normalized request
    -> SharePoint storage
```

This is a deliberate, small data boundary—not a request to build a general domain model or SharePoint administration system.

## Microsoft technologies used

- Microsoft Forms
- Power Automate
- SharePoint / Microsoft Lists

## Prerequisites

- Recipe 001 is hands-on verified.
- Recipe 002 is hands-on verified.
- The form `Northstar IT Service Request` exists.
- The flow `Northstar IT Service Request - Inspect Response` exists in `DecisionForge (default)` and contains **When a new response is submitted**, **Get response details**, and **Normalized Request**.
- You can create or edit the minimum SharePoint resources required by this recipe.
- A browser is signed in with the intended Northstar account.

This recipe does not use Azure, Dataverse, OneDrive, Teams, Graph, or AI services.

## How it works

The existing flow already turns the Forms-oriented values into this verified logical object:

```json
{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}
```

Recipe 003 adds one SharePoint **Create item** action after **Normalized Request**:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> Create item
```

The SharePoint action must use the normalized object. It must not map the original Forms fields directly into storage.

## SharePoint design

Use the existing SharePoint site named `Northstar` when it is appropriate. If it does not exist, the build prompt creates only the minimum suitable Northstar team site. Do not create duplicate or department-specific sites.

In the verified Northstar environment, no suitable `Northstar` site existed, so the current SharePoint experience was used to create a private standard team site at `https://landopsdemo.sharepoint.com/sites/Northstar`. SharePoint also created its normal default site artifacts; no additional cookbook resources were added.

Use the list named `IT Service Requests`. Create it only when it is absent. The list contains exactly these business columns:

| Display name | SharePoint type | Values |
| --- | --- | --- |
| Employee Name | Single line of text | — |
| Request Type | Choice | Hardware, Software, Access, Other |
| Description | Multiple lines of text | — |
| Urgent | Yes/No | — |

SharePoint creates some system columns automatically, such as `Created` and `Modified`; do not add application-generated copies of them.

### Default Title column

SharePoint commonly creates a default `Title` column. Do not duplicate Employee Name into it, invent a request number, or create a synthetic title just to satisfy an unexplained requirement.

During the verified build, the default `Title` column was hidden from the primary view through **Column settings > Hide this column**. It was left blank and was not mapped by the flow. The saved flow and the real list item both succeeded without a fabricated Title value, so no duplicate Employee Name or synthetic request number was needed.

## Build steps

The executable procedure is preserved in [`prompts/build.md`](prompts/build.md). At a high level, it:

1. Reconfirms the existing Form, flow, environment, and Recipe 002 action.
2. Inspects and reuses or minimally creates the Northstar SharePoint site and list.
3. Configures only the four business columns and handles Title according to the observed current behavior.
4. Adds one **Create item** action after **Normalized Request**.
5. Maps the normalized properties with these expressions:

   ```text
   outputs('Normalized_Request')?['employeeName']
   outputs('Normalized_Request')?['requestType']
   outputs('Normalized_Request')?['description']
   outputs('Normalized_Request')?['isUrgent']
   ```

   The designer may expose the action as `Normalized Request` while its expression name is `Normalized_Request`. Use the existing action's generated name if it differs.

6. Saves the flow and verifies the run and actual SharePoint item.

## Security considerations

- SharePoint permissions control who can view or edit the stored requests.
- The Power Automate SharePoint connection acts through an authenticated Microsoft identity; keep that connection within the intended Northstar account and environment.
- Do not make business request data broadly accessible merely because it is stored in SharePoint.
- Use only fictional Northstar test data. Do not store passwords, secrets, tokens, keys, or connection strings in the recipe or list.

## Test it

Submit a new response through the existing Form:

- Employee Name: `Morgan Lee`
- Request Type: `Hardware`
- Description: `I need a replacement keyboard for my workstation.`
- Urgent?: `Yes`

Expected normalized object:

```json
{
  "employeeName": "Morgan Lee",
  "requestType": "Hardware",
  "description": "I need a replacement keyboard for my workstation.",
  "isUrgent": true
}
```

Expected SharePoint values:

| Column | Value |
| --- | --- |
| Employee Name | Morgan Lee |
| Request Type | Hardware |
| Description | I need a replacement keyboard for my workstation. |
| Urgent | Yes |

Inspect the complete successful run, the `Normalized Request` output, the `Create item` action, and the actual new list item. Confirm that `isUrgent` is Boolean `true` before it maps to the SharePoint Yes/No column.

## Common failure cases

- **The Northstar site or list is missing.** Inspect first, then create only the minimum resource required. Do not create duplicates.
- **The list has unexpected existing columns or data.** Do not destructively reshape it. Report the difference and take the smallest safe action.
- **Create item exposes raw Forms fields.** Do not use them. Use expressions that read from `Normalized Request`.
- **A normalized property is unavailable in dynamic content.** Use the expression editor with `outputs('Normalized_Request')?['propertyName']`; do not add Parse JSON or extra Compose actions merely to surface tokens.
- **The Urgent mapping is the wrong type.** Confirm that the normalized value is Boolean `true` or `false` and that the SharePoint destination is a Yes/No column.
- **SharePoint requires Title.** Inspect the current Title column settings and document the actual supported behavior. Do not duplicate Employee Name or invent a request number.
- **The browser closes during MFA.** Keep the Forms, Power Automate, and SharePoint tabs open while the user approves sign-in. Finish sign-in before opening replacement tabs.
- **The Microsoft UI differs.** Record the observed behavior and correct this README and `build.md` after successful verification. Do not claim verification from authored instructions alone.

## Why AI is not appropriate

AI is not needed at runtime. The workflow takes a known normalized object and maps known properties into known typed columns. Direct mapping is deterministic, predictable, and testable. An AI coding agent may help build the flow, but AI does not belong inside this runtime step.

## Next step

After this recipe is hands-on verified, continue to Recipe 004: create an archive file in OneDrive. Do not add OneDrive behavior to this flow during Recipe 003.

## Verification status

This recipe is hands-on verified in `DecisionForge (default)`. The site and list were created in the Northstar tenant, the test response was submitted, the complete flow run succeeded, `Normalized Request` produced the expected Boolean value, **Create item** returned HTTP 201 and item ID 1, and the reloaded SharePoint list visibly contained the expected item.

Observed verification:

```json
{
  "employeeName": "Morgan Lee",
  "requestType": "Hardware",
  "description": "I need a replacement keyboard for my workstation.",
  "isUrgent": true
}
```

The Forms trigger reported response ID `3`. The persisted SharePoint item was ID `1` with Employee Name `Morgan Lee`, Request Type `Hardware`, the submitted keyboard description, and Urgent `Yes`.

## Official references

- [Create a team site in SharePoint](https://support.microsoft.com/en-us/sharepoint/sites-in-sharepoint/create-a-team-site-in-sharepoint)
- [Create a list from the Lists app](https://support.microsoft.com/en-us/sharepoint/lists/create-a-list-from-the-lists-app)
- [List and library column types and options](https://support.microsoft.com/en-us/sharepoint/lists/data-and-lists/list-and-library-column-types-and-options)
- [Edit a list column](https://support.microsoft.com/en-us/sharepoint/lists/data-and-lists/edit-a-list-column)
- [SharePoint connector: Create item](https://learn.microsoft.com/en-us/connectors/sharepointonline/)
- [Reference for functions in workflow expressions](https://learn.microsoft.com/en-us/azure/logic-apps/expression-functions-reference)
