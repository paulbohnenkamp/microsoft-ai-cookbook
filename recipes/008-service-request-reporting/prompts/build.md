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
7. Open the semantic model and choose the option to create a new report.

Do not use Power BI Desktop. Do not use a CSV, Excel workbook, or another
disconnected source.

## Inspect imported fields

Before creating visuals, inspect the imported table and record the actual
representation and sample values for:

- Request Type: Choice values.
- Status: Choice values.
- Priority: Choice values. Confirm that `Low`, `Normal`, and `High` are
  available in the source data or report field.
- Urgent: Yes and No values.
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

Create this explicit measure:

```DAX
Total Requests = COUNTROWS('IT Service Requests')
```

Use the actual table name if Power BI preserves a different name for the
imported SharePoint list. Record the observed name.

Add these visuals:

1. A card using `Total Requests`.
2. A column chart with Status as the category and an implicit count of
   `Service Request ID` as the value.
3. A column chart with Priority as the category and an implicit count of
   `Service Request ID` as the value.
4. A bar chart with Request Type as the category and an implicit count of
   `Service Request ID` as the value.
5. A donut chart with Urgent as the category and an implicit count of
   `Service Request ID` as the value.

Add slicers for Status, Priority, and Request Type. Do not add other visuals,
calculated tables, relationships, time intelligence, or complex DAX.

## Refresh and reconcile the results

1. Refresh the semantic model after the report is created.
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

If the report is stale, refresh the semantic model and repeat the source
comparison. Do not configure a gateway or scheduled refresh.

## Documentation and stop condition

After successful verification, update this README and this build prompt with
the observed Power BI navigation, semantic model name, table name, imported
field representations, measure behavior, report counts, refresh behavior,
authentication or licensing issues, and source reconciliation results.

Mark Recipe 008 hands-on verified only after the report and source counts
match. Do not update Recipe 009 or begin the next recipe.

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
- The DAX measure created.
- The slicers created.
- The actual report counts.
- The matching SharePoint source counts.
- Refresh behavior.
- Security or permission observations.
- Files changed.
- Confirmation that Recipe 008 is hands-on verified.
- Confirmation that Recipe 009 was not started.
