# Recipe 008: Report on service requests

**Status:** authored; hands-on verification pending

## Business problem

Northstar now has structured service-request data. Managers and support staff
need counts, distributions, and filters without inspecting each list item.

Questions such as "How many requests are High priority?" are structured-data
questions. They need reporting and aggregation, not runtime AI.

## What you'll learn

You will connect Power BI in the browser to the existing Northstar SharePoint
list, inspect the imported fields, create one small semantic model and report,
and compare report results with the source list.

The progression is:

```text
capture -> normalize -> persist -> track -> manage -> report
```

The new concept is reporting over structured enterprise data. This recipe does
not add a model call, an agent, or a semantic search step.

## Microsoft technologies used

- SharePoint / Microsoft Lists
- Power BI Service in a browser

Power BI Desktop is not part of this recipe. Microsoft documents Power BI
Desktop with Windows requirements, while the Power BI Service can create
reports in a browser. The browser path fits the cookbook's Mac environment.

## Prerequisites

- Recipes 001–007 are hands-on verified.
- The `Northstar` SharePoint site and `IT Service Requests` list exist.
- The list contains the verified requester and operational fields.
- The current account can open Power BI and create content in `My workspace`.
- The current account can read the Northstar SharePoint list.

This recipe does not require Power BI Pro, Premium Per User, Premium capacity,
Fabric capacity, Azure resources, or Power Platform capacity for creating and
viewing the report in the author's own `My workspace`. Sharing with other
users is outside the exercise. Power BI may require a paid license for shared
workspaces or sharing.

## How it works

Use the existing list as the only report source:

```text
Northstar / IT Service Requests
    -> SharePoint Export -> Export to Power BI
    -> Power BI semantic model in My workspace
    -> Power BI report
```

The build uses the current SharePoint list action **Export > Export to Power
BI**. Power BI creates a semantic model from the list, then the reader creates
a report from that model in the Power BI Service.

Power BI connects with the signed-in Microsoft identity. The account's
SharePoint permissions determine which list data the semantic model can read.
Review the source before continuing if Power BI shows a source-review step.

## Data and field handling

The report uses these fields:

| Field | Reporting use |
| --- | --- |
| Service Request ID | Detail identity and source reconciliation |
| Request Type | Category counts |
| Status | Status counts |
| Priority | Priority counts |
| Urgent | Yes and No counts |

Keep `Created` and `Assigned Date` in the imported model for inspection, but do
not create a time-series visual. Do not use `Employee Name` or `Description` in
aggregate visuals.

Inspect the imported representation of every typed field before creating
visuals:

- SharePoint Choice fields must expose readable values for Request Type,
  Status, and Priority.
- The Yes/No field must expose readable `Yes` and `No` values for Urgent.
- The Person or Group field Assigned To may expose a record, an email-shaped
  value, or a display name. This report does not use Assigned To in an
  aggregate visual, so no transformation is required for the selected design.
- Date and Time fields remain source fields. The report does not create a date
  hierarchy or time-series calculation.

If the service exposes a field in a form that prevents the selected visuals
from working, stop and record the observed behavior. Do not add a second data
source or redesign the model during execution.

## Report design

Create one report page named `Service request overview` with these visuals:

| Visual | Fields | Business question |
| --- | --- | --- |
| Card | `Total Requests` | How many requests exist? |
| Column chart | Status and count of Service Request ID | How many requests are in each status? |
| Column chart | Priority and count of Service Request ID | How many requests are at each priority? |
| Bar chart | Request Type and count of Service Request ID | What is the request-type distribution? |
| Donut chart | Urgent and count of Service Request ID | How many requests are urgent? |

Add slicers for Status, Priority, and Request Type. Keep the page to these
visuals and slicers. Do not add decorative charts.

Create one explicit measure:

```DAX
Total Requests = COUNTROWS('IT Service Requests')
```

Use implicit counts of `Service Request ID` for the category visuals. Do not
add calculated tables, relationships, time intelligence, or complex DAX.

## Dataset

Use the existing four verified list records. They already provide enough
variation for this small report: Hardware, Software, and Access request types;
New and In Progress statuses; Normal and High priorities; Yes and No Urgent
values; and blank and populated Assigned To values.

Do not add reporting-only records. Do not rewrite the verified records to make
the charts look more balanced. The build must derive final counts from the
actual list at execution time.

The verified baseline currently includes:

| Question | Baseline count |
| --- | ---: |
| Total requests | 4 |
| Status = New | 3 |
| Status = In Progress | 1 |
| Priority = Normal | 3 |
| Priority = High | 1 |
| Request Type = Hardware | 2 |
| Request Type = Software | 1 |
| Request Type = Access | 1 |
| Urgent = Yes | 2 |
| Urgent = No | 2 |

These counts are a starting reference, not a substitute for inspecting the
live list.

## Refresh and verification

The semantic model reads from SharePoint. Refresh the model after a list change
to see current data. Do not configure a gateway or scheduled refresh for this
small exercise.

Compare the report with the live list. Verify the total and the counts for
Status, Priority, Request Type, and Urgent. Open the source list and check
several category counts by filtering or grouping. A report that renders is not
enough evidence.

## Security considerations

- Use the signed-in account's existing SharePoint permissions.
- Keep the report in `My workspace` for this exercise.
- Do not share the report or embed it in SharePoint.
- Treat Employee Name, Assigned To, and Description as business data.
- Do not expose more detail than a reader needs for the aggregate questions.
- Do not record passwords, tokens, keys, secrets, or connection strings.

## Common failure cases

- **Power BI is unavailable.** Stop and report the account or licensing
  limitation. Do not start a trial, buy a license, or switch to another
  reporting technology.
- **The SharePoint export is unavailable.** Stop and record the current UI and
  account capability. Do not create a CSV or disconnected workbook.
- **The list has changed.** Derive counts from the current source. Do not reset
  existing records.
- **Typed fields import unexpectedly.** Record the actual representation and
  stop if it prevents the selected visuals from working.
- **The report shows stale values.** Refresh the semantic model and compare it
  with the current SharePoint list.
- **Sharing requests a paid license.** Keep the report in `My workspace` and
  report the sharing limitation. Do not purchase or enable capacity.

## Why AI is not appropriate

Counting rows, grouping by Status, grouping by Priority, filtering by Request
Type, and counting Urgent values are deterministic operations. An LLM would
add cost and variability without improving those answers.

Later recipes may use AI to summarize descriptions, classify free text, or
find recurring themes. Recipe 008 leaves that work out of the report.

## Next steps / related recipes

Recipe 009 will compose intake, tracking, lifecycle management, Teams
presentation, and reporting. Do not author or start Recipe 009 during this
recipe.

## Official references

- [Create a semantic model from a SharePoint list](https://learn.microsoft.com/en-us/power-bi/connect-data/create-dataset-sharepoint-online-list)
- [SharePoint Online list connector](https://learn.microsoft.com/en-us/power-query/connectors/sharepoint-online-list)
- [Create a report on a SharePoint list](https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-sharepoint-online-list)
- [Power BI reports overview](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-overview)
- [Power BI licenses for business users](https://learn.microsoft.com/en-us/power-bi/fundamentals/end-user-license)
- [Power BI service features by license type](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type)
- [Power BI Desktop system requirements](https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-get-the-desktop)

## Documentation status

Recipe 008 is authored from current Microsoft guidance and the verified
Recipes 001–007 state. It has not been executed in the Northstar environment.
