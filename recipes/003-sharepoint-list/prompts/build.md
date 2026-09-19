# Build Recipe 003 in the Northstar environment

You are helping a reader perform Recipe 003 from this directory.

## Goal

Extend the hands-on verified Recipe 002 flow with one SharePoint **Create item** action:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
    -> SharePoint - Create item
```

Persist the normalized request. Do not normalize again and do not map raw Forms fields directly into SharePoint.

## Read first

Read:

- `AGENTS.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/002-normalize-request/README.md`
- `recipes/002-normalize-request/prompts/build.md`

Inspect the actual repository and the capabilities available in this agent environment.

## Capability boundary

If you can safely interact with the current Microsoft Forms, Power Automate, SharePoint, and Microsoft Lists web experiences, you may perform the approved steps. If you cannot, give the human the smallest exact UI action needed and wait.

Do not request or handle passwords, client secrets, access tokens, API keys, connection strings, or other credentials. Never claim that a site, list, flow action, run, or list item exists unless you inspected it.

## Scope and guardrails

- Use the existing Northstar tenant and `DecisionForge (default)` Power Platform environment.
- Reuse `Northstar IT Service Request`.
- Reuse `Northstar IT Service Request - Inspect Response`.
- Do not create another Form or flow.
- Add only one SharePoint **Create item** action after **Normalized Request**.
- Use the existing Northstar SharePoint site if it is suitable; otherwise create only the minimum site required by this recipe.
- Use the existing `IT Service Requests` list if it matches the intended design; otherwise create it if absent.
- Do not destructively change a list that contains real data without understanding the difference.
- Do not create or modify Azure resources, including `rg-northstar`.
- Do not create or modify OneDrive, Teams, Dataverse, Graph, AI, Foundry, networking, databases, hosting, or future recipe resources.
- Do not add Parse JSON, variables, conditions, extra Compose actions, request IDs, status fields, approval fields, or other future concepts.
- Do not begin Recipe 004.

## Inspect before changing anything

1. Confirm that Recipe 001 and Recipe 002 remain hands-on verified in the repository.
2. Confirm that `Northstar IT Service Request` still exists with only:
   - Employee Name
   - Request Type: Hardware, Software, Access, or Other
   - Description
   - Urgent?: Yes or No
3. Confirm that `Northstar IT Service Request - Inspect Response` exists in `DecisionForge (default)`.
4. Confirm that the existing flow contains, in order:

   ```text
   When a new response is submitted
       -> Get response details
       -> Normalized Request
   ```

5. If the Form or flow is missing, stop and report the exact missing resource. Do not create a replacement.
6. In SharePoint or Microsoft Lists, inspect whether a suitable site named `Northstar` exists.
7. Inspect whether `IT Service Requests` exists in that site and whether its current structure matches this recipe.

## Create or reuse the SharePoint destination

1. Reuse the existing `Northstar` site when it is appropriate for this cookbook.
2. If it is absent, create only a minimal Northstar team site using the current SharePoint experience. Do not create a department-specific site, broad intranet, Teams team, or unrelated content.
3. Reuse `IT Service Requests` when it exists and matches the intended design.
4. If the list is absent, create it from scratch in the Northstar site.
5. Configure only these business columns:

   | Display name | Type | Configuration |
   | --- | --- | --- |
   | Employee Name | Single line of text | The normalized employee name |
   | Request Type | Choice | Hardware, Software, Access, Other |
   | Description | Multiple lines of text | The normalized description |
   | Urgent | Yes/No | The normalized Boolean |

6. Keep standard SharePoint system metadata such as Created and Modified. Do not add application-generated duplicates.

### Handle the default Title column deliberately

SharePoint may create a default `Title` column. Inspect its current settings instead of assuming old behavior.

- If the current UI permits making Title optional and hiding it from the primary view, do that.
- If current SharePoint requires Title for item creation or does not permit that treatment, preserve the smallest supported configuration and document exactly what the UI required.
- Do not duplicate Employee Name into Title.
- Do not invent a synthetic title or request number.
- Do not delete or rename an existing Title column when that could affect existing data.

## Extend the verified flow

1. Open the existing flow in `DecisionForge (default)`.
2. Add one SharePoint **Create item** action after **Normalized Request**.
3. Select the Northstar site and `IT Service Requests` list.
4. Map only from the `Normalized Request` output. Do not select the original Forms dynamic-content fields.
5. If the current designer does not surface the properties as dynamic-content tokens, use the expression editor with the action's generated internal name:

   ```text
   outputs('Normalized_Request')?['employeeName']
   outputs('Normalized_Request')?['requestType']
   outputs('Normalized_Request')?['description']
   outputs('Normalized_Request')?['isUrgent']
   ```

   Map these expressions respectively to:

   - SharePoint `Employee Name`
   - SharePoint `Request Type`
   - SharePoint `Description`
   - SharePoint `Urgent`

   If the designer generated a different internal action name, use that generated name while preserving the same property access.
6. Do not add Parse JSON or another action just to make these properties appear.
7. Save the flow.

## Required test

Submit a new response through the existing Form:

- Employee Name: `Morgan Lee`
- Request Type: `Hardware`
- Description: `I need a replacement keyboard for my workstation.`
- Urgent?: `Yes`

## Required verification

Inspect the latest run and the list. Confirm all of the following from actual Microsoft output:

- The Form response was received.
- **When a new response is submitted** succeeded.
- **Get response details** succeeded.
- **Normalized Request** succeeded and produced exactly:

  ```json
  {
    "employeeName": "Morgan Lee",
    "requestType": "Hardware",
    "description": "I need a replacement keyboard for my workstation.",
    "isUrgent": true
  }
  ```

- `isUrgent` is Boolean `true`, not the string `"true"`.
- **Create item** succeeded.
- The complete flow run succeeded.
- A new actual item exists in `IT Service Requests`.
- The persisted values are exactly:
  - Employee Name: Morgan Lee
  - Request Type: Hardware
  - Description: I need a replacement keyboard for my workstation.
  - Urgent: Yes

Do not infer the list item from the run. Open the list and inspect the actual item.

## Browser and sign-in recovery

- Keep Forms, Power Automate, and SharePoint tabs open while the user completes mobile MFA.
- If the browser closes during MFA, finish sign-in before opening replacement tabs.
- If Forms home appears, open the existing form from the form list. Do not select New Form.
- If Power Automate redirects, return to the existing flow from My flows in `DecisionForge (default)`.
- If SharePoint redirects, return to the existing Northstar site and inspect the list again.
- If a human must approve MFA or perform a UI action, give the smallest exact action necessary and wait. Do not infer success.

## Documentation correction

Capture unexpected Microsoft UI behavior, authentication or MFA interruptions, redirects, SharePoint defaults, connector behavior, expression behavior, or other real-world differences.

After successful verification, update only `recipes/003-sharepoint-list/README.md` and this `build.md` when observed behavior shows that an instruction is wrong or unclear. Preserve the learning objective and the smallest supported implementation.

The verified current behavior is:

- No suitable Northstar site existed, so SharePoint's current **Standard team** site flow created the private `Northstar` site at `https://landopsdemo.sharepoint.com/sites/Northstar`.
- A blank `IT Service Requests` list was created in that site.
- The four business columns were created as Single line of text, Choice, Multiple lines of text, and Yes/No. The Choice values are Hardware, Software, Access, and Other; the Yes/No default was set to No.
- The default `Title` column was hidden using **Column settings > Hide this column**. It was left unmapped and blank; the flow saved and created an item successfully without a fabricated title.
- The Power Automate designer accepted the four expressions through its expression editor. After save, the designer displayed the mapped property names (`employeeName`, `requestType`, `description`, and `isUrgent`) rather than the full expressions.
- The successful test used Forms response ID `3`; **Create item** returned HTTP 201 and SharePoint item ID `1`.

Mark Recipe 003 **hands-on verified** only after the real persisted list item and the complete successful run have been inspected.

## Stop condition

Stop after the successful end-to-end verification report. Do not create OneDrive resources, Teams resources, or any Recipe 004 behavior.

## Completion report

Report:

- What was reused and what was created.
- The Microsoft environment used.
- The SharePoint site and list used.
- The final column names and types.
- The actual Title-column treatment and why.
- Whether the Form submission succeeded.
- Whether the complete flow run succeeded.
- The actual `Normalized Request` output.
- The actual persisted SharePoint values.
- Confirmation that Create item mapped from `Normalized Request`, not raw Forms fields.
- Any UI, authentication, redirect, SharePoint, connector, or expression issues.
- Documentation corrections made.
- Any human action still required.

The real list item and successful flow run have now been inspected. Recipe 003 is hands-on verified. Do not begin Recipe 004.
