# Author Recipe 002: Normalize request data in a flow

Implement Recipe 002 from ROADMAP.md:

"Normalize request data in a flow"

Follow AGENTS.md and all existing cookbook conventions.

Read first:

- README.md
- ROADMAP.md
- AGENTS.md
- docs/cookbook-environment.md
- recipes/001-forms-response/README.md
- recipes/001-forms-response/prompts/build.md

Recipe 001 is hands-on verified.

Do not recreate Recipe 001 resources.

## Preserve this authoring prompt

Save the complete prompt for this task as:

recipes/002-normalize-request/prompts/author.md

This author.md file should preserve the instructions used to author Recipe 002 so the AI-assisted development process itself is reproducible.

Preserve the substantive prompt instructions rather than replacing them with a summary.

The recipe prompt roles are:

```text
prompts/author.md
    The prompt used to design and author the recipe.

prompts/build.md
    The prompt used to perform the real hands-on Microsoft exercise.
```

Do not confuse the two.

Going forward, recipe-specific prompts should remain local to the recipe that owns them.

## Goal

Recipe 002 should teach one significant new concept:

Take the raw Microsoft Forms response already obtained by Power Automate and deliberately shape it into a small, consistent Northstar request representation before that data is sent to another system.

Build directly on the verified Recipe 001 environment.

The conceptual flow becomes:

```text
Northstar IT Service Request
    ->
When a new response is submitted
    ->
Get response details
    ->
Compose: Normalized Request
```

Do not introduce SharePoint yet.

Recipe 003 will persist the normalized request to SharePoint.

## Why we are normalizing

Recipe 001 exposes data using the Forms-oriented representation:

- Employee Name
- Request Type
- Description
- Urgent?

Those names and values are appropriate for the user-facing Form.

Northstar's internal representation should not simply be whatever shape the input system happens to provide.

Recipe 002 introduces this deliberate boundary:

```text
Microsoft Forms data
    ->
Northstar normalized request
    ->
future destinations
```

The normalized representation created in this recipe becomes the input that Recipe 003 will later persist to SharePoint.

Keep this deliberately small.

Do not turn this into a DTO framework, schema system, canonical enterprise data model, custom API, or abstraction layer.

## Exact normalized representation

Recipe 002 should produce exactly this logical Northstar representation:

```json
{
  "employeeName": "<trimmed Employee Name>",
  "requestType": "<Request Type>",
  "description": "<trimmed Description>",
  "isUrgent": false
}
```

Example:

```json
{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}
```

## Exact normalization rules

Use these rules.

### employeeName

Source: `Employee Name`

Target property: `employeeName`

Normalization: trim leading and trailing whitespace. Do not otherwise alter capitalization or the person's name.

### requestType

Source: `Request Type`

Target property: `requestType`

Expected source values:

- Hardware
- Software
- Access
- Other

Preserve the controlled Forms choice. Do not lowercase it. Do not create numeric codes. Do not create another classification system.

### description

Source: `Description`

Target property: `description`

Normalization: trim leading and trailing whitespace. Do not summarize, rewrite, classify, correct, or otherwise alter the user's description.

### isUrgent

Source: `Urgent?`

Source representation: `Yes` or `No`

Target property: `isUrgent`

Target representation: `true` or `false` Boolean

Convert `Yes` to `true` and `No` to `false`. The output must be a Boolean, not the strings `"true"` or `"false"`.

## Power Automate implementation

Prefer the smallest clear Power Automate implementation.

Use one Compose action named `Normalized Request`.

The Compose action should produce the normalized request as one object.

Do not create four separate Compose actions merely because there are four properties unless current Power Automate behavior makes the single-object approach impractical.

Use Power Automate expressions where appropriate for trimming `employeeName`, trimming `description`, and converting `Urgent?` to a Boolean.

Keep `requestType` as the controlled Forms value.

Use current supported Power Automate syntax and current Microsoft guidance.

Verify the current expression syntax and the practical supported way to construct an object in Compose rather than relying on stale examples.

If current Power Automate behavior materially differs from this proposed implementation, preserve the learning objective and document the actual supported approach.

## What this recipe should teach

The reader should understand:

- why input-system data and internal application data do not have to use the same representation
- what normalization or data shaping means in a practical workflow
- how Power Automate expressions transform values
- how `trim()` removes accidental surrounding whitespace
- how a human-facing `Yes` or `No` value becomes a real Boolean
- how Compose can create one meaningful object
- how to inspect Compose input and output in Power Automate run history
- how the resulting object becomes a stable boundary for later workflow steps

Do not turn this into a general Power Automate expression tutorial.

