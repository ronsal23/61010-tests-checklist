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
 * Обновление цвета текста в выпадающем списке Verdict
 */
function updateStyle(el) {
    el.classList.remove('v-p', 'v-f', 'v-na');
    if (el.value === 'P') el.classList.add('v-p');
    else if (el.value === 'F') el.classList.add('v-f');
    else el.classList.add('v-na');
}

/**
 * Create a table row for a test
 */
function createTableRow(test) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${test.clause}</td>
        <td>${test.name}</td>
        <td>
            <select class="v-select" onchange="updateStyle(this)">
                <option value="N/A">N/A</option>
                <option value="P">P</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><textarea placeholder="Введите комментарий..."></textarea></td>
    `;
    return tr;
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
    
    // Re-initialize styles for newly created selects
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

/**
 * Сбор данных из таблицы и сохранение в JSON-файл
 */
function saveData() {
    const rows = document.querySelectorAll("#checklistTable tbody tr");
    const data = [];

    rows.forEach(row => {
        data.push({
            clause: row.cells[0].innerText,
            verdict: row.cells[2].querySelector('select').value,
            comment: row.cells[3].querySelector('textarea').value
        });
    });

    const report = {
        metadata: {
            applicant: document.getElementById('applicant').value,
            equipment: document.getElementById('equipment').value,
            poNumber: document.getElementById('poNumber').value,
            testDate: document.getElementById('testDate').value
        },
        tests: data
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "IEC_61010_Report.json";
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * Загрузка данных из выбранного JSON-файла
 */
function loadData(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const report = JSON.parse(e.target.result);
            
            // Load metadata
            if (report.metadata) {
                document.getElementById('applicant').value = report.metadata.applicant || '';
                document.getElementById('equipment').value = report.metadata.equipment || '';
                document.getElementById('poNumber').value = report.metadata.poNumber || '';
                document.getElementById('testDate').value = report.metadata.testDate || '';
            }
            
            // Load test data
            const testData = report.tests || report;
            testData.forEach(item => {
                const test = testsData.find(t => t.clause === item.clause);
                if (test) {
                    test.verdict = item.verdict;
                    test.comment = item.comment;
                }
            });
            
            renderTable();
            alert("Данные успешно загружены из файла!");
        } catch (err) {
            console.error(err);
            alert("Ошибка при чтении файла. Убедитесь, что выбрали правильный .json файл отчета.");
        }
        input.value = ''; // Сброс, чтобы можно было загрузить тот же файл снова
    };
    reader.readAsText(file);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});