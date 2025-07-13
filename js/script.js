// GitHub Pages用JavaScript - インタラクティブ機能
document.addEventListener('DOMContentLoaded', function() {
    console.log('厳罰主義分析レポート - インタラクティブ機能を初期化中...');

    // スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // テーブルのソート機能
    function addTableSorting() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const headers = table.querySelectorAll('th');
            headers.forEach((header, index) => {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => sortTable(table, index));
            });
        });
    }

    function sortTable(table, column) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aText = a.cells[column].textContent.trim();
            const bText = b.cells[column].textContent.trim();

            // 数値の場合
            if (!isNaN(aText) && !isNaN(bText)) {
                return parseFloat(aText) - parseFloat(bText);
            }

            // 文字列の場合
            return aText.localeCompare(bText, 'ja');
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    // Chart.jsを使用したグラフ作成
    function createCharts() {
        // 地域別事例数のグラフ
        const regionCtx = document.getElementById('regionChart');
        if (regionCtx) {
            new Chart(regionCtx, {
                type: 'bar',
                data: {
                    labels: ['日本', 'アメリカ', 'ヨーロッパ'],
                    datasets: [{
                        label: '2015-2019年',
                        data: [8, 12, 6],
                        backgroundColor: 'rgba(52, 152, 219, 0.8)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    }, {
                        label: '2020-2024年',
                        data: [18, 28, 14],
                        backgroundColor: 'rgba(231, 76, 60, 0.8)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '事例数'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '地域別厳罰主義事例数の変化'
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            });
        }

        // 政治的志向別の厳罰主義的態度
        const politicalCtx = document.getElementById('politicalChart');
        if (politicalCtx) {
            new Chart(politicalCtx, {
                type: 'doughnut',
                data: {
                    labels: ['進歩派（不快発言禁止支持）', '保守派（不快発言禁止支持）', 'その他'],
                    datasets: [{
                        data: [45, 18, 37],
                        backgroundColor: [
                            'rgba(155, 89, 182, 0.8)',
                            'rgba(52, 152, 219, 0.8)',
                            'rgba(149, 165, 166, 0.8)'
                        ],
                        borderColor: [
                            'rgba(155, 89, 182, 1)',
                            'rgba(52, 152, 219, 1)',
                            'rgba(149, 165, 166, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '政治的志向別「不快発言禁止」支持率（%）'
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // 処罰の重度変化
        const severityCtx = document.getElementById('severityChart');
        if (severityCtx) {
            new Chart(severityCtx, {
                type: 'line',
                data: {
                    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: '軽度処罰',
                        data: [15, 18, 22, 20, 25, 12, 8, 6, 4, 3],
                        borderColor: 'rgba(46, 204, 113, 1)',
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        tension: 0.4
                    }, {
                        label: '中度処罰',
                        data: [10, 12, 15, 18, 20, 25, 22, 20, 18, 15],
                        borderColor: 'rgba(241, 196, 15, 1)',
                        backgroundColor: 'rgba(241, 196, 15, 0.2)',
                        tension: 0.4
                    }, {
                        label: '重度処罰',
                        data: [5, 6, 8, 10, 12, 18, 25, 30, 35, 40],
                        borderColor: 'rgba(231, 76, 60, 1)',
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '事例数'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '年'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '処罰の重度変化（2015-2024年）'
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            });
        }
    }

    // 検索機能
    function addSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const tables = document.querySelectorAll('table');

                tables.forEach(table => {
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(searchTerm) ? '' : 'none';
                    });
                });
            });
        }
    }

    // ダークモード切り替え
    function addDarkModeToggle() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // 保存された設定を読み込み
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    // 印刷機能
    function addPrintFunctionality() {
        const printButton = document.getElementById('printButton');
        if (printButton) {
            printButton.addEventListener('click', function() {
                window.print();
            });
        }
    }

    // 目次の自動生成
    function generateTableOfContents() {
        const toc = document.getElementById('tableOfContents');
        if (toc) {
            const headings = document.querySelectorAll('h2, h3');
            const tocList = document.createElement('ul');

            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;

                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = heading.textContent;
                link.className = heading.tagName.toLowerCase();

                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });

            toc.appendChild(tocList);
        }
    }

    // 初期化関数の実行
    addTableSorting();
    addSearchFunctionality();
    addDarkModeToggle();
    addPrintFunctionality();
    generateTableOfContents();

    // Chart.jsが読み込まれた後にグラフを作成
    if (typeof Chart !== 'undefined') {
        createCharts();
    } else {
        // Chart.jsの読み込みを待つ
        const checkChart = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                createCharts();
                clearInterval(checkChart);
            }
        }, 100);
    }

    console.log('✅ インタラクティブ機能の初期化完了');
});

// ページトップへ戻るボタン
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});