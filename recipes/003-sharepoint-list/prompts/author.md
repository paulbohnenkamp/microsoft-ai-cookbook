Author Recipe 003 from ROADMAP.md:

"Save the normalized request to a SharePoint list"

Follow AGENTS.md and all existing cookbook conventions.

Read first:

- README.md
- ROADMAP.md
- AGENTS.md
- docs/cookbook-environment.md
- recipes/001-forms-response/README.md
- recipes/002-normalize-request/README.md
- recipes/002-normalize-request/prompts/author.md
- recipes/002-normalize-request/prompts/build.md

Recipes 001 and 002 are hands-on verified.

Recipe 002 was committed before starting this work.

Do not recreate or redesign their resources.


PRESERVE THIS AUTHORING PROMPT

Save the complete substantive prompt for this task as:

recipes/003-sharepoint-list/prompts/author.md

The recipe prompt roles are:

prompts/author.md
    The prompt used to design and author the recipe.

prompts/build.md
    The prompt used to perform the real hands-on Microsoft exercise.

Create both for Recipe 003.

Do not confuse authoring with execution.


GOAL

Recipe 003 should teach one significant new concept:

Persist the verified normalized Northstar request from Recipe 002 as
structured data in a SharePoint list.

Build directly on the verified Recipe 002 flow.

The conceptual flow becomes:

Northstar IT Service Request
    ->
When a new response is submitted
    ->
Get response details
    ->
Normalized Request
    ->
SharePoint - Create item

The new concept is:

normalized application data
    ->
persistent structured business data

Recipe 003 should NOT introduce additional normalization.

Recipe 003 should NOT map the original Forms fields directly into SharePoint.

The SharePoint action must consume the normalized representation created by
Recipe 002.


VERIFIED INPUT CONTRACT

Recipe 002 hands-on verified this exact logical object:

{
  "employeeName": "Jamie Chen",
  "requestType": "Access",
  "description": "I need access to the project workspace.",
  "isUrgent": false
}

Properties:

employeeName
    string

requestType
    string with one of:
    Hardware
    Software
    Access
    Other

description
    string

isUrgent
    boolean

This is the input contract for Recipe 003.

Do not reach backward to the original Microsoft Forms dynamic-content fields
when configuring SharePoint.

Use values from:

Normalized Request

This distinction is a central learning point of Recipe 003.


EXISTING VERIFIED FLOW

Reuse:

Northstar IT Service Request - Inspect Response

It currently contains:

When a new response is submitted
    ->
Get response details
    ->
Normalized Request

Recipe 003 extends the SAME flow to:

When a new response is submitted
    ->
Get response details
    ->
Normalized Request
    ->
Create item

Do not create another Form.

Do not create another Power Automate flow merely for Recipe 003.


SHAREPOINT RESOURCES

Recipe 003 introduces the Northstar SharePoint destination.

Use:

SharePoint site:
Northstar

SharePoint list:
IT Service Requests

Do not create SharePoint resources during this AUTHORING invocation.

The later build.md execution will create or configure them.


SHAREPOINT LIST DESIGN

Keep the list deliberately small.

It exists to persist the normalized request produced by Recipe 002.

The business data should represent:

- employeeName
- requestType
- description
- isUrgent

Choose SharePoint column display names that are understandable to a business
user.

Prefer:

Employee Name
Request Type
Description
Urgent

Use SharePoint column types appropriate to the verified normalized values.

Expected intent:

Employee Name
    Single line of text

Request Type
    Choice

    Choices:
    Hardware
    Software
    Access
    Other

Description
    Multiple lines of text

Urgent
    Yes/No

Verify the current SharePoint capabilities and terminology against official
Microsoft guidance before finalizing the recipe.


SHAREPOINT TITLE COLUMN

Handle SharePoint's default Title column deliberately.

Do not leave the reader with a mysterious or unexplained Title requirement.

For this recipe, prefer the simplest current supported approach that keeps
the learning focus on the four normalized request properties.

Investigate current SharePoint/Microsoft Lists behavior for the default Title
column.

If the Title column can safely be made optional and hidden from the primary
list experience using the current supported UI, prefer that approach.

Do NOT invent a synthetic title merely because SharePoint historically
created a Title column.