## Important architectural point

Explain this simply:

The Form is responsible for collecting information from a person.

The normalized Northstar request represents how the workflow wants to reason about that information.

A future destination such as SharePoint is responsible for storing the information.

Therefore:

```text
Forms representation
    != necessarily
Northstar representation
    != necessarily
SharePoint representation
```

For this small example, the differences are intentionally minor.

The purpose is to establish the boundary before future workflows become more complex.

KISS still applies. Do not imply that every workflow needs an elaborate internal data model.

## Do not over-engineer

Do not introduce the following unless Power Automate absolutely requires something unexpected during the later real hands-on exercise:

- Parse JSON
- JSON schemas
- variables
- custom connectors
- child flows
- APIs
- Azure Functions
- custom code
- DTO classes
- validation frameworks
- reusable normalization libraries

One Compose action should be sufficient if current Power Automate supports the intended object cleanly.

## Existing verified resources

Reuse the verified Recipe 001 resources.

Microsoft Form: `Northstar IT Service Request`

Fields:

- Employee Name
- Request Type
- Description
- Urgent?

Request Type choices:

- Hardware
- Software
- Access
- Other

Existing Power Automate flow: `Northstar IT Service Request - Inspect Response`

Current verified flow:

```text
When a new response is submitted
    ->
Get response details
```

Recipe 002 will extend that existing flow to:

```text
When a new response is submitted
    ->
Get response details
    ->
Normalized Request
```

Do not create another Form. Do not create another flow merely for Recipe 002. Do not modify Recipe 001 documentation merely to turn Recipe 001 into Recipe 002.

## Recipe directory

Create:

```text
recipes/002-normalize-request/
```

Create at minimum:

```text
recipes/002-normalize-request/
    README.md
    prompts/
        author.md
        build.md
```

`author.md` is this authoring prompt. `build.md` is the separate prompt that will later guide execution of the real Microsoft hands-on exercise.

Do not create additional artifacts or prompts unless they genuinely help teach or reproduce Recipe 002.

## Recipe README

Follow the established recipe format and style. Keep it concise and practical.

Cover:

1. Business problem
2. What you'll learn
3. Microsoft technologies used
4. Prerequisites
5. How it works
6. Build steps
7. Security considerations
8. Test it
9. Common failure cases
10. Why AI is or isn't appropriate
11. Next step

Recipe 001 hands-on verification is a prerequisite.

## Recipe-local build prompt

Create `recipes/002-normalize-request/prompts/build.md`.

This is not another authoring prompt. It is the executable hands-on prompt that can later be given to an agent with:

```text
Read and follow recipes/002-normalize-request/prompts/build.md exactly.
```

The build prompt must guide the real Recipe 002 exercise. It must instruct the agent to:

1. Read `AGENTS.md` and Recipe 002 `README.md`.
2. Inspect the existing Northstar environment before changing anything.
3. Confirm and reuse the Recipe 001 Form.
4. Confirm and reuse the Recipe 001 Power Automate flow.
5. Add only the `Normalized Request` step required by Recipe 002.
6. Configure the exact normalization rules defined by this recipe.
7. Submit a new test request through the existing Form.
8. Verify the Power Automate run succeeds.
9. Inspect the actual `Normalized Request` output.
10. Confirm that the output is one object with exactly `employeeName`, `requestType`, `description`, and `isUrgent`.
11. Confirm `isUrgent` is an actual Boolean.
12. Capture unexpected Microsoft UI behavior, authentication or MFA interruptions, redirects, connector behavior, expression behavior, or other real-world issues encountered during execution.
13. Correct Recipe 002 `README.md` and `build.md` when actual observed Microsoft behavior demonstrates that the authored instructions need correction.
14. Mark Recipe 002 hands-on verified only after successful end-to-end execution has actually been observed.
15. Stop without beginning Recipe 003.

## Agent capability and human interaction

Different agents have different capabilities.

If the agent can safely perform a step with available authenticated tooling, it may do so.

If human interaction, MFA, authentication, browser recovery, approval, or UI interaction is required, give the human the smallest exact action necessary and wait.

Never fabricate successful execution.

Agent execution by itself does not prove that the recipe works. Observed behavior in the real Microsoft environment is the basis for hands-on verification.

## Recipe 001 operational lessons

Preserve relevant operational lessons learned during Recipe 001. The agent may encounter MFA, browser session interruption, authentication redirects, or difficulty returning to the correct Power Automate edit or run view.

The user may complete MFA outside an agent-controlled browser. The agent should recover the Microsoft browser state afterward rather than assuming the workflow failed.

