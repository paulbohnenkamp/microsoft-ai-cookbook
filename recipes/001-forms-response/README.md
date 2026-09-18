# Recipe 001: Inspect a Microsoft Forms response in Power Automate

**Status:** hands-on verified

## Business problem

Northstar employees need a small way to submit an internal IT service request. Before the business stores or routes that request, the team needs to confirm that Power Automate receives the submitted values correctly.

## What you'll learn

You will connect one Microsoft Form to one automated cloud flow, retrieve one response, and inspect the flow run that contains the submitted values.

## Microsoft technologies used

- Microsoft Forms
- Power Automate

## Prerequisites

- Access to the Northstar Microsoft tenant.
- Access to the DecisionForge (default) Power Platform environment.
- Permission to create a personal or shared form and an automated cloud flow in that environment.
- A browser signed in with the intended Northstar account.

This recipe does not use Azure, SharePoint, OneDrive, Teams, Dataverse, Microsoft Graph, or AI services.

## How it works

The form collects four values. The Power Automate trigger starts a flow when someone submits the form and supplies a response ID. The **Get response details** action uses the form and response ID to retrieve the submitted values as dynamic content.

The flow has only these two steps:

```text
When a new response is submitted
    -> Get response details
```

A response ID identifies one submitted response within the form. It is not the response text. The action uses that ID to fetch the response content.

## Build steps

### Create the form

1. Open [Microsoft Forms](https://forms.office.com/). Microsoft currently redirects this address to the Forms web experience.
2. Select **New Form**.
3. In the form editor, click the **Untitled form** title at the top of the page and enter `Northstar IT Service Request`. If Forms opens the blank editor, edit the title there. Do not return to the Forms home page to set the title.
4. Add a required **Text** question named `Employee Name`.
5. Add a required **Choice** question named `Request Type` with these choices:
   - `Hardware`
   - `Software`
   - `Access`
   - `Other`
6. Add a required **Text** question named `Description`.
7. Add a required **Choice** question named `Urgent?` with these choices:
   - `Yes`
   - `No`
8. Use **Preview** to confirm that the form contains only these four questions.

Microsoft Forms saves the form while you edit it. Do not add fields for this recipe.

### Create the flow

1. Open [Power Automate](https://make.powerautomate.com/).
2. Confirm that the environment selector shows `DecisionForge (default)`.
3. Select **Create**.
4. Under **Start from blank**, select **Automated cloud flow**.
5. Set the flow name to `Northstar IT Service Request - Inspect Response`.
6. Search for the Microsoft Forms trigger named **When a new response is submitted**.
7. Select **Create**.
8. In the trigger, set **Form Id** to `Northstar IT Service Request`.
9. Select **New step** or the add-step button in the designer.
10. Search for the Microsoft Forms action named **Get response details**.
11. Set **Form Id** to `Northstar IT Service Request`.
12. Set **Response Id** to the trigger's dynamic value named **Response Id**.
13. Save the flow.

The Forms connector currently exposes this trigger and action for this pattern. If the designer offers a similarly named deprecated trigger, select **When a new response is submitted** without the deprecated label.

## Security considerations

- Keep the form limited to Northstar test data. Do not submit passwords, secrets, financial account details, or other sensitive data.
- Use the tenant's intended response audience. Do not make the form public for this exercise unless the tenant owner has approved that choice.
- The form and flow are Microsoft 365 and Power Platform resources. They do not belong in `rg-northstar`.
- Give the flow only the permissions required to read this form.

## Test it

1. In Microsoft Forms, open `Northstar IT Service Request` and select **Preview**.
2. Submit one test response:
   - Employee Name: `Alex Morgan`
   - Request Type: `Software`
   - Description: `The desktop email client does not open.`
   - Urgent?: `No`
3. Return to Power Automate and open `Northstar IT Service Request - Inspect Response`.
4. Open the latest run from the run history.
5. Expand **When a new response is submitted** and confirm that a response ID is present.
6. Expand **Get response details** and confirm that the output contains `Alex Morgan`, `Software`, `The desktop email client does not open.`, and `No`.

The expected result is one successful run with the submitted values visible in the action output. This test proves that the trigger-to-action connection works. It does not create a SharePoint item, a OneDrive file, or a Teams message.

## Common failure cases

- **The form is missing from Form Id.** Confirm that Power Automate and Microsoft Forms use the same signed-in account and environment. Refresh the designer after saving the form.
- **The flow does not start.** Confirm that the flow is saved and turned on, then submit a new response instead of reusing an old one.
- **Get response details fails.** Confirm that its **Form Id** matches the trigger's form and that **Response Id** comes from the trigger's dynamic content.
- **The action output is empty or uses old question names.** Save the form and refresh the flow action so it can load the current form schema. Submit a new response.
- **The designer labels differ.** Use the current Microsoft Forms connector trigger and action names. The new and classic Power Automate designers may place the controls differently.
- **The browser closes during mobile MFA.** Keep the Forms and Power Automate tabs open while you approve the sign-in. If the browser closes, finish the sign-in before opening another Forms tab. Reopen the existing form from Forms home instead of selecting **New Form** again.
- **You keep seeing a blank `Untitled form`.** Use the form editor that opened after **New Form**, then click the **Untitled form** title at the top of that page. Opening `forms.cloud.microsoft` again takes you to Forms home; it does not put the current form into edit mode.

## Why AI is not appropriate

AI is not needed. The requirement is deterministic: capture a form response and inspect its values. Forms, the Power Automate trigger, and **Get response details** solve the problem directly. Adding a model or an agent would add cost and moving parts without improving the result.

## Next step

After this recipe is hands-on verified, continue to Recipe 002: save a request to a SharePoint list. Recipe 002 introduces the SharePoint destination; do not add it to this flow yet.

## Verification status

This recipe is hands-on verified in the Northstar tenant. The named form was created, the specified test response was submitted, the flow ran successfully, and the actual trigger and action values were inspected in the `DecisionForge (default)` environment.

## Official references

- [Create a form](https://support.microsoft.com/en-us/forms/create-a-form)
- [Overview of flows with Microsoft Forms](https://learn.microsoft.com/en-us/power-automate/forms/overview)
- [Microsoft Forms connector reference](https://learn.microsoft.com/en-us/connectors/microsoftforms/)