Do NOT duplicate Employee Name into Title merely to fill it.

Do NOT introduce request-number generation in this recipe merely to populate
Title.

If current SharePoint behavior requires a different treatment, document the
actual supported behavior and explain it briefly.

Report the chosen Title treatment when authoring completes.


DATA MAPPING

The SharePoint Create item action must consume the output of:

Normalized Request

Conceptually map:

Normalized Request.employeeName
    ->
SharePoint Employee Name

Normalized Request.requestType
    ->
SharePoint Request Type

Normalized Request.description
    ->
SharePoint Description

Normalized Request.isUrgent
    ->
SharePoint Urgent

Do not map:

Forms Employee Name
Forms Request Type
Forms Description
Forms Urgent?

directly into Create item.

Recipe 002 deliberately established the normalization boundary.

Recipe 003 must use it.


POWER AUTOMATE EXPRESSIONS

Determine the smallest clear and currently supported Power Automate approach
for referencing individual properties from the Normalized Request Compose
output.

Use current official Microsoft syntax/guidance.

Do not assume a property-reference expression without verifying it.

Prefer direct property access from the Compose output if currently supported.

Do not introduce Parse JSON merely to make dynamic-content tokens appear.

Do not introduce unnecessary variables or extra Compose actions.

Document the exact expressions that Recipe 003 will use.


WHAT THIS RECIPE SHOULD TEACH

The reader should understand:

- what a SharePoint site is in this scenario
- what a SharePoint list is
- why a list is useful for structured business data
- how persistence differs from transient flow-run data
- how Power Automate's SharePoint Create item action works
- how normalized workflow data maps into typed SharePoint columns
- how a boolean maps naturally into a SharePoint Yes/No column
- how a controlled request type maps into a SharePoint Choice column
- how to inspect Create item in Power Automate run history
- how to verify that a real list item was persisted

Do not turn this into a broad SharePoint administration tutorial.


IMPORTANT ARCHITECTURAL LESSON

Preserve the boundary established by Recipe 002:

Microsoft Forms
    ->
Northstar normalized request
    ->
SharePoint storage

Explain why Recipe 003 consumes the normalized representation rather than
the Forms representation.

The Form is the input system.

Normalized Request is the workflow's deliberate internal representation.

SharePoint is now the persistence destination.

This means future changes to the Form do not automatically imply that every
downstream action should directly depend on raw Forms output.

Keep this explanation practical.

Do not turn it into an elaborate architecture discussion.


KISS

Do not over-engineer the SharePoint design.

Do not add fields such as:

- Request ID
- Employee ID
- Department
- Manager
- Created By
- Status
- Priority
- Approval State
- Assigned To
- Deadline
- SLA
- Category
- AI Classification
- Archive URL

unless SharePoint itself creates standard system metadata automatically.

Do not add application-generated timestamps when SharePoint already provides
standard created/modified metadata.

The purpose of Recipe 003 is persistence, not building a complete service
management system.


RECIPE DIRECTORY

Create:

recipes/003-sharepoint-list/

At minimum:

recipes/003-sharepoint-list/
    README.md
    prompts/
        author.md
        build.md

author.md preserves this authoring prompt.

build.md will later perform the real Microsoft hands-on exercise.

Do not create additional files unless they materially improve the recipe.


RECIPE README

Follow the established recipe format and style.

Keep it concise and practical.

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

Recipes 001 and 002 being hands-on verified are prerequisites.


CURRENT MICROSOFT EXPERIENCE

Use current official Microsoft guidance and current UI terminology.

Verify the current official Microsoft web entry points and relevant
instructions for:

- SharePoint / Microsoft Lists
- Power Automate
- creating a SharePoint site if required
- creating a list
- configuring list columns
- configuring the default Title column
- SharePoint Create item in Power Automate

Do not blindly use stale portal names or UI instructions.

Microsoft may surface list functionality through SharePoint, Microsoft Lists,
or Microsoft 365 experiences.

Describe what the reader should actually expect using current Microsoft
guidance.


SHAREPOINT SITE CREATION

The build prompt should first inspect whether a suitable Northstar SharePoint
site already exists.

If:

Northstar

already exists and is appropriate for this cookbook, reuse it.

