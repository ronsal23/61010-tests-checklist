/**
 * Test data from All tests list.txt
 */
const testsData = [
    { clause: "4.4.2.2", name: "Protective impedance" },
    { clause: "4.4.2.3", name: "Protective conductor" },
    { clause: "4.4.2.4", name: "Equipment or parts for short-term or intermittent operation" },
    { clause: "4.4.2.5", name: "Motors" },
    { clause: "4.4.2.6", name: "Capacitors" },
    { clause: "4.4.2.7.2", name: "Mains transformers. Short circuit" },
    { clause: "4.4.2.7.3", name: "Mains transformers. Overload" },
    { clause: "4.4.2.8", name: "Outputs" },
    { clause: "4.4.2.9", name: "Equipment for more than one supply" },
    { clause: "4.4.2.10", name: "Cooling" },
    { clause: "4.4.2.11", name: "Heating devices" },
    { clause: "4.4.2.12", name: "Insulation between circuits and parts" },
    { clause: "4.4.2.13", name: "Interlocks" },
    { clause: "4.4.2.14", name: "Voltage selectors" },
    { clause: "5.1.3", name: "Input test" },
    { clause: "5.3", name: "Durability of markings" },
    { clause: "6.2", name: "Determination of accessible parts" },
    { clause: "6.3.1", name: "Levels in normal condition" },
    { clause: "6.3.2", name: "Levels in single fault condition" },
    { clause: "6.4.4", name: "Impedance" },
    { clause: "6.5.2.3", name: "Protective conductor terminal (binding screw test)" },
    { clause: "6.5.2.4", name: "Impedance of protective bonding of plug-connected equipment" },
    { clause: "6.5.2.5", name: "Impedance of protective bonding of permanently connected equipment" },
    { clause: "6.5.2.6", name: "Transformer protective bonding screen" },
    { clause: "6.5.4", name: "Protective impedance" },
    { clause: "6.5.5", name: "Automatic disconnection of the supply" },
    { clause: "6.5.6", name: "Current- or voltage- limiting device" },
    { clause: "6.6.4", name: "Terminals for stranded conductors (Manual test)" },
    { clause: "6.7", name: "Clearance and creepage distances" },
    { clause: "6.8", name: "Voltage tests" },
    { clause: "6.10.2.2", name: "Non-detachable mains supply cords (Cord anchorage test)" },
    { clause: "7.3.4", name: "Limitation of force and pressure" },
    { clause: "7.4", name: "Stability" },
    { clause: "7.5.2", name: "Handles and grips" },
    { clause: "7.5.3", name: "Lifting devices" },
    { clause: "7.6", name: "Wall mounting" },
    { clause: "8.2.1", name: "Static test" },
    { clause: "8.2.2", name: "Impact test" },
    { clause: "8.3", name: "Drop test" },
    { clause: "9.4", name: "Limited energy circuit" },
    { clause: "10.4", name: "Temperature tests" },
    { clause: "10.5.2", name: "Non-operative treatment" },
    { clause: "10.5.3", name: "Ball pressure test" },
    { clause: "11.2", name: "Cleaning" },
    { clause: "11.3", name: "Spillage" },
    { clause: "11.4", name: "Overflow" },
    { clause: "11.6", name: "IP tests" },
    { clause: "11.7.1", name: "Maximum pressure test" },
    { clause: "11.7.2", name: "Leakage and rupture test" },
    { clause: "11.7.3", name: "Leakage from low pressure parts" },
    { clause: "11.7.4", name: "Overpressure safety device test" },
    { clause: "12.2", name: "X-ray tests" },
    { clause: "12.3", name: "Optical radiation testing" },
    { clause: "12.5.1", name: "Sonic pressure test" },
    { clause: "12.5.2", name: "Ultrasonic pressure test" },
    { clause: "13.2.2", name: "Batteries and battery charging" },
    { clause: "13.2.3", name: "Cathode ray tubes check" },
    { clause: "14.3", name: "Overtemperature protection devices" },
    { clause: "14.4", name: "Fuse replacement test" },
    { clause: "14.7", name: "Vertical burn test" },
    { clause: "14.8", name: "Transient voltages limitations test" },
    { clause: "15", name: "Interlocks tests" }
];

/**
 * Pagination state
 */
let currentPage = 1;
let itemsPerPage = 20;

/**
 * Verdict/results map for all tests regardless of pagination
 */
const testResults = {};

function getDefaultTestResult(test) {
    return {
        clause: test.clause,
        name: test.name,
        verdict: "N/A",
        comment: ""
    };
}

function getOrCreateResult(test) {
    if (!testResults[test.clause]) {
        testResults[test.clause] = getDefaultTestResult(test);
    }
    return testResults[test.clause];
}

/**
 * Update verdict style
 */
function updateStyle(el) {
    el.classList.remove('v-applicable', 'v-na');
    if (el.value === 'Applicable') {
        el.classList.add('v-applicable');
    } else {
        el.classList.add('v-na');
    }
}

/**
 * Create a table row for a test
 */
