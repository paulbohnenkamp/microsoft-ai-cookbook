# Build Recipe 001 in the Northstar environment

You are helping a reader perform Recipe 001 from this directory.

## Goal

Create and test the smallest useful Northstar Forms-to-Power-Automate flow:

```text
Microsoft Forms
    -> When a new response is submitted
    -> Get response details
```

The flow must use the form `Northstar IT Service Request` and must retrieve these fields:

- Employee Name
- Request Type: Hardware, Software, Access, or Other
- Description
- Urgent?: Yes or No

## Read first

Read `AGENTS.md` and `recipes/001-forms-response/README.md`. Inspect the actual repository and the capabilities available in this agent environment.

## Capability boundary

If you can safely interact with the current Microsoft Forms and Power Automate web experiences, you may guide or perform the required steps within the user's approved task. If you cannot operate those web experiences, give the human the smallest exact UI action needed and wait for confirmation before continuing.

Do not assume that every coding agent can open portals, use authenticated connectors, or submit forms. Do not request or handle passwords, client secrets, access tokens, API keys, connection strings, or other credentials.

## Scope and guardrails

- Use the existing Northstar tenant and `DecisionForge (default)` Power Platform environment.
- Do not create another Power Platform environment or add Dataverse capacity.
- Do not create or modify Azure resources, including `rg-northstar`.
- Do not create SharePoint, OneDrive, Teams, Dataverse, Graph, AI, or other supporting resources.
- Do not add fields beyond the four specified in the recipe.
- Do not add actions beyond the Forms trigger and **Get response details**.
- Do not implement Recipe 002.
- Never claim that the recipe is verified from documentation alone.

## Browser and sign-in recovery

- Keep the Forms and Power Automate tabs open while the user completes mobile MFA.
- If the browser closes during MFA, finish the sign-in before opening another Forms tab.
- If Forms home appears after sign-in, open the existing form from the form list. Do not select **New Form** again.
- To edit a blank form, use the form editor that opened after **New Form**. Click the **Untitled form** title at the top of that page and enter the requested title. Opening `forms.cloud.microsoft` again goes to Forms home and does not edit the current form.

## Required verification

After the form and flow exist, submit one test response with these values:

- Employee Name: `Alex Morgan`
- Request Type: `Software`
- Description: `The desktop email client does not open.`
- Urgent?: `No`

Inspect the latest flow run. Confirm that the trigger contains a response ID and that **Get response details** contains all four submitted values.

If a human must submit the form, inspect the run, approve a UI action, or resolve an account or permission issue, stop and ask for that exact action. Do not infer success.

## Completion report

Report:

- What you created or changed.
- The Microsoft environment used.
- Whether the test response was submitted.
- Whether the flow run succeeded.
- The response ID presence and the values observed in **Get response details**.
- Any limitation or human action still required.

Use `authored` until the real form submission and flow run have been inspected. Use `hands-on verified` only when the actual behavior has been confirmed.

Stop after the report.
