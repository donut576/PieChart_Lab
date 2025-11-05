d3.csv('https://raw.githubusercontent.com/ryanchung403/dataset/refs/heads/main/train_data_titanic.csv').then(
    res => {
        // 使用 unpack 函式提取數據
        const survivedData = unpack(res, 'Survived');
        const sexData = unpack(res, 'Sex');
        let embarkedData = unpack(res, 'Embarked');

        // 在這裡過濾掉非 S、C、Q 的數據
        embarkedData = embarkedData.filter(d => d === 'S' || d === 'C' || d === 'Q');

        // 將數據轉換為圓餅圖所需的格式
        const survivedCounts = countData(survivedData);
        const sexCounts = countData(sexData);
        const embarkedCounts = countData(embarkedData);
        
        // 繪製圓餅圖
        drawPieChart(survivedCounts, sexCounts, embarkedCounts);
    }
);

// 提取特定鍵值的所有行
function unpack(rows, key) {
    return rows.map(row => row[key]);
}

// 分組並計算每個類別的數量
function countData(data) {
    const counts = {};
    data.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    // 將物件轉換為 Plotly 所需的陣列格式
    return Object.keys(counts).map(key => ({
        name: key,
        count: counts[key]
    }));
}

// 繪製圓餅圖
function drawPieChart(survivedData, sexData, embarkedData) {

    let trace1 = {
        type: "pie",
        title: { "text": "Survived vs Not Survived" },
        labels: survivedData.map(item => item.name === '0' ? 'Not Survived' : 'Survived'),
        values: survivedData.map(item => item.count),
        textinfo: "value+percent"
    };

    let trace2 = {
        type: "pie",
        title: { "text": "Male vs Female" },
        labels: sexData.map(item => item.name),
        values: sexData.map(item => item.count),
        textinfo: "value+percent"
    };

    let trace3 = {
        type: "pie",
        title: { "text": "Embarked：S/C/Q" },
        labels: embarkedData.map(item => item.name),
        values: embarkedData.map(item => item.count),
        textinfo: "value+percent"
    };


    let data = [trace1];
    let data2 = [trace2];
    let data3 = [trace3];

    // 設定固定的寬度和高度來確保所有圖表大小一致
    let layout = {
        margin: { t: 15, b: 15, l: 15, r: 15 },
        height: 500,
        width: 500
    };

    let layout2 = {
        margin: { t: 15, b: 15, l: 15, r: 15 },
        height: 500,
        width: 500
    };

    let layout3 = {
        margin: { t: 15, b: 15, l: 15, r: 15 },
        height: 500,
        width: 500
    };

    Plotly.newPlot('myGraph', data, layout);
    Plotly.newPlot('myGraph2', data2, layout2);
    Plotly.newPlot('myGraph3', data3, layout3);
}