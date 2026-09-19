# Recipe 002: Normalize request data in a flow

**Status:** hands-on verified

## Business problem

Northstar has confirmed that Power Automate can read an IT service request from Microsoft Forms. Before another system stores or routes that request, the workflow needs a small internal representation with stable property names and types.

## What you'll learn

You will shape the raw Forms response into one small Northstar request object in Power Automate. You will trim two text values, preserve a controlled choice, and convert `Yes` or `No` into a Boolean value.

## Microsoft technologies used

- Microsoft Forms
- Power Automate

## Prerequisites

- Recipe 001 is hands-on verified.
- The Northstar form `Northstar IT Service Request` exists.
- The flow `Northstar IT Service Request - Inspect Response` exists in the `DecisionForge (default)` environment.
- You can edit the flow and submit a test response in the Northstar tenant.
- A browser is signed in with the intended Northstar account.

This recipe does not use SharePoint, OneDrive, Teams, Dataverse, Microsoft Graph, Azure, or AI services.

## How it works

The Form collects values for a person. **Get response details** exposes those values using the Forms question names. A single **Compose** action named `Normalized Request` creates the small representation that later workflow steps can consume.

The flow becomes:

```text
When a new response is submitted
    -> Get response details
    -> Normalized Request
```

The output has exactly these properties:

```json
{
  "employeeName": "<trimmed Employee Name>",
  "requestType": "<Request Type>",
  "description": "<trimmed Description>",
  "isUrgent": false
}
```

The Forms representation, the Northstar request representation, and a future SharePoint representation do not need to be identical. This recipe establishes that boundary without adding a schema framework or a general data model.

## Build steps

### Reuse the verified flow

1. Open [Power Automate](https://make.powerautomate.com/).
2. Confirm that the environment selector shows `DecisionForge (default)`.
3. Open `Northstar IT Service Request - Inspect Response` from **My flows**.
4. Confirm that the flow already contains **When a new response is submitted** and **Get response details** for `Northstar IT Service Request`.
5. Do not create another form or flow.

### Add the normalized object

1. Add a new action after **Get response details**.
2. Search for **Compose** under **Data Operation**.
3. Rename the action to `Normalized Request`.
4. Configure one object with exactly these properties. In the current Power Automate designer, the expression picker did not expose `createObject`; the verified implementation used one Compose input with nested `setProperty` calls starting from `json('{}')`:

   ```text
   setProperty(setProperty(setProperty(setProperty(json('{}'), 'employeeName', trim(outputs('Get_response_details')?['body/rc9729375ee09499aade4b9b7512bd257'])), 'requestType', outputs('Get_response_details')?['body/re8199d25c8a5449dadfce220f51efd81']), 'description', trim(outputs('Get_response_details')?['body/reeeeaf309c704e2bb9abe9796146e9d1'])), 'isUrgent', equals(outputs('Get_response_details')?['body/ra8a59153127345ceb49b92bdb8d80366'], 'Yes'))
   ```

   The question-specific identifiers above are the identifiers exposed by this existing form's **Get response details** action. When reproducing the recipe in another flow, select the matching dynamic values from that action rather than copying identifiers from this run.

   | Property | Value expression | Result |
   | --- | --- | --- |
   | `employeeName` | `trim(<Employee Name>)` | Trims leading and trailing whitespace. |
   | `requestType` | `<Request Type>` | Preserves `Hardware`, `Software`, `Access`, or `Other`. |
   | `description` | `trim(<Description>)` | Trims leading and trailing whitespace. |
   | `isUrgent` | `equals(<Urgent?>, 'Yes')` | Returns the Boolean `true` or `false`. |

   Replace each angle-bracket placeholder with the matching dynamic value from **Get response details**. Do not enter the placeholder text literally.

5. Keep `requestType` unchanged. Do not lowercase it or replace it with a numeric code.
6. Do not add **Parse JSON**, variables, conditions, or other actions.
7. Save the flow.

Microsoft documents **Compose** as a data operation that can produce one output from multiple inputs, including expressions. The expression reference documents `trim()` for surrounding whitespace, `equals()` for Boolean comparison, and `setProperty()` for building an object. In this environment, entering the object-building expression as plain text produced invalid parameters; using the expression editor and the supported nested `setProperty()` expression produced the verified object.

## Security considerations

- Use only fictional Northstar test data. Do not submit passwords, secrets, financial account details, or other sensitive data.
- Keep the existing form audience and flow permissions unchanged.
- The normalized object remains inside Power Automate in this recipe. Do not add a destination or copy the data to another service.
- Do not store credentials, tokens, keys, or connection strings in the recipe or flow.

## Test it

1. Open `Northstar IT Service Request` in Microsoft Forms and select **Preview**.
2. Submit a new response:
   - Employee Name: `Jamie Chen`
   - Request Type: `Access`
   - Description: `I need access to the project workspace.`
   - Urgent?: `No`
3. If the Forms editor permits harmless surrounding spaces, add them to the Employee Name or Description field. Do not make the test awkward if the form removes them.
4. Return to Power Automate and open the latest run.
5. Confirm that **When a new response is submitted** and **Get response details** succeeded.
6. Open **Normalized Request** and inspect its output.
7. Confirm that the output is one object with exactly these values:

```json
{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}
```

The `isUrgent` value must be a Boolean, not the string `"false"`. This recipe stops after the object is inspected. It does not create a SharePoint item.

## Common failure cases

- **The existing form or flow is missing.** Confirm the signed-in account and the `DecisionForge (default)` environment. Do not create a replacement resource.
- **The Compose action shows text instead of an object.** Open the expression editor and use the supported nested `setProperty()` expression. Do not paste the expression as ordinary text. Confirm that the action input uses four properties and that the `isUrgent` value uses `equals()` as the complete value expression.
- **`isUrgent` is a string.** Remove quotes around the `equals()` expression. The expression must return the Boolean value directly.
- **Names or descriptions retain unwanted spaces.** Confirm that `trim()` wraps the matching dynamic value from **Get response details**.
- **The flow uses the wrong question values.** Confirm that each expression uses the dynamic value from the current **Get response details** action, then submit a new response.
- **The browser closes during MFA.** Keep the Forms and Power Automate tabs open while the user approves sign-in. If the browser closes, complete sign-in before opening another Forms tab and return to the existing form and flow.
- **Power Automate shows different controls.** Use the current **Compose** data operation and expression editor. The verified current designer did not expose `createObject`; nested `setProperty()` calls were the smallest supported single-action implementation.

## Why AI is not appropriate

AI is not needed at runtime. Trimming text, preserving a controlled choice, and converting `Yes` or `No` to a Boolean are deterministic transformations. Power Automate expressions are cheaper, predictable, and directly testable. An AI coding agent may help build the flow, but that does not make AI part of the workflow.

## Next step

After this recipe is hands-on verified, continue to Recipe 003: save the normalized request to a SharePoint list. Recipe 003 introduces persistence. Do not add SharePoint to this flow yet.

## Verification status

This recipe is hands-on verified. The existing Form and flow were reused, one `Normalized Request` Compose action was added, the required Jamie Chen response was submitted, the complete run succeeded, and the exact output values and Boolean type were inspected in the Northstar environment. The observed output was:

```json
{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}
```

## Official references

- [Use data operations in Power Automate](https://learn.microsoft.com/en-us/power-automate/data-operations)
- [Expression cookbook for cloud flows](https://learn.microsoft.com/en-us/power-automate/expression-cookbook)
- [Reference for functions in workflow expressions](https://learn.microsoft.com/en-us/azure/logic-apps/expression-functions-reference)