Do not copy irrelevant Recipe 001 troubleshooting into Recipe 002. Retain only lessons that are useful to completing this recipe.

## Test submission

Use a new test submission that makes Recipe 002 easy to inspect:

- Employee Name: `Jamie Chen`
- Request Type: `Access`
- Description: `I need access to the project workspace.`
- Urgent?: `No`

If practical in the Forms UI, deliberately include harmless leading or trailing whitespace in Employee Name or Description so run history visibly demonstrates `trim()` removing it. Do not make the test awkward merely to force whitespace into Forms if the UI makes that difficult.

## Expected normalized output

```json
{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}
```

The real hands-on verification must inspect Power Automate run history and confirm these values rather than assuming the expressions worked.

## Hands-on verification

Authoring Recipe 002 does not make it verified.

Initial status:

```text
authored; hands-on verification pending
```

Hands-on verification later requires observing:

- the existing Northstar Form is reused
- the existing Recipe 001 flow is reused
- `Normalized Request` executes
- the Compose output is one object
- `employeeName` contains the expected trimmed value
- `requestType` is `Access`
- `description` contains the expected trimmed value
- `isUrgent` is the Boolean `false`
- the complete flow run succeeds

If actual Power Automate behavior differs from the authored instructions, capture what happened and correct the recipe and prompt based on the real environment.

Only then may Recipe 002 be marked `hands-on verified`.

## Why AI is not used

Explicitly explain why Recipe 002 does not require AI. These transformations are deterministic: trim text, preserve a controlled choice, and convert `Yes` or `No` to a Boolean. Power Automate expressions are simpler, cheaper, predictable, and directly testable.

AI coding agents may help build the workflow. That does not mean AI belongs inside the runtime workflow.

## SharePoint

Do not create SharePoint resources. Do not add **Create item**. Recipe 003 will teach persistence of this normalized object into SharePoint. Recipe 002 stops at creating and inspecting the normalized object.

## Azure and Power Platform

Do not modify `rg-northstar`. Recipe 002 requires no Azure resources. Continue using the existing `DecisionForge (default)` Power Platform environment where applicable. Do not create another Power Platform environment, add Dataverse capacity, or incur additional licensing or capacity costs.

## Do not implement future concepts

Do not implement Recipe 003. Do not create SharePoint resources, OneDrive archive files, Teams notifications, Adaptive Cards, Microsoft Graph integration, Entra application registrations, Azure services, Foundry resources, models, AI Search, agents, AI classification, databases, or application hosting.

Recipe 002 is only about deliberate request normalization in Power Automate.

## Current Microsoft guidance

Use current official Microsoft guidance and current Power Automate UI terminology.

Verify current Power Automate expression syntax, current Compose behavior, the current supported method for producing the object, and current terminology used by the Power Automate designer.

Do not blindly hard-code stale UI instructions. If Microsoft redirects between Microsoft 365 or Power Platform experiences, describe what the reader should expect. Keep navigation instructions concrete enough that a reader can perform the exercise.

## Roadmap and indexes

After authoring Recipe 002, update `ROADMAP.md` or existing indexes only as necessary to record:

- Recipe 001: hands-on verified
- Recipe 002: authored; hands-on verification pending
- Recipe 003: not implemented

Do not begin Recipe 003. Do not make unrelated roadmap or documentation changes.

## Authoring versus execution

This invocation is the authoring phase. It creates `README.md`, `author.md`, and `build.md`. It does not perform Microsoft environment changes.

The next phase will be triggered separately using `build.md`. Maintain the distinction between how the recipe was designed with an AI coding agent and how it was actually executed and verified against Microsoft.

## Stop condition

For this invocation, author Recipe 002 only.

Do not execute the hands-on Recipe 002 exercise yet. Do not modify the existing Power Automate flow. Do not submit another Form response. Do not begin Recipe 003.

After creating Recipe 002 documentation and its minimal useful recipe-local artifacts, stop.

Report:

1. Files created.
2. Files changed.
3. Recipe 002 learning objective.
4. Exact normalized object.
5. Exact Power Automate expressions chosen for each transformed property.
6. How `isUrgent` will be guaranteed to be a Boolean rather than a string.
7. Any differences between the requested single Compose object and what current Power Automate actually supports.
8. Exact test submission.
9. Confirmation that this complete authoring prompt was preserved as `recipes/002-normalize-request/prompts/author.md`.
10. Confirmation that the separate hands-on prompt was created as `recipes/002-normalize-request/prompts/build.md`.
11. Current Recipe 002 status.
12. Exact short prompt to give the agent next to perform the real hands-on Recipe 002 exercise.

Do not begin Recipe 003.
