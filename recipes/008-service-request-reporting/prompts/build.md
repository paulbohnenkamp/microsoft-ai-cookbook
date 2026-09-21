# Build Recipe 008 in the Northstar environment

You are helping a reader perform Recipe 008 from this directory.

## Goal

Create and verify one small Power BI report in the browser over the existing
Northstar SharePoint `IT Service Requests` list. Keep the report in `My
workspace`. Do not create a shared workspace, publish to other workspaces,
embed the report, or add capacity.

The report page is named `Service request overview`.

## Read first

Read:

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `docs/cookbook-environment.md`
- `recipes/008-service-request-reporting/README.md`
- `recipes/003-sharepoint-list/README.md`
- `recipes/006-service-request-tracking/README.md`
- `recipes/007-manage-service-request/README.md`

Read the official references linked in the Recipe 008 README before relying on
remembered Power BI or SharePoint navigation.

## Authentication and safety

Use the existing signed-in Microsoft account. Preserve the browser session if
the reader must complete MFA. Do not request or handle passwords, tokens,
keys, secrets, or connection strings.

Do not modify Forms, Power Automate, Teams, SharePoint records, Azure, Power
Platform, Power Apps, Power BI licensing, or Fabric capacity. Do not start
Recipe 009.

## Inspect before creating the report

1. Confirm Recipes 001–007 are hands-on verified in the repository.
2. Confirm the `Northstar` SharePoint site and `IT Service Requests` list
   exist.
3. Inspect the live list schema and confirm the requester and operational
   fields from Recipe 006.
4. Count the current records and inspect the distributions of Request Type,
   Status, Priority, Urgent, and Assigned To.
5. Confirm that the existing four verified records are present. Do not reset
   or rewrite them.
6. Open Power BI in the browser and confirm that the signed-in account can
   create content in `My workspace`.
7. If Power BI is unavailable, requires a paid license for this own-workspace
   exercise, or requires a trial or capacity, stop and report the blocker.

The authored design does not add reporting-only records. Do not submit Forms
responses or create SharePoint items during this recipe.

## Connect the SharePoint list

1. Open the existing `Northstar` SharePoint site's `IT Service Requests` list.
2. Use **Export > Export to Power BI**.
3. Sign in with the current Microsoft account if Power BI asks for credentials.
4. Review the displayed SharePoint source before continuing.
5. Name the semantic model `Northstar IT Service Requests`.
6. Save it in `My workspace`.
7. Open the semantic model and create a report from it. If the semantic model
   details page does not expose report creation, use the supported workspace
   path **New report > Pick a published semantic model**, select
   `Northstar IT Service Requests`, and continue in the browser editor.

If the semantic model already exists from an earlier safe stop, reuse it rather
than exporting the list again.

Do not use Power BI Desktop. Do not use a CSV, Excel workbook, or another
disconnected source.

## Inspect imported fields

Before creating visuals, inspect the imported table and record the actual
representation and sample values for:

- Request Type: Choice values.
- Status: Choice values.
- Priority: Choice values. Confirm that `Low`, `Normal`, and `High` are
  available in the source data or report field.
- Urgent: the imported Boolean representation of Yes and No.
- Assigned To: Person or Group representation.
- Created and Assigned Date: Date and Time representation and timezone shown.

Use the imported field names exposed by the current Power BI Service. Do not
invent a transformation or rename a field just to match the authored text.

The selected visuals do not use Assigned To, Created, or Assigned Date. Do not
add a Power Query transformation. If the service exposes a typed field in a
form that prevents the selected visuals from working, stop and report the
observed behavior.

## Create the report

Create one page named `Service request overview`.

Do not require an explicit DAX measure. Use the simplest supported count
aggregation over the imported numeric SharePoint `ID` field for the total card
and category visuals.
The browser editing experience observed for this exercise did not expose the
required measure-creation option. Do not introduce Power BI Desktop, a paid
license, a trial, Fabric capacity, or another tool solely to create one
measure.

Add these visuals:

1. A card counting `ID`.
2. A column chart with Status as the category and an implicit count of
   `ID` as the value.
3. A column chart with Priority as the category and an implicit count of
   `ID` as the value.
4. A bar chart with Request Type as the category and an implicit count of
   `ID` as the value.
5. A donut chart with Urgent as the category and a count of
   `ID` as the value.

Add slicers for Status, Priority, and Request Type. Do not add other visuals,
calculated tables, relationships, time intelligence, or complex DAX.

## Refresh and reconcile the results

1. Use the available Power BI refresh control after the report is created.
   Record whether it refreshes the semantic model or only refreshes report
   visuals in the current browser experience.
2. Record the actual total shown by the card.
3. Record the actual category counts for Status, Priority, Request Type, and
   Urgent.
4. Filter or group the live SharePoint list to independently check the same
   counts.
5. Confirm that the report total equals the number of current source records.
6. Confirm that selected category counts match the SharePoint source.

Use the live final dataset as the expected result. Do not assume the baseline
counts remain unchanged if the source has changed.

## Failure handling

If Power BI cannot connect to the list, the account lacks the required
capability, the browser path requires paid licensing, or a field cannot be
used as designed, stop. Do not purchase a license, start a trial, create
capacity, switch to SharePoint-native reporting, or fabricate verification.

If the report is stale, use the supported refresh path and repeat the source
comparison. Do not configure a gateway or scheduled refresh.

## Documentation and stop condition

After successful verification, update this README and this build prompt with
the observed Power BI navigation, semantic model name, table name, imported
field representations, aggregation behavior, report counts, refresh behavior,
authentication or licensing issues, and source reconciliation results.

Mark Recipe 008 hands-on verified only after the report and source counts
match. Do not update Recipe 009 or begin the next recipe.

The verified browser path used `My workspace > New report > Pick a published
semantic model` because the semantic-model details page did not expose report
creation in this region. The saved report used the existing
`Northstar IT Service Requests` model, imported table `table`, page
`Service request overview`, and the `Count of ID` aggregation. The report
refresh control refreshed the visuals without source changes. The report and
slicers matched the four-record SharePoint source: Status New 3/In Progress 1,
Priority Normal 3/High 1, Request Type Hardware 2/Software 1/Access 1, and
Urgent True 2/False 2. No Power BI or Fabric trial or paid capability was
activated.

Stop after the verification report.

## Completion report

Report:

- The SharePoint site and list reused.
- The Power BI Service path used.
- The semantic model name and workspace.
- Whether Power BI Desktop was required.
- The account or licensing behavior observed.
- The imported representations of Choice, Yes/No, Person or Group, and Date
  and Time fields.
- Whether Power Query transformations were required.
- The report page and visuals created.
- The aggregation used for the total instead of a DAX measure.
- The slicers created.
- The actual report counts.
- The matching SharePoint source counts.
- Refresh behavior.
- Security or permission observations.
- Files changed.
- Confirmation that Recipe 008 is hands-on verified.
- Confirmation that Recipe 009 was not started.
