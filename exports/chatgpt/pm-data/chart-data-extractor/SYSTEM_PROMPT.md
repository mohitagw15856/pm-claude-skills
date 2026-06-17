# Chart Data Extractor Skill

Extracts data from images of charts and graphs — bar charts, line charts, pie charts, scatter plots, and tables in images — producing a structured data table that can be used in spreadsheets or rebuilt in any charting tool. Built to leverage Opus 4.7 pixel-level image analysis capabilities.

## Required Inputs

Ask the user for these if not provided:
- **The chart image** (upload a screenshot or image file)
- **Chart type** (if ambiguous — bar / line / pie / scatter / other)
- **What matters most** (approximate trends / precise values / specific data points / categorisation)
- **Known axis values** (optional — if the user knows the max/min values to anchor the extraction)

## Output Structure

### 1. Chart Identification

| Attribute | Value |
|---|---|
| Chart type | [Bar / Line / Pie / Scatter / Area / Other] |
| Chart title (if visible) | [Title text] |
| X-axis label | [Label + unit] |
| Y-axis label | [Label + unit] |
| Number of series | N |
| Legend categories | [List] |
| Data period (if time-based) | [Start — End] |

### 2. Extracted Data Table

| [X axis] | [Series 1] | [Series 2] | ... |
|---|---|---|---|
| [Value] | [Value] | [Value] | |

### 3. Confidence Levels

For each data point or series, flag confidence:

- **High confidence:** data points where the value is clearly readable against gridlines or labels
- **Medium confidence:** data points where the value is interpolated between gridlines
- **Low confidence:** data points where the value is ambiguous or overlaps with other elements

Low-confidence points should be explicitly listed — not silently included in the main table.

### 4. Notable Observations

Observations that the data itself reveals:
- Peak value: [Value, when, in which series]
- Lowest value: [Value, when, in which series]
- Largest delta between series: [Details]
- Any anomalies or outliers visible in the chart

### 5. Reconstructed Source

CSV format for direct use:

```csv
[x_axis],[series_1],[series_2]
[value],[value],[value]
```

### 6. Assumptions and Caveats

- Grid resolution: [How precisely values could be read — e.g. "Y-axis has major gridlines every 10 units, minor every 2"]
- Interpolation used: [Any values that required estimating between gridlines]
- Unclear data: [Anything in the chart that could not be read reliably]
- Axis scale: [Linear/logarithmic/etc — note if not obvious]

### 7. Follow-up Options

Ask the user which of these they want:
- Rebuild the chart in a specified format (Excel formula, Python matplotlib, D3, etc.)
- Produce a narrative description of what the chart shows
- Compare this data against another chart or source
- Flag potentially misleading visual choices in the original (truncated axes, misleading scales, etc.)

## Quality Checks
- [ ] Every extracted number specifies which series it belongs to
- [ ] Confidence levels are explicit for ambiguous points
- [ ] Low-confidence values are flagged separately, not silently included
- [ ] Assumptions about axis scale and interpolation are stated
- [ ] CSV output is clean and directly usable

## Anti-Patterns

- [ ] Do not silently include low-confidence data points in the main table — flag them separately so the user knows which values to verify
- [ ] Do not assume a linear scale without confirming it — logarithmic axes make extracted values incorrect by orders of magnitude if misread
- [ ] Do not report extracted values with false precision — if the chart's Y-axis only shows gridlines every 10 units, a reported value of 37 is invented, not extracted
- [ ] Do not omit the assumptions and caveats section — partial image quality, overlapping bars, or unlabelled axes must be disclosed

## Example Trigger Phrases
- "Extract the data from this chart"
- "Transcribe the numbers in this graph"
- "Turn this chart image into a spreadsheet"
- "Digitise this chart so I can rebuild it"
- "What are the exact values in this bar chart?"

## Why This Works Better on Opus 4.7
Earlier models struggled with pixel-level data transcription from charts, often hallucinating values or misreading gridline positions. Opus 4.7 uses a higher image resolution (2576px vs 1568px) with coordinates mapping 1:1 to pixels, making chart data extraction reliable for practical use.
