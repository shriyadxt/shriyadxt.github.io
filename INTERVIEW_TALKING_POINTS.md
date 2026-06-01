# Interview Talking Points — Amazon Projects

Personal reference doc. Use this to prep before interviews. Each section covers:
what the project actually is, how to frame it for a hiring manager, key numbers, and likely follow-up questions.

---

## 1. AI-Powered Performance Management (COACH)

### What it actually is
COACH = Carrier Optimization & Automated Coaching Hub. A Python system that runs weekly, pulls carrier performance data from Redshift, scores each carrier on metrics (FPY, NCNS, OTA), classifies them into tiers (good/watch/action), and auto-sends coaching emails or triggers suspensions based on configurable rules.

### How to explain it
> "I built an automated system that monitors over 6,400 logistics vendors. Before my system, a manual review process could only evaluate about 4% of vendors each week — most underperformers went unnoticed for weeks. My solution ingests performance data, scores each vendor against configurable thresholds, classifies them into tiers, and automatically sends the right intervention — whether that's a coaching email, a warning, or escalation to a manager. It took coverage from 3.9% to over 94%."

### Key numbers to mention
- 6,400+ vendors monitored
- 3.9% → 94% coverage (24x improvement)
- 850+ automated actions per week
- ~20 hours/week of manual effort eliminated
- Configurable rules — non-engineers can adjust thresholds