Do not create duplicate sites.

If it does not exist, create only the minimum Northstar SharePoint site
required by Recipe 003.

Do not create department-specific sites.

Do not create a broad fictional Northstar intranet.

Do not populate unrelated content.

The site exists only as the shared Northstar SharePoint boundary needed by
the cookbook.


SHAREPOINT LIST CREATION

The build prompt should inspect whether:

IT Service Requests

already exists in the Northstar site.

If it exists and matches the intended recipe structure, reuse it.

If it does not exist, create it.

If it exists but differs materially, do not destructively change real data
without understanding why.

Report the difference and take the smallest safe action consistent with the
cookbook.


RECIPE-LOCAL BUILD PROMPT

Create:

recipes/003-sharepoint-list/prompts/build.md

This should be the executable hands-on prompt.

Later I should be able to give an agent only:

Read and follow recipes/003-sharepoint-list/prompts/build.md exactly.

The build prompt should instruct the agent to:

1. Read AGENTS.md and Recipe 003 README.md.

2. Inspect the existing Northstar environment before changing anything.

3. Confirm Recipe 001 and Recipe 002 resources still exist.

4. Confirm the existing Power Automate flow contains:

   When a new response is submitted
       ->
   Get response details
       ->
   Normalized Request

5. Inspect whether the Northstar SharePoint site already exists.

6. Reuse it if appropriate or create the minimum site if absent.

7. Inspect whether the IT Service Requests list exists.

8. Reuse it if appropriate or create it if absent.

9. Configure only the columns required by Recipe 003.

10. Handle the default Title column according to the verified current
    SharePoint behavior documented by the recipe.

11. Add one SharePoint Create item action after Normalized Request.

12. Configure Create item using properties from Normalized Request, NOT raw
    Forms fields.

13. Submit a NEW test response through the existing Form.

14. Verify the Power Automate run succeeds.

15. Inspect the Normalized Request output.

16. Inspect the Create item action.

17. Open the SharePoint list and verify that an actual new item exists.

18. Compare every persisted business value with the normalized object.

19. Capture unexpected Microsoft UI behavior, authentication/MFA issues,
    SharePoint defaults, connector behavior, expression behavior, redirects,
    or other real-world issues.

20. Correct Recipe 003 README.md and build.md based on actual observed
    behavior after successful execution.

21. Mark Recipe 003 hands-on verified only after the persisted SharePoint
    item has actually been observed.

22. Stop without beginning Recipe 004.


TEST SUBMISSION

Use a new fictional request so Recipe 003 can be distinguished from the
Recipe 001 and Recipe 002 tests.

Use:

Employee Name:
Morgan Lee

Request Type:
Hardware

Description:
I need a replacement keyboard for my workstation.

Urgent?:
Yes

Expected normalized object:

{
  "employeeName": "Morgan Lee",
  "requestType": "Hardware",
  "description": "I need a replacement keyboard for my workstation.",
  "isUrgent": true
}

Expected SharePoint business values:

Employee Name:
Morgan Lee

Request Type:
Hardware

Description:
I need a replacement keyboard for my workstation.

Urgent:
Yes

This test deliberately verifies the opposite boolean case from Recipe 002.

Recipe 002 verified:

No -> false

Recipe 003 should additionally demonstrate:

Yes -> true


HANDS-ON VERIFICATION

Authoring Recipe 003 does NOT make it verified.

Initial status:

authored; hands-on verification pending

Hands-on verification later requires observing:

- Northstar SharePoint site exists
- IT Service Requests list exists
- intended columns exist with appropriate types
- existing Recipe 001 Form is reused
- existing Recipe 001/002 flow is reused
- new Form response is received
- Normalized Request produces the expected object
- isUrgent is Boolean true
- Create item succeeds
- an actual SharePoint list item is created
- Employee Name matches
- Request Type matches
- Description matches
- Urgent matches
- the complete flow run succeeds

Only after those observations may Recipe 003 be marked:

hands-on verified


REAL-WORLD FEEDBACK

The cookbook uses:

author
    ->
execute
    ->
observe
    ->
correct
    ->
verify

Do not treat authored instructions as proof that Microsoft behaves that way.

Recipe 002 demonstrated why this matters:

