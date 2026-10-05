# Tracker dashboard

Needs the community plugin **Dataview**. Keep the notes made from the templates in this vault; the tables below update themselves.

## Open job applications

```dataview
TABLE company, role, stage, next_step, deadline
FROM ""
WHERE type = "job-application" AND stage != "rejected" AND stage != "offer-declined"
SORT deadline ASC
```

## This quarter's OKRs

```dataview
TABLE objective, owner, progress, confidence, updated
FROM ""
WHERE type = "okr"
SORT quarter DESC
```

## Recent weekly reports

```dataview
TABLE week, status, key_numbers, help_needed
FROM ""
WHERE type = "weekly-report"
SORT start DESC
LIMIT 8
```