### Likely follow-up questions
- **"How did you decide the scoring thresholds?"** → Worked with operations leads to define what "good" vs "needs coaching" looks like. Started with historical data analysis to find natural breakpoints, then iterated based on feedback. Made thresholds configurable in a YAML file so ops managers can tune without code changes.
- **"How do you handle edge cases / false positives?"** → Built in a grace period (vendors aren't flagged for a single bad week), and there's a manual override mechanism. Also added a weekly summary email to managers showing what actions the system took so they can catch anything off.
- **"What's the tech stack?"** → Python, SQL (Redshift), SMTP for emails, cron for scheduling. The scoring logic is a rule engine — not ML — because the rules needed to be transparent and auditable by non-technical stakeholders.

---

## 2. Automated Reporting Engine (FIST Flash Reports)

### What it actually is
FIST = First Inbound Shipment Tracking. A Python script that runs weekly, queries Redshift for carrier FPY (First Pass Yield) performance data, computes metrics by carrier/region/tier, renders everything into a styled HTML email dashboard using Jinja2 templates, and sends it to leadership and operations managers.

### How to explain it
> "Leadership needed weekly visibility into vendor quality metrics — specifically, how often shipments pass inspection on the first attempt, broken down by region and vendor tier. Previously an analyst spent 6+ hours pulling data, computing averages, and formatting it into a presentable email. I automated the entire thing: a Python pipeline queries the warehouse, computes 15+ KPIs, renders them into a responsive HTML dashboard with conditional formatting (red/yellow/green), and emails it to 23 stakeholders every Monday morning. Zero manual intervention."

### Key numbers to mention
- 15+ KPIs computed automatically
- 6 hours/week of manual work eliminated
- 23 stakeholders receive the report
- Conditional formatting highlights what needs attention
- Runs on cron — zero-touch after setup

### Likely follow-up questions
- **"Why HTML email instead of a BI tool like Tableau?"** → The stakeholders wanted it in their inbox, not behind a login. Email has 100% "open rate" for leadership — they see it without clicking anywhere. Also, the data needed custom computed metrics that were easier to express in Python than Tableau calculated fields.
- **"How do you handle failures?"** → If the query fails or returns empty data, the script sends a notification to me instead of sending a broken report. Also logs all runs to a tracking table in Redshift for auditability.
- **"How did you template it?"** → Jinja2 for HTML templating. The template is responsive (works on mobile), uses inline CSS for email client compatibility, and has conditional formatting logic baked into the template (colors change based on metric vs. target).

---

## 3. Full-Stack Desktop Application (Electron/React)

### What it actually is
A desktop app built with Electron + React frontend, with Python scripts running on the backend via Node child processes. It does three main things: (1) converts XML carrier data files to formatted Excel, (2) extracts ISA (Inbound Shipment Allocation) data from structured files, and (3) generates templated emails based on carrier data. It replaced 5 separate scripts that the ops team ran manually with copy-paste steps in between.

### How to explain it
> "Our operations team had 5 separate Python scripts for daily data processing — converting file formats, extracting specific fields, generating emails. Each person ran them differently, there were ~12 errors per week from copy-paste mistakes, and onboarding someone new took days. I built a desktop application with a drag-and-drop interface that unified all five workflows. You drop a file in, pick what you need, and it handles the rest. It's built with Electron and React on the frontend, with Python processing scripts on the backend communicating via IPC."

### Key numbers to mention
- 5 separate tools → 1 unified application
- ~12 errors/week → 0 (validation built in)
- 70% reduction in processing time
- Non-technical team members can use it (no terminal needed)
- Cross-platform (Windows/Mac)

### Likely follow-up questions
- **"Why a desktop app instead of a web app?"** → The team needed to process sensitive files locally (not upload to a server), the files were large (some 100MB+ XMLs), and the team didn't always have reliable VPN for a web tool. A desktop app with local processing was the right fit.
- **"How does the Python integration work?"** → Electron's main process spawns Python scripts as child processes via Node's `child_process`. The React frontend communicates with the main process via Electron IPC. Results come back as JSON and render in the UI.
- **"What was the hardest part?"** → Getting the XML parsing to handle inconsistent schemas. Different vendors sent slightly different XML structures. I built a flexible parser with fallback logic that handles ~15 known variants.

---

## 4. Team Productivity Automation (Clockify Scorecard)

### What it actually is
A weekly pipeline that: (1) calls the Clockify API to pull time entries for 24 team members, (2) runs a Python ETL script that computes utilization rates, task completion ratios, and WoW trends, (3) uploads the results to Redshift for historical tracking, and (4) generates and emails a formatted scorecard to managers.

### How to explain it
> "I built an end-to-end automation that turns raw time-tracking data into weekly productivity scorecards. It pulls data from Clockify's API, computes individual and team-level KPIs — utilization rate, task completion, week-over-week trends — stores everything in Redshift for historical analysis, and auto-emails a formatted report to managers every Monday. Before this, a manager spent 4 hours manually exporting CSVs and doing the math in Excel, and the formulas were different every week."

### Key numbers to mention
- 24 team members tracked
- 4 hours/week saved for managers
- 52 automated reports delivered per year
- Historical data in Redshift enables trend analysis
- Consistent methodology — no more formula drift

### Likely follow-up questions
- **"How do you handle edge cases like PTO or holidays?"** → The script checks against a holiday calendar and PTO records (from a separate data source). If someone was on PTO, their expected hours are adjusted so their utilization isn't unfairly penalized.
- **"What does the scorecard actually show?"** → Hours logged vs. expected, utilization %, tasks completed, a WoW delta, and a team ranking. Color-coded so managers can scan it in 30 seconds.
- **"Why Redshift instead of just emailing the data?"** → We wanted historical trends — "is this person consistently low, or is this just one bad week?" Having it in a warehouse lets us query 12-week trends and compare across quarters.

---

## 5. Serverless Analytics Pipeline (Manifest Accuracy)

### What it actually is
An AWS Lambda function (Python) triggered on a schedule that connects to Redshift, runs queries to compute manifest accuracy metrics (what was declared on a shipment manifest vs. what actually arrived), generates an interactive HTML dashboard with the results, and makes it accessible to the team. It tracks discrepancies like weight mismatches, count variances, address errors, and missing bills of lading.

### How to explain it
> "I built a serverless pipeline that proactively monitors shipment accuracy. Before this, discrepancies between what was declared and what arrived were only discovered when someone complained — sometimes days later. My Lambda function runs on a schedule, queries 34,000+ records from Redshift, computes accuracy by category and region, and renders an interactive dashboard. It's completely serverless — zero infrastructure cost, auto-scales, and I don't manage any servers."

### Key numbers to mention
- 34,000+ records analyzed per run
- 98.4% accuracy rate tracked (improved 0.6% after launch due to visibility)
- 12ms average Lambda execution time
- $0 infrastructure cost (serverless)
- Catches discrepancies same-day instead of days later

### Likely follow-up questions
- **"Why Lambda instead of a cron job on EC2?"** → Cost and maintenance. Lambda is $0 when not running, auto-scales, and I don't have to patch servers. The workload is bursty (runs once, finishes in seconds) — perfect Lambda use case.
- **"How does it connect to Redshift?"** → Uses the Redshift Data API (async query execution), which doesn't require a VPC connection from Lambda. Query → wait for completion → fetch results → render.
- **"What happens when accuracy drops?"** → The dashboard uses conditional formatting to highlight problem areas. I also built threshold-based alerting — if accuracy drops below a configurable target, it sends a Slack notification to the operations lead.

---

## 6. Compliance & Onboarding Automation (Carrier Suspension)

### What it actually is
Python scripts that: (1) take a batch of vendor IDs (USDOT numbers, SCAC codes), (2) query the FMCSA (Federal Motor Carrier Safety Administration) API and other external databases to verify validity, (3) route results into workflows — approved vendors proceed to onboarding, expired/invalid ones get flagged or auto-suspended, (4) send proactive reminders when credentials are about to expire.

### How to explain it
> "I automated the vendor credential verification process. Before, a team member would manually look up each vendor's government registration — typing IDs into websites one at a time. A batch of 500 took 3+ days. I wrote Python scripts that call external verification APIs in batch, validate the results against business rules, and automatically route vendors into the right workflow: approved, flagged for review, or rejected. It also proactively monitors for upcoming expirations and sends reminders before credentials lapse."

### Key numbers to mention
- 3,800+ credentials verified
- 89% auto-processed (no human in the loop)
- 3 days → minutes for a full batch
- Proactive expiration monitoring (catches issues before they become problems)
- 99% validation accuracy

### Likely follow-up questions
- **"How do you handle API rate limits?"** → Batch processing with configurable concurrency and exponential backoff. I chunk requests into groups of 50 with delays between batches to respect the API's rate limits.
- **"What if the external API is down?"** → The script retries with backoff. If it still fails, those vendors are flagged as "unable to verify" and routed to manual review — never auto-approved without verification.
- **"How do you handle false negatives?"** → There's a manual override workflow. If a vendor is incorrectly flagged, an ops manager can mark them as verified with a reason note. The system learns from these overrides to refine matching logic (e.g., handling name variations).

---

## 7. Complex SQL & Business Intelligence (WBR Queries)

### What it actually is
A library of 30+ SQL queries (Redshift) that power the Weekly Business Review (WBR). These compute metrics like FPY (First Pass Yield), NCNS (No-Call No-Show rate), OTA (On-Time Arrival), White Glove service performance, and carrier tier classification — across both US and Canada networks. The queries use CTEs, window functions, conditional aggregation, date spine generation, and multi-table joins.

### How to explain it
> "I authored a standardized library of 30+ analytical SQL queries that became the single source of truth for our executive weekly reviews. Before, different analysts wrote their own queries with different logic — the same metric would show different numbers depending on who computed it. I standardized all 12 KPI definitions, handled edge cases consistently, and documented everything. The queries use advanced patterns — multi-level CTEs, window functions for week-over-week comparisons, conditional aggregation for pivot-style outputs, and joins across 5+ tables."

### Key numbers to mention
- 30+ production queries
- 12 KPIs standardized
- 2 regions (US + Canada) with different business rules handled in same queries
- 5x faster report prep (from hours to minutes)
- Used by multiple teams as the canonical source

### Likely follow-up questions
- **"What's the most complex query you wrote?"** → The carrier tier classification query. It uses a CTE chain: first computes raw metrics per carrier over a rolling 4-week window, then applies business rules (different thresholds for different service types), then classifies into tiers, then computes WoW movement (who improved/declined). About 200 lines of SQL with 3 CTEs and window functions.
- **"How did you handle the US vs. Canada differences?"** → The same query handles both using conditional logic (CASE WHEN region = ...). Thresholds differ by region, and some metrics only apply to one region. I parameterized everything so it's one query, not two copies.
- **"How did you ensure correctness?"** → I validated against historical manual calculations for 8 weeks of data. Also built a "data quality" query that checks for anomalies (sudden spikes/drops) and flags them before the report goes out.

---

## General Interview Tips for These Projects

### Frame everything as: Problem → Approach → Impact
Hiring managers care about judgment, not just technical skill. Show that you identified a real business problem, chose an appropriate solution (not over-engineered), and delivered measurable results.

### Emphasize scale and autonomy
- You owned these end-to-end (design, build, deploy, maintain)
- These weren't one-off scripts — they run in production weekly
- They serve real stakeholders (leadership, ops managers, 24-person teams)

### Common themes to highlight across projects
1. **Automation mindset** — You see repetitive manual work and build systems to eliminate it
2. **Full-stack capability** — Frontend (React, HTML), backend (Python), data (SQL, Redshift), cloud (Lambda), desktop (Electron)
3. **Business impact focus** — Every project has a measurable outcome (time saved, coverage improved, errors eliminated)
4. **Production-quality engineering** — Error handling, logging, monitoring, configurability — not just scripts that work on your laptop

### If they ask "Why didn't you use [X tool]?"
Have a reason. Common ones:
- "Why not Tableau?" → Stakeholders wanted it in email, not behind a login
- "Why not a web app?" → Sensitive data needed local processing
- "Why Lambda vs EC2?" → Bursty workload, zero idle cost
- "Why a rule engine vs ML?" → Needed transparency and auditability for non-technical stakeholders
