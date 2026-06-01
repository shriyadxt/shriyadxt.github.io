/* ============================================
   SIMULATIONS - Interactive Project Demos
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('sim-modal-overlay');
    const modal = overlay.querySelector('.sim-modal');
    const modalTitle = overlay.querySelector('.sim-modal-header h3');
    const modalBody = overlay.querySelector('.sim-modal-body');
    const closeBtn = overlay.querySelector('.sim-modal-close');

    document.querySelectorAll('.sim-card').forEach(card => {
        card.addEventListener('click', () => {
            const sim = card.getAttribute('data-sim');
            openSimulation(sim);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function openSimulation(sim) {
        const config = simulations[sim];
        if (!config) return;
        modalTitle.textContent = config.title;
        modalBody.innerHTML = config.render();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => config.animate(), 100);
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    const simulations = {
        coach: {
            title: 'Carrier Performance Automation',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>A logistics network with <strong>6,400+ carriers</strong> had no scalable way to identify underperformers. A manual weekly review could only evaluate 3.9% of them, and the rest operated without performance feedback. Quality incidents went undetected for weeks, impacting delivery reliability.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="6400" data-suffix="+">0</span>
                                <span class="metric-label">Carriers Monitored</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="94" data-suffix="%">0</span>
                                <span class="metric-label">Coverage (was 3.9%)</span>
                                <span class="metric-change positive">24x improvement</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="850" data-suffix="+">0</span>
                                <span class="metric-label">Auto-Actions / Week</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="20" data-suffix=" hrs/wk">0</span>
                                <span class="metric-label">Manual Effort Saved</span>
                            </div>
                        </div>

                        <div class="sim-section-label">How It Works</div>
                        <div class="sim-chart">
                            <div class="sim-pipeline" id="coach-pipeline">
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-database"></i></div><span class="step-label">Ingest Data</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-sliders-h"></i></div><span class="step-label">Score Carriers</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-layer-group"></i></div><span class="step-label">Classify Tiers</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-envelope"></i></div><span class="step-label">Auto-Notify</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-chart-line"></i></div><span class="step-label">Track Impact</span></div>
                            </div>
                        </div>

                        <div class="sim-two-col">
                            <div class="sim-chart">
                                <div class="sim-chart-title">Carrier Tier Distribution</div>
                                <div class="sim-tier-row">
                                    <div class="sim-tier-card tier-green">
                                        <span class="tier-count sim-counter" data-target="4200" data-suffix="+">0</span>
                                        <span class="tier-label">Good Standing</span>
                                    </div>
                                    <div class="sim-tier-card tier-yellow">
                                        <span class="tier-count sim-counter" data-target="1800" data-suffix="+">0</span>
                                        <span class="tier-label">Needs Coaching</span>
                                    </div>
                                    <div class="sim-tier-card tier-red">
                                        <span class="tier-count sim-counter" data-target="370" data-suffix="+">0</span>
                                        <span class="tier-label">Action Required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sim-chart">
                                <div class="sim-chart-title">Weekly Auto-Actions Sent</div>
                                <div class="sim-bar-chart" id="coach-bar-chart">
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:65%"><span class="sim-bar-value">132</span></div><span class="sim-bar-label">Mon</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:82%"><span class="sim-bar-value">168</span></div><span class="sim-bar-label">Tue</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:71%"><span class="sim-bar-value">145</span></div><span class="sim-bar-label">Wed</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:90%"><span class="sim-bar-value">184</span></div><span class="sim-bar-label">Thu</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:55%"><span class="sim-bar-value">112</span></div><span class="sim-bar-label">Fri</span></div>
                                </div>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>Python</span><span>SQL</span><span>Rule-Based Engine</span><span>Automated Email (SMTP)</span><span>Data Warehouse</span><span>Scheduling (Cron)</span>
                        </div>
                        <p class="sim-note">Representative data. Architecture reflects the production system; numbers are illustrative.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => animatePipeline('#coach-pipeline'), 200);
                setTimeout(() => animateBars('#coach-bar-chart'), 800);
            }
        },

        reporting: {
            title: 'Executive Reporting Automation',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>Leadership needed weekly performance reports covering 15+ KPIs across carrier quality, timeliness, and compliance. An analyst spent <strong>~6 hours every week</strong> manually pulling data from Redshift, computing metrics in spreadsheets, formatting tables, and emailing results. The process was inconsistent between weeks and created a single-point-of-failure dependency on one person.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="6" data-suffix=" hrs">0</span>
                                <span class="metric-label">Manual Time Saved / Week</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="100" data-suffix="%">0</span>
                                <span class="metric-label">Automation Rate</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="15" data-suffix="+">0</span>
                                <span class="metric-label">KPIs Tracked</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="23">0</span>
                                <span class="metric-label">Stakeholders Served</span>
                            </div>
                        </div>

                        <div class="sim-section-label">Pipeline Architecture</div>
                        <div class="sim-chart">
                            <div class="sim-pipeline" id="reporting-pipeline">
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-database"></i></div><span class="step-label">Query DW</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-cogs"></i></div><span class="step-label">Compute KPIs</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-paint-brush"></i></div><span class="step-label">Render HTML</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-paper-plane"></i></div><span class="step-label">Email Delivery</span></div>
                            </div>
                        </div>

                        <div class="sim-chart">
                            <div class="sim-chart-title">Sample Output: Weekly Performance Snapshot</div>
                            <div class="sim-bar-chart" id="reporting-bar-chart">
                                <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:92%"><span class="sim-bar-value">97%</span></div><span class="sim-bar-label">Quality</span></div>
                                <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:85%"><span class="sim-bar-value">94%</span></div><span class="sim-bar-label">On-Time</span></div>
                                <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:78%"><span class="sim-bar-value">91%</span></div><span class="sim-bar-label">Utilization</span></div>
                                <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:95%"><span class="sim-bar-value">98%</span></div><span class="sim-bar-label">Compliance</span></div>
                                <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:68%"><span class="sim-bar-value">87%</span></div><span class="sim-bar-label">SLA Met</span></div>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>Python</span><span>SQL (Redshift)</span><span>HTML/CSS Templates</span><span>SMTP Email</span><span>Jinja2</span><span>Cron Scheduling</span>
                        </div>
                        <p class="sim-note">Representative data. Architecture reflects the production pipeline.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => animatePipeline('#reporting-pipeline'), 200);
                setTimeout(() => animateBars('#reporting-bar-chart'), 800);
            }
        },

        electron: {
            title: 'Carrier Operations Desktop Tool',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>The operations team ran <strong>5 separate Python scripts</strong> with manual copy-paste steps in between: converting XML manifests to Excel, extracting structured data fields, and drafting templated emails. Each person did it differently, errors averaged ~12 per week, and onboarding new team members to these workflows required days of shadowing.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-app-window">
                            <div class="sim-app-titlebar">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                                <span>Data Processing Suite v2.1</span>
                            </div>
                            <div class="sim-app-content">
                                <div class="sim-metric-row" style="margin-bottom:1.5rem">
                                    <div class="sim-metric-card">
                                        <span class="metric-value" style="font-size:1.3rem"><i class="fas fa-file-code" style="color:#10b981"></i></span>
                                        <span class="metric-label">Format Converter</span>
                                    </div>
                                    <div class="sim-metric-card">
                                        <span class="metric-value" style="font-size:1.3rem"><i class="fas fa-filter" style="color:#6366f1"></i></span>
                                        <span class="metric-label">Data Extractor</span>
                                    </div>
                                    <div class="sim-metric-card">
                                        <span class="metric-value" style="font-size:1.3rem"><i class="fas fa-envelope" style="color:#f59e0b"></i></span>
                                        <span class="metric-label">Email Generator</span>
                                    </div>
                                </div>
                                <div class="sim-chart">
                                    <div class="sim-chart-title"><i class="fas fa-cog fa-spin" style="margin-right:0.5rem;font-size:0.8rem"></i> Processing Pipeline</div>
                                    <div class="sim-pipeline" id="electron-pipeline">
                                        <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-upload"></i></div><span class="step-label">Upload</span></div>
                                        <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                        <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-code"></i></div><span class="step-label">Parse</span></div>
                                        <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                        <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-exchange-alt"></i></div><span class="step-label">Transform</span></div>
                                        <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                        <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-file-excel"></i></div><span class="step-label">Output</span></div>
                                        <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                        <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-check"></i></div><span class="step-label">Done</span></div>
                                    </div>
                                    <div style="margin-top:1rem">
                                        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-secondary, rgba(255,255,255,0.5));margin-bottom:0.3rem">
                                            <span>Processing batch_data.xml...</span>
                                            <span id="electron-progress-pct">0%</span>
                                        </div>
                                        <div class="sim-progress-bar"><div class="sim-progress-fill" style="--progress:100%" id="electron-progress"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sim-section-label" style="margin-top:1.5rem">Impact</div>
                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="70" data-suffix="%">0</span>
                                <span class="metric-label">Time Reduction</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="5">0</span>
                                <span class="metric-label">Tools Unified Into 1</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="0" data-suffix="">0</span>
                                <span class="metric-label">Errors (from ~12/week)</span>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>Electron</span><span>React</span><span>TypeScript</span><span>Python (Backend Scripts)</span><span>Node.js IPC</span><span>XML/Excel Processing</span>
                        </div>
                        <p class="sim-note">Simplified representation of the production application UI.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                animatePipeline('#electron-pipeline', () => {
                    const prog = document.getElementById('electron-progress');
                    const pct = document.getElementById('electron-progress-pct');
                    if (prog) {
                        prog.classList.add('animated');
                        let p = 0;
                        const interval = setInterval(() => {
                            p += 2;
                            if (p > 100) { clearInterval(interval); p = 100; }
                            if (pct) pct.textContent = p + '%';
                        }, 40);
                    }
                });
            }
        },

        productivity: {
            title: 'Productivity Scorecard System',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>A 24-person team's productivity data lived in Clockify but had no automated connection to reporting. Each Monday, a manager <strong>manually exported CSVs, computed utilization rates in Excel, and emailed results</strong>. This 4-hour process produced inconsistent week-over-week comparisons because formulas varied each time.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-chart">
                            <div class="sim-chart-title">End-to-End Architecture</div>
                            <div class="sim-pipeline" id="prod-pipeline">
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-clock"></i></div><span class="step-label">Time API</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-cogs"></i></div><span class="step-label">Python ETL</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-database"></i></div><span class="step-label">Data Warehouse</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-calculator"></i></div><span class="step-label">Score Engine</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-paper-plane"></i></div><span class="step-label">Email Report</span></div>
                            </div>
                        </div>

                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="24">0</span>
                                <span class="metric-label">Team Members Tracked</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="100" data-suffix="%">0</span>
                                <span class="metric-label">Delivery Automation</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="52">0</span>
                                <span class="metric-label">Reports Delivered / Year</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="4" data-suffix=" hrs">0</span>
                                <span class="metric-label">Time Saved / Week</span>
                            </div>
                        </div>

                        <div class="sim-two-col">
                            <div class="sim-chart">
                                <div class="sim-chart-title">Sample: Team Productivity by Day</div>
                                <div class="sim-bar-chart" id="prod-bar-chart">
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:85%"><span class="sim-bar-value">91%</span></div><span class="sim-bar-label">Mon</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:90%"><span class="sim-bar-value">94%</span></div><span class="sim-bar-label">Tue</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:78%"><span class="sim-bar-value">86%</span></div><span class="sim-bar-label">Wed</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:82%"><span class="sim-bar-value">89%</span></div><span class="sim-bar-label">Thu</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:70%"><span class="sim-bar-value">80%</span></div><span class="sim-bar-label">Fri</span></div>
                                </div>
                            </div>
                            <div class="sim-chart">
                                <div class="sim-chart-title">What the Scorecard Contains</div>
                                <table class="sim-table">
                                    <thead><tr><th>Metric</th><th>Source</th></tr></thead>
                                    <tbody>
                                        <tr><td>Hours Logged</td><td>Time-Tracking API</td></tr>
                                        <tr><td>Tasks Completed</td><td>Project Management Tool</td></tr>
                                        <tr><td>Utilization Rate</td><td>Computed (ETL)</td></tr>
                                        <tr><td>Week-over-Week Trend</td><td>Data Warehouse</td></tr>
                                        <tr><td>Team Rankings</td><td>Computed (Python)</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>Python</span><span>REST API Integration</span><span>AWS Redshift</span><span>ETL Pipeline</span><span>HTML Email Templates</span><span>Cron Jobs</span>
                        </div>
                        <p class="sim-note">Representative data. Architecture reflects the production system.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => animatePipeline('#prod-pipeline'), 200);
                setTimeout(() => animateBars('#prod-bar-chart'), 800);
            }
        },

        lambda: {
            title: 'Manifest Accuracy Analytics',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>Shipment manifest data (what was declared vs. what actually arrived) sat in Redshift with <strong>no proactive monitoring</strong>. Discrepancies (wrong quantities, missing references, metadata errors) were only discovered when downstream teams complained, often days later. There was no dashboard and ad-hoc queries returned inconsistent results depending on who wrote them.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-chart">
                            <div class="sim-chart-title">Serverless Architecture</div>
                            <div class="sim-pipeline" id="lambda-pipeline">
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-bolt"></i></div><span class="step-label">Trigger</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fab fa-aws"></i></div><span class="step-label">Lambda</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-database"></i></div><span class="step-label">Query DW</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-calculator"></i></div><span class="step-label">Compute</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-chart-bar"></i></div><span class="step-label">Dashboard</span></div>
                            </div>
                        </div>

                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="98.4" data-decimal="1" data-suffix="%">0</span>
                                <span class="metric-label">Data Accuracy Rate</span>
                                <span class="metric-change positive">+0.6% after launch</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="34000" data-suffix="+">0</span>
                                <span class="metric-label">Records Analyzed / Run</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="12" data-suffix="ms">0</span>
                                <span class="metric-label">Avg Lambda Latency</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value" style="font-size:1.3rem"><i class="fab fa-aws" style="color:#f59e0b"></i></span>
                                <span class="metric-label">Serverless (No EC2)</span>
                            </div>
                        </div>

                        <div class="sim-two-col">
                            <div class="sim-chart">
                                <div class="sim-chart-title">Accuracy by Category</div>
                                <div class="sim-bar-chart" id="lambda-bar-chart">
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:96%"><span class="sim-bar-value">99.1%</span></div><span class="sim-bar-label">Type A</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:92%"><span class="sim-bar-value">98.4%</span></div><span class="sim-bar-label">Type B</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:85%"><span class="sim-bar-value">97.2%</span></div><span class="sim-bar-label">Type C</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:78%"><span class="sim-bar-value">95.8%</span></div><span class="sim-bar-label">Type D</span></div>
                                </div>
                            </div>
                            <div class="sim-chart">
                                <div class="sim-chart-title">Discrepancy Breakdown</div>
                                <table class="sim-table">
                                    <thead><tr><th>Issue Type</th><th>Count</th><th>Severity</th></tr></thead>
                                    <tbody>
                                        <tr><td>Quantity Mismatch</td><td>234</td><td><span class="status-badge yellow">Medium</span></td></tr>
                                        <tr><td>Count Variance</td><td>156</td><td><span class="status-badge red">High</span></td></tr>
                                        <tr><td>Metadata Error</td><td>98</td><td><span class="status-badge yellow">Medium</span></td></tr>
                                        <tr><td>Missing Reference</td><td>59</td><td><span class="status-badge green">Low</span></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>AWS Lambda</span><span>Python</span><span>Redshift (SQL)</span><span>CloudWatch</span><span>HTML Dashboards</span><span>IAM Roles</span>
                        </div>
                        <p class="sim-note">Representative data. Architecture reflects the production Lambda deployment.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => animatePipeline('#lambda-pipeline'), 200);
                setTimeout(() => animateBars('#lambda-bar-chart'), 800);
            }
        },

        compliance: {
            title: 'Carrier Compliance Verification',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>Before a carrier could join the network, their credentials (USDOT registration, SCAC code, insurance status) needed verification. This was done <strong>entirely by hand</strong>: a team member would open a government website, type in each ID, check the result, and record it in a spreadsheet. A batch of 500 carriers took 3+ days, and expired credentials between verification cycles created compliance risk.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-chart">
                            <div class="sim-pipeline" id="compliance-pipeline">
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-file-import"></i></div><span class="step-label">Batch Input</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-search"></i></div><span class="step-label">API Lookup</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-check-double"></i></div><span class="step-label">Validate</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-code-branch"></i></div><span class="step-label">Route Action</span></div>
                                <div class="sim-pipeline-connector"><div class="connector-fill"></div></div>
                                <div class="sim-pipeline-step"><div class="step-circle"><i class="fas fa-flag-checkered"></i></div><span class="step-label">Complete</span></div>
                            </div>
                        </div>

                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="3800" data-suffix="+">0</span>
                                <span class="metric-label">Credentials Verified</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="89" data-suffix="%">0</span>
                                <span class="metric-label">Auto-Processed</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="3" data-suffix=" days">0</span>
                                <span class="metric-label">Time Saved / Batch</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="99" data-suffix="%">0</span>
                                <span class="metric-label">Validation Accuracy</span>
                            </div>
                        </div>

                        <div class="sim-two-col">
                            <div class="sim-chart">
                                <div class="sim-chart-title">Actions Triggered by Result</div>
                                <div class="sim-bar-chart" id="compliance-bar-chart">
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:88%;background:linear-gradient(180deg,#10b981,#34d399)"><span class="sim-bar-value">72%</span></div><span class="sim-bar-label">Approved</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:30%;background:linear-gradient(180deg,#f59e0b,#fbbf24)"><span class="sim-bar-value">18%</span></div><span class="sim-bar-label">Flagged</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:15%;background:linear-gradient(180deg,#ef4444,#f87171)"><span class="sim-bar-value">7%</span></div><span class="sim-bar-label">Rejected</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:8%;background:linear-gradient(180deg,#6b7280,#9ca3af)"><span class="sim-bar-value">3%</span></div><span class="sim-bar-label">Manual</span></div>
                                </div>
                            </div>
                            <div>
                                <div class="sim-feed">
                                    <div class="sim-feed-title"><span class="pulse-dot"></span> Recent Verifications</div>
                                    <div class="sim-feed-item" style="animation-delay:0.1s"><div class="feed-icon success"><i class="fas fa-check"></i></div><div><span class="feed-text">Carrier #3456: License valid through 2027, approved</span><span class="feed-time">2 min ago</span></div></div>
                                    <div class="sim-feed-item" style="animation-delay:0.3s"><div class="feed-icon danger"><i class="fas fa-times"></i></div><div><span class="feed-text">Carrier #8821: Registration expired, suspension triggered</span><span class="feed-time">5 min ago</span></div></div>
                                    <div class="sim-feed-item" style="animation-delay:0.5s"><div class="feed-icon warning"><i class="fas fa-exclamation"></i></div><div><span class="feed-text">Carrier #6712: Expiring in 5 days, renewal reminder sent</span><span class="feed-time">8 min ago</span></div></div>
                                    <div class="sim-feed-item" style="animation-delay:0.7s"><div class="feed-icon info"><i class="fas fa-sync"></i></div><div><span class="feed-text">Batch re-verification complete: 512 carriers processed</span><span class="feed-time">12 min ago</span></div></div>
                                </div>
                            </div>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>Python</span><span>REST API Integration</span><span>Batch Processing</span><span>Conditional Workflows</span><span>SMTP Notifications</span><span>Data Validation</span>
                        </div>
                        <p class="sim-note">Representative data. Architecture reflects the production verification system.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => animatePipeline('#compliance-pipeline'), 200);
                setTimeout(() => animateBars('#compliance-bar-chart'), 800);
            }
        },

        sql: {
            title: 'Business Intelligence & KPI Framework',
            render() {
                return `
                    <div class="sim-dashboard">
                        <div class="sim-section-label">The Problem</div>
                        <div class="sim-problem-box">
                            <p>Every week, an executive review required 12+ performance metrics (quality, timeliness, compliance, utilization) across 2 regions. Different analysts wrote their own queries with <strong>inconsistent logic, so the same KPI produced different numbers</strong> depending on who ran it. Prep took hours, and stakeholders lost trust in the data.</p>
                        </div>

                        <div class="sim-section-label">What I Built</div>
                        <div class="sim-metric-row">
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="30" data-suffix="+">0</span>
                                <span class="metric-label">Queries Authored</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="12">0</span>
                                <span class="metric-label">KPIs Standardized</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="2">0</span>
                                <span class="metric-label">Regions Covered</span>
                            </div>
                            <div class="sim-metric-card">
                                <span class="metric-value sim-counter" data-target="5" data-suffix="x">0</span>
                                <span class="metric-label">Faster Report Prep</span>
                            </div>
                        </div>

                        <div class="sim-two-col">
                            <div class="sim-chart">
                                <div class="sim-chart-title">KPI Trend (12 Weeks)</div>
                                <svg class="sim-sparkline" viewBox="0 0 400 80" preserveAspectRatio="none" style="height:100px">
                                    <defs>
                                        <linearGradient id="sqlGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
                                            <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <path class="area" d="M0,65 L33,60 L67,58 L100,55 L133,50 L167,48 L200,42 L233,40 L267,35 L300,30 L333,25 L367,20 L400,15 L400,80 L0,80 Z" style="fill:url(#sqlGradient)"/>
                                    <path d="M0,65 L33,60 L67,58 L100,55 L133,50 L167,48 L200,42 L233,40 L267,35 L300,30 L333,25 L367,20 L400,15" style="stroke:#10b981"/>
                                </svg>
                            </div>
                            <div class="sim-chart">
                                <div class="sim-chart-title">Coverage by Region</div>
                                <div class="sim-bar-chart" id="sql-bar-chart">
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:95%;background:linear-gradient(180deg,#6366f1,#818cf8)"><span class="sim-bar-value">5,800+</span></div><span class="sim-bar-label">Region A</span></div>
                                    <div class="sim-bar-group"><div class="sim-bar" style="--bar-height:25%;background:linear-gradient(180deg,#8b5cf6,#a78bfa)"><span class="sim-bar-value">580+</span></div><span class="sim-bar-label">Region B</span></div>
                                </div>
                            </div>
                        </div>

                        <div class="sim-chart">
                            <div class="sim-chart-title">Sample KPI Dashboard (Powered by My Queries)</div>
                            <table class="sim-table">
                                <thead><tr><th>KPI</th><th>Current</th><th>Target</th><th>Status</th><th>Trend</th></tr></thead>
                                <tbody>
                                    <tr><td>Quality Rate</td><td>96.8%</td><td>95.0%</td><td><span class="status-badge green">On Track</span></td><td><span class="metric-change positive">+1.2%</span></td></tr>
                                    <tr><td>No-Show Rate</td><td>2.1%</td><td>3.0%</td><td><span class="status-badge green">On Track</span></td><td><span class="metric-change positive">-0.3%</span></td></tr>
                                    <tr><td>On-Time Rate</td><td>94.5%</td><td>95.0%</td><td><span class="status-badge yellow">At Risk</span></td><td><span class="metric-change positive">+0.8%</span></td></tr>
                                    <tr><td>Premium Service</td><td>91.2%</td><td>93.0%</td><td><span class="status-badge yellow">At Risk</span></td><td><span class="metric-change negative">-0.4%</span></td></tr>
                                    <tr><td>Utilization</td><td>87.6%</td><td>85.0%</td><td><span class="status-badge green">On Track</span></td><td><span class="metric-change positive">+2.1%</span></td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="sim-section-label">Query Complexity Examples</div>
                        <div class="sim-tech-stack">
                            <span>Window Functions</span><span>CTEs</span><span>Multi-Table Joins (5+)</span><span>Date Spine Generation</span><span>Conditional Aggregation</span><span>Subquery Optimization</span>
                        </div>

                        <div class="sim-section-label">Tech Stack</div>
                        <div class="sim-tech-stack">
                            <span>SQL (Redshift)</span><span>Data Modeling</span><span>Business Intelligence</span><span>Scheduled Queries</span><span>Cross-Region Logic</span>
                        </div>
                        <p class="sim-note">Representative data. Query patterns reflect the production KPI framework.</p>
                    </div>
                `;
            },
            animate() {
                animateCounters();
                setTimeout(() => {
                    document.querySelectorAll('.sim-sparkline path').forEach(p => p.classList.add('animated'));
                    document.querySelectorAll('.sim-sparkline .area').forEach(a => a.classList.add('animated'));
                }, 200);
                setTimeout(() => animateBars('#sql-bar-chart'), 400);
            }
        }
    };

    // --- Animation Helpers ---
    function animateCounters() {
        document.querySelectorAll('.sim-counter').forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const decimal = parseInt(el.getAttribute('data-decimal') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current.toFixed(decimal) + suffix;
            }, 30);
        });
    }

    function animateBars(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        container.querySelectorAll('.sim-bar').forEach((bar, i) => {
            setTimeout(() => bar.classList.add('animated'), i * 100);
        });
    }

    function animatePipeline(containerSelector, callback) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const steps = container.querySelectorAll('.sim-pipeline-step');
        const connectors = container.querySelectorAll('.sim-pipeline-connector');
        let i = 0;
        function nextStep() {
            if (i < steps.length) {
                steps[i].classList.add('completed');
                if (i < connectors.length) {
                    connectors[i].classList.add('filled');
                }
                i++;
                setTimeout(nextStep, 500);
            } else if (callback) {
                callback();
            }
        }
        setTimeout(nextStep, 300);
    }
});
