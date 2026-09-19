# Build Recipe 002 in the Northstar environment

You are helping a reader perform Recipe 002 from this directory.

## Goal

Extend the verified Recipe 001 flow with one Compose action that creates this normalized request object:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
    -> Normalized Request
```

The output must contain exactly these properties:

```json
{
  "employeeName": "<trimmed Employee Name>",
  "requestType": "<Request Type>",
  "description": "<trimmed Description>",
  "isUrgent": false
}
```

## Read first

Read `AGENTS.md` and `recipes/002-normalize-request/README.md`. Inspect the actual repository and the capabilities available in this agent environment.

## Capability boundary

If you can safely interact with the current Microsoft Forms and Power Automate web experiences, you may guide or perform the required steps within the user's approved task. If you cannot operate those web experiences, give the human the smallest exact UI action needed and wait for confirmation before continuing.

Do not assume that every coding agent can open portals, use authenticated connectors, or submit forms. Do not request or handle passwords, client secrets, access tokens, API keys, connection strings, or other credentials.

## Scope and guardrails

- Use the existing Northstar tenant and `DecisionForge (default)` Power Platform environment.
- Reuse the existing Form `Northstar IT Service Request`.
- Reuse the existing flow `Northstar IT Service Request - Inspect Response`.
- Add only one action named `Normalized Request` after **Get response details**.
- Do not create another Form or flow.
- Do not create or modify Azure resources, including `rg-northstar`.
- Do not create or modify SharePoint, OneDrive, Teams, Dataverse, Graph, AI, or other supporting resources.
- Do not add **Parse JSON**, variables, conditions, custom code, or future actions.
- Do not implement Recipe 003.
- Never claim that the recipe is verified from documentation alone.

## Inspect before changing anything

1. Confirm that `Northstar IT Service Request` exists and has only these questions:
   - Employee Name
   - Request Type: Hardware, Software, Access, or Other
   - Description
   - Urgent?: Yes or No
2. Confirm that `Northstar IT Service Request - Inspect Response` exists in `DecisionForge (default)`.
3. Confirm that the existing flow contains **When a new response is submitted** followed by **Get response details** for the existing Form.
4. If the Form or flow is missing, stop and report the exact missing resource. Do not create a replacement.

## Configure the normalized object

1. Add a **Compose** action after **Get response details**.
2. Rename it `Normalized Request`.
3. Configure one object with exactly four properties. The current Power Automate expression picker does not expose `createObject`. The verified single-Compose implementation uses nested `setProperty` calls starting from `json('{}')`:

   ```text
   setProperty(setProperty(setProperty(setProperty(json('{}'), 'employeeName', trim(outputs('Get_response_details')?['body/rc9729375ee09499aade4b9b7512bd257'])), 'requestType', outputs('Get_response_details')?['body/re8199d25c8a5449dadfce220f51efd81']), 'description', trim(outputs('Get_response_details')?['body/reeeeaf309c704e2bb9abe9796146e9d1'])), 'isUrgent', equals(outputs('Get_response_details')?['body/ra8a59153127345ceb49b92bdb8d80366'], 'Yes'))
   ```

   These question-specific identifiers are from the existing Northstar form's **Get response details** action. In another flow, select the matching dynamic values from that action.
   - `employeeName`: `trim(<Employee Name>)`
   - `requestType`: `<Request Type>`
   - `description`: `trim(<Description>)`
   - `isUrgent`: `equals(<Urgent?>, 'Yes')`
4. Replace each placeholder with the matching dynamic value from **Get response details**. Do not enter placeholder text literally.
5. Keep `requestType` as the controlled Forms value. Do not lowercase it or create a code.
6. Ensure that the `equals()` expression is the complete value for `isUrgent`, without quotes around its result. The output must be the Boolean `true` or `false`, not the strings `"true"` or `"false"`.
7. Save the flow.

Use the current Power Automate expression editor and Compose behavior. Do not paste the expression as ordinary text: in this environment that produced invalid parameters. If the current designer differs, stop before adding extra actions, capture the actual behavior, and report the smallest supported single-action alternative. Do not invent a workaround without documenting it.

## Required test

After the flow is saved, submit a new response through the existing Form:

- Employee Name: `Jamie Chen`
- Request Type: `Access`
- Description: `I need access to the project workspace.`
- Urgent?: `No`

If practical in the Forms UI, add harmless surrounding spaces to Employee Name or Description. Do not force the whitespace test if the UI makes it awkward.

## Required verification

Inspect the latest Power Automate run. Confirm that:

- **When a new response is submitted** succeeded.
- **Get response details** succeeded.
- **Normalized Request** succeeded.
- The Compose output is one object with exactly `employeeName`, `requestType`, `description`, and `isUrgent`.
- `employeeName` is `Jamie Chen` after trimming.
- `requestType` is `Access`.
- `description` is `I need access to the project workspace.` after trimming.
- `isUrgent` is the Boolean `false`.
- The complete flow run succeeded.

Do not infer the output from the submitted values. Inspect the actual run output and distinguish a Boolean `false` from the string `"false"`.

## Browser and sign-in recovery

- Keep the Forms and Power Automate tabs open while the user completes mobile MFA.
- If the browser closes during MFA, finish the sign-in before opening another Forms tab.
- If Forms home appears after sign-in, open the existing form from the form list. Do not select **New Form** again.
- If Power Automate redirects, return to the existing flow from **My flows** in `DecisionForge (default)`.
- If a human must approve MFA or perform a UI action, give the human the smallest exact action needed and wait. Do not infer that the action succeeded.

## Documentation correction

Capture unexpected Microsoft UI behavior, redirects, connector behavior, expression behavior, or authentication interruptions.

After successful verification, correct `recipes/002-normalize-request/README.md` and this `build.md` only when the observed Microsoft behavior shows that an instruction is wrong or unclear. Preserve the learning objective and keep the smallest supported implementation.

Mark Recipe 002 **hands-on verified** only after the actual Form submission, successful run, Compose output, exact property set, exact values, and Boolean type have all been inspected.

## Stop condition

Stop after the successful end-to-end verification report. Do not create SharePoint resources. Do not add **Create item**. Do not begin Recipe 003.

## Completion report

Report:

- What you reused and what you added.
- The Microsoft environment used.
- Whether the Form submission succeeded.
- Whether the complete flow run succeeded.
- The actual `Normalized Request` output.
- Confirmation that `isUrgent` is a Boolean.
- Any UI, authentication, redirect, connector, or expression issues encountered.
- Any documentation corrections made.
- Any human action still required.

Use `hands-on verified` only after the real Form submission and successful flow run have been inspected. This implementation was verified with the nested `setProperty()` expression above; the output showed `isUrgent` as Boolean `false`, not the string `"false"`.

Stop after the report.
