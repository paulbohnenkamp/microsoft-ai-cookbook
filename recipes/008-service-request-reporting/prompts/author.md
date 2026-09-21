# Author Recipe 008: Report on service requests

This authoring prompt was preserved when Recipe 008 was authored. It records
the design decisions and research constraints for the recipe. It does not
execute the recipe or create Microsoft resources.

## Scope

Author a concise cookbook recipe and a hands-on build prompt for reporting over
the existing Northstar `IT Service Requests` SharePoint list.

Recipes 001–007 are hands-on verified. Preserve their current design and
observed records. Do not redesign those recipes, modify Microsoft resources,
start Recipe 009, or introduce runtime AI.

## Learning objective

Teach reporting over structured operational data:

```text
capture -> normalize -> persist -> track -> manage -> report
```

The report must answer deterministic questions such as total requests,
counts by Status, counts by Priority, counts by Request Type, and Urgent Yes
versus No. Explain why those questions need aggregation rather than an LLM.

## Research before choosing the technology

Use current official Microsoft documentation to compare Power BI with the
simplest SharePoint-native alternative. Verify:

- SharePoint Online list connectivity and the current Export to Power BI path.
- Power BI Service browser authoring and Power BI Desktop requirements.
- Mac limitations and whether Power BI Desktop is Windows-only.
- Free, Pro, Premium Per User, Premium capacity, and Fabric capacity needs.
- Creating content in `My workspace` versus publishing or sharing it.
- Manual and scheduled refresh behavior.
- Choice, Yes/No, Person or Group, and Date and Time field handling.
- Power Query needs and the smallest supported transformation path.

Choose Power BI only if the browser path works in the actual environment,
does not require paid capacity, and teaches a useful reporting concept. Choose
a SharePoint-native report only if Power BI adds an impractical Windows,
licensing, or setup dependency. Select one implementation. Do not leave the
execution agent choosing between technologies.

## Selected design

Select Power BI Service in a browser. Use the SharePoint list action:

```text
Northstar / IT Service Requests
    -> Export -> Export to Power BI
    -> semantic model in My workspace
    -> report in Power BI Service
```

Power BI Desktop is not required. The current Mac environment uses the
browser-based Power BI Service. Building or viewing the exercise's own report
does not require Power BI Pro when the content stays in `My workspace`, but
sharing and shared-workspace publishing may require a paid license. Do not
purchase a license, start a trial, or create capacity.

## Dataset decision

Use the four existing verified records. They already contain enough variation
for the selected report:

- Request Type: Hardware, Software, and Access.
- Status: New and In Progress.
- Priority: Normal and High.
- Urgent: Yes and No.
- Assigned To: blank and one actual tenant user.

Do not create additional records, modify existing records, or create a
disconnected CSV, workbook, or reporting database.

## Report design

Create one page named `Service request overview` with:

- a card for the explicit `Total Requests = COUNTROWS('IT Service Requests')`
  measure;
- a Status count column chart;
- a Priority count column chart;
- a Request Type count bar chart;
- an Urgent Yes or No count donut chart;
- Status, Priority, and Request Type slicers.

Use implicit counts of `Service Request ID` for category visuals. Keep Created
and Assigned Date available for inspection, but do not add time-series visuals.
Do not use Employee Name, Description, or Assigned To in aggregate visuals.

The build prompt must inspect actual imported values before creating visuals.
It must record how Choice, Yes/No, Person or Group, and Date and Time fields
appear. No Power Query transformation is required for the selected visuals.
If the imported representation prevents the selected report from working,
stop and report the behavior.

## Build and verification requirements

The build prompt must:

1. Read the recipe and relevant verified prior recipes.
2. Inspect the live Northstar list, schema, record count, and distributions.
3. Confirm Power BI browser access and the account's capability before creating
   report content.
4. Connect to the actual SharePoint list through the selected Export to Power
   BI path.
5. Inspect imported fields and values.
6. Create only the selected measure, visuals, and slicers.
7. Refresh the semantic model.
8. Reconcile report totals and category counts against the live SharePoint
   list.
9. Record actual behavior and update the README and build prompt only after a
   successful hands-on verification.

If Power BI is unavailable, licensing blocks the selected path, or the source
cannot be connected, stop. Do not buy a license, start a trial, create
capacity, switch technologies silently, or fabricate results.

## Boundaries

Do not execute Recipe 008 while authoring. Do not modify SharePoint records,
Power Automate, Teams, Forms, Azure, Power Platform, Recipe 007, or Recipe
009. Do not introduce Power BI Desktop as an unaddressed Mac dependency.