function createTableRow(test) {
    const result = getOrCreateResult(test);
    const tr = document.createElement('tr');
    tr.dataset.clause = test.clause;
    tr.innerHTML = `
        <td>${test.clause}</td>
        <td>${test.name}</td>
        <td>
            <select class="v-select" onchange="handleVerdictChange(this)">
                <option value="Applicable" ${result.verdict === 'Applicable' ? 'selected' : ''}>Applicable</option>
                <option value="N/A" ${result.verdict === 'N/A' ? 'selected' : ''}>N/A</option>
            </select>
        </td>
        <td><textarea placeholder="Enter comments..." oninput="handleCommentChange(this)">${result.comment || ''}</textarea></td>
    `;
    return tr;
}

function handleVerdictChange(selectEl) {
    const row = selectEl.closest('tr');
    const clause = row.dataset.clause;
    if (testResults[clause]) {
        testResults[clause].verdict = selectEl.value;
    }
    updateStyle(selectEl);
}

function handleCommentChange(textareaEl) {
    const row = textareaEl.closest('tr');
    const clause = row.dataset.clause;
    if (testResults[clause]) {
        testResults[clause].comment = textareaEl.value;
    }
}

/**
 * Render table rows for current page
 */
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageTests = testsData.slice(start, end);

    pageTests.forEach(test => {
        tbody.appendChild(createTableRow(test));
    });

    document.querySelectorAll('.v-select').forEach(updateStyle);

    updatePaginationControls();
}

/**
 * Update pagination controls visibility and info
 */
function updatePaginationControls() {
    const totalPages = Math.ceil(testsData.length / itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const recordCount = document.getElementById('recordCount');

    pageInfo.textContent = `Page ${currentPage} of ${totalPages} (Total: ${testsData.length} tests)`;
    recordCount.textContent = `Total: ${testsData.length} tests`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/**
 * Navigate to next page
 */
function nextPage() {
    const totalPages = Math.ceil(testsData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

/**
 * Navigate to previous page
 */
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

/**
 * Handle items per page change
 */
function handleItemsPerPageChange() {
    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    currentPage = 1;
    renderTable();
}

function createDownloadLink(content, mimeType, filename) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    return link;
}

function triggerDownloads(downloadItems) {
    downloadItems.forEach((item, index) => {
        setTimeout(() => {
            const link = createDownloadLink(item.content, item.mimeType, item.filename);
            link.click();
            URL.revokeObjectURL(link.href);
            link.remove();
        }, index * 250);
    });
}

function buildTextReport(report) {
    const clauseWidth = 10;
    const verdictWidth = 12;

    const pad = (value, width) => String(value || '').padEnd(width, ' ');

    const lines = [
        'IEC 61010-1 Checklist Report',
        `Applicant: ${report.metadata.applicant || ''}`,
        `Equipment under test: ${report.metadata.equipment || ''}`,
        `SII PO number: ${report.metadata.poNumber || ''}`,
        `Date: ${report.metadata.testDate || ''}`,
        '',
        'Tests:',
        `${pad('Clause', clauseWidth)} | ${pad('Verdict', verdictWidth)} | Comment`,
        `${'-'.repeat(clauseWidth)}-+-${'-'.repeat(verdictWidth)}-+-${'-'.repeat(50)}`
    ];

    report.tests.forEach(test => {
        lines.push(`${pad(test.clause, clauseWidth)} | ${pad(test.verdict, verdictWidth)} | ${test.comment || ''}`);
    });

    return lines.join('\n');
}

/**
 * Collect data and save as JSON and TXT files
 */
function saveData() {
    const allTests = testsData.map(test => {
        const result = getOrCreateResult(test);
        return {
            clause: result.clause,
            verdict: result.verdict,
            comment: result.comment
        };
    });

    const report = {
        metadata: {
            applicant: document.getElementById('applicant').value,
            equipment: document.getElementById('equipment').value,
            poNumber: document.getElementById('poNumber').value,
            testDate: document.getElementById('testDate').value
        },
        tests: allTests
    };

    triggerDownloads([
        {
            content: JSON.stringify(report, null, 2),
            mimeType: 'application/json',
            filename: 'IEC_61010_Report.json'
        },
        {
            content: buildTextReport(report),
            mimeType: 'text/plain',
            filename: 'IEC_61010_Report.txt'
        }
    ]);
}

/**
 * Load data from selected JSON file
 */
function loadData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const report = JSON.parse(e.target.result);

            if (report.metadata) {
                document.getElementById('applicant').value = report.metadata.applicant || '';
                document.getElementById('equipment').value = report.metadata.equipment || '';
                document.getElementById('poNumber').value = report.metadata.poNumber || '';
                document.getElementById('testDate').value = report.metadata.testDate || '';
            }

            testsData.forEach(test => {
                testResults[test.clause] = getDefaultTestResult(test);
            });

            const loadedTests = report.tests || report;
            loadedTests.forEach(item => {
                const existing = testResults[item.clause];
                if (existing) {
                    existing.verdict = item.verdict === 'Applicable' ? 'Applicable' : 'N/A';
                    existing.comment = item.comment || '';
                }
            });

            renderTable();
            alert('Data loaded successfully.');
        } catch (err) {
            console.error(err);
            alert('Error reading file. Make sure you selected a valid report .json file.');
        }
        input.value = '';
    };
    reader.readAsText(file);
}

// Initialize data at startup
function initializeTestResults() {
    testsData.forEach(test => {
        testResults[test.clause] = getDefaultTestResult(test);
    });
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTestResults();
    renderTable();
});