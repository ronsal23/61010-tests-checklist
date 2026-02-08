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

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
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
            const data = JSON.parse(e.target.result);
            const rows = document.querySelectorAll("#checklistTable tbody tr");

            data.forEach(item => {
                rows.forEach(row => {
                    if (row.cells[0].innerText === item.clause) {
                        const select = row.cells[2].querySelector('select');
                        const textarea = row.cells[3].querySelector('textarea');

                        select.value = item.verdict;
                        textarea.value = item.comment;
                        updateStyle(select);
                    }
                });
            });
            alert("Данные успешно загружены из файла!");
        } catch (err) {
            console.error(err);
            alert("Ошибка при чтении файла. Убедитесь, что выбрали правильный .json файл отчета.");
        }
        input.value = ''; // Сброс, чтобы можно было загрузить тот же файл снова
    };
    reader.readAsText(file);
}

// Инициализация цветов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.v-select').forEach(updateStyle);
});