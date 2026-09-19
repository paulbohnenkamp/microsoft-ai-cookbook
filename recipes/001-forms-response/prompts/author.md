# Author Recipe 001: Inspect a Microsoft Forms response in Power Automate

> Reconstructed from the established cookbook design and verified implementation after the author-prompt convention was introduced. This file records the substantive authoring intent; it does not claim to reproduce the original historical wording.

## Goal

Author Recipe 001 from `ROADMAP.md`:

```text
Inspect a Microsoft Forms response in Power Automate
```

Follow `AGENTS.md` and the existing cookbook conventions. Read these files before authoring:

- `README.md`
- `ROADMAP.md`
- `AGENTS.md`
- `docs/cookbook-environment.md`

Recipe 001 teaches the smallest useful Forms-to-Power-Automate workflow. It must remain separate from normalization, persistence, notifications, AI, and later integration topics.

## Learning objective

Teach the reader how to capture and inspect one Microsoft Forms response in Power Automate.

The reader should understand:

- how a Forms response starts an automated cloud flow
- how the trigger supplies a response ID
- how **Get response details** retrieves the submitted values
- how to inspect the actual run history
- why seeing values in a flow run is different from persisting them elsewhere

## Existing design

Use this Form:

```text
Northstar IT Service Request
```

The Form has exactly these fields:

- `Employee Name`
- `Request Type`
- `Description`
- `Urgent?`

The `Request Type` choices are:

- `Hardware`
- `Software`
- `Access`
- `Other`

Use this flow:

```text
Northstar IT Service Request - Inspect Response
```

The flow has exactly this structure:

```text
When a new response is submitted
    ->
Get response details
    ->
inspect the values in run history
```

Use the existing Northstar tenant and the `DecisionForge (default)` Power Platform environment. Do not recreate an existing Form or create another flow merely to restage the recipe.

## Scope and exclusions

Recipe 001 intentionally stops after inspecting the trigger and action results.

Do not add:

- normalization or data shaping
- SharePoint or another persistence destination
- OneDrive
- Teams or Adaptive Cards
- Microsoft Graph
- Azure services
- Dataverse
- APIs or custom connectors
- AI services, models, or agents

Do not implement Recipe 002 or Recipe 003. Do not modify Recipe 001 documentation to include later concepts.

## Recipe artifacts

Create the reader-facing recipe README with the established sections:

- business problem
- learning objective
- technologies
- prerequisites
- how it works
- build steps
- security considerations
- test and expected result
- common failure cases
- why AI is or is not appropriate
- next step
- verification status
- official references where useful

Keep the recipe concise. Make the build steps concrete enough for the current Forms and Power Automate web experiences.

Keep the hands-on execution instructions in:

```text
recipes/001-forms-response/prompts/build.md
```

That file is the execution prompt. This file is the authoring record. Do not confuse their roles.

## Required test

Specify one fictional response:

- Employee Name: `Alex Morgan`
- Request Type: `Software`
- Description: `The desktop email client does not open.`
- Urgent?: `No`

The expected result is one successful flow run. The trigger must contain a response ID. **Get response details** must contain all four submitted values.

## Operational guidance

Preserve the practical UI lessons discovered during the verified run:

- Keep the Forms and Power Automate tabs open while the user completes mobile MFA.
- If the browser closes during MFA, complete sign-in before opening another Forms tab.
- If Forms home appears, open the existing Form instead of selecting **New Form** again.
- To edit a blank Form, use the editor that opened after **New Form** and click the **Untitled form** title area. Opening `forms.cloud.microsoft` again returns to Forms home and does not edit the current Form.

If a human must complete MFA or another UI action, the execution prompt must request only that exact action and must not infer success.

## Verification status

Recipe 001 is hands-on verified only after the named Form exists, the specified test response has been submitted, the flow has run successfully, and the actual trigger and **Get response details** values have been inspected.

The existing `recipes/001-forms-response/prompts/build.md` file remains the hands-on execution prompt. This authoring file documents how the recipe was designed after the work had already been performed and verified.

Stop at the verification report. Do not begin Recipe 002.