The originally anticipated createObject approach was unavailable in the
actual Power Automate environment.

The verified implementation instead used nested setProperty() expressions.

Recipe 003 must build on the ACTUAL verified Recipe 002 implementation.

If SharePoint or Power Automate behaves differently from the authored Recipe
003 instructions, capture that behavior and correct the recipe rather than
pretending the authored instructions were correct.


AGENT CAPABILITY / HUMAN INTERACTION

Different agents have different capabilities.

If the agent can safely perform a step with available authenticated tooling,
it may do so.

If human interaction, MFA, authentication, browser recovery, approval, or UI
interaction is required, give the human the smallest exact action necessary
and wait.

Never fabricate successful execution.

Observed behavior in the real Microsoft environment is the basis for
hands-on verification.


SECURITY

Keep security guidance proportional to the recipe.

Explain that:

- SharePoint permissions control access to the stored requests
- the Power Automate connection operates using an authenticated Microsoft
  identity/connection
- business data should not automatically be exposed to everyone merely
  because it is stored in SharePoint

Do not introduce a complex security architecture in this beginner recipe.


WHY AI ISN'T USED

Explicitly explain why Recipe 003 does not require AI.

The requirement is deterministic:

take a known normalized object and persist its known properties into known
SharePoint columns.

Direct mapping is predictable and testable.

An LLM or runtime agent would add no useful capability here.

AI coding agents may help BUILD the solution.

That does not mean AI belongs INSIDE the runtime workflow.


AZURE / POWER PLATFORM

Do not modify:

rg-northstar

Recipe 003 requires no Azure service.

Continue using the existing:

DecisionForge (default)

Power Platform environment where applicable.

Do not create another Power Platform environment.

Do not add Dataverse capacity.

Do not incur unnecessary licensing/capacity costs.


DO NOT IMPLEMENT FUTURE CONCEPTS

Do not implement Recipe 004.

Do not create:

- OneDrive archive files
- Teams notifications
- Adaptive Cards
- Graph integration
- Entra application registrations
- Azure services
- Foundry resources
- models
- AI Search
- agents
- AI classification
- databases
- application hosting

Do not add future workflow concepts to SharePoint merely because they may be
useful later.

Recipe 003 is about persistence.


ROADMAP / INDEXES

After authoring Recipe 003, update ROADMAP.md or existing indexes only as
necessary to record:

Recipe 001:
hands-on verified

Recipe 002:
hands-on verified

Recipe 003:
authored; hands-on verification pending

Recipe 004:
not implemented

Do not make unrelated roadmap changes.


AUTHORING VS EXECUTION

This invocation is the AUTHORING phase.

It creates:

README.md
prompts/author.md
prompts/build.md

It does NOT create the SharePoint site.

It does NOT create the SharePoint list.

It does NOT modify the Power Automate flow.

It does NOT submit the test response.

The hands-on phase will be invoked separately using build.md.


STOP CONDITION

For this invocation, AUTHOR Recipe 003 only.

Do NOT execute the hands-on Recipe 003 exercise yet.

Do NOT create SharePoint resources yet.

Do NOT modify the existing Power Automate flow yet.

Do NOT submit another Form response yet.

Do NOT begin Recipe 004.

After creating Recipe 003 documentation and its recipe-local prompts, STOP.

Report:

1. Files created.
2. Files changed.
3. Recipe 003 learning objective.
4. Exact SharePoint site design.
5. Exact SharePoint list design.
6. Exact columns and SharePoint column types.
7. Exact treatment of SharePoint's default Title column and why.
8. Exact Power Automate expressions used to access each property of
   Normalized Request.
9. Confirmation that Create item maps from Normalized Request rather than
   raw Forms fields.
10. Exact test submission.
11. Expected normalized object.
12. Expected SharePoint values.
13. Any current Microsoft behavior that required changing the proposed
    design.
14. Confirmation that this authoring prompt was preserved as
    recipes/003-sharepoint-list/prompts/author.md.
15. Confirmation that the separate hands-on prompt was created as
    recipes/003-sharepoint-list/prompts/build.md.
16. Current Recipe 003 status.
17. Exact short prompt I should give the agent next to perform the real
    hands-on Recipe 003 exercise.

Do not begin Recipe 004.
