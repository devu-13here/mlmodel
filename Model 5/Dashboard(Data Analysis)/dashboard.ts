<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Sales Dashboard</title>
    <!-- Include the latest version of Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        #fileInput {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Interactive Dashboard</h1>
    <input type="file" id="fileInput" accept=".json">
    <div class="container">
        <div id="kyphosisDistribution"></div>
        <div id="ageDistribution"></div>
        <div id="numberVsAge"></div>
        <div id="kyphosisByAgeGroup"></div>
        <div id="startDistribution"></div>
    </div>

    <script>
        // Handle file upload
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = JSON.parse(e.target.result);
                    generateDashboard(data);
                };
                reader.readAsText(file);
            }
        });

        function generateDashboard(data) {
            // Kyphosis Distribution
            const kyphosisCount = data.reduce((acc, row) => {
                acc[row.Kyphosis] = (acc[row.Kyphosis] || 0) + 1;
                return acc;
            }, {});
            const kyphosisTrace = {
                x: Object.keys(kyphosisCount),
                y: Object.values(kyphosisCount),
                type: 'bar'
            };
            Plotly.newPlot('kyphosisDistribution', [kyphosisTrace], { title: 'Kyphosis Distribution' });

            // Age Distribution
            const ages = data.map(row => row.Age);
            const ageTrace = {
                x: ages,
                type: 'histogram',
                autobinx: false,
                xbins: { start: 0, end: Math.max(...ages), size: 20 }
            };
            Plotly.newPlot('ageDistribution', [ageTrace], { title: 'Age Distribution' });

            // Number vs Age
            const numberVsAgeTrace = {
                x: data.map(row => row.Age),
                y: data.map(row => row.Number),
                mode: 'markers',
                type: 'scatter',
                marker: { color: data.map(row => row.Kyphosis === 'present' ? 'red' : 'blue') }
            };
            Plotly.newPlot('numberVsAge', [numberVsAgeTrace], { title: 'Number vs Age' });

            // Kyphosis by Age Group
            const ageGroups = ['0-18', '19-40', '41-60', '61-100', '100+'];
            const ageGroupData = { absent: new Array(ageGroups.length).fill(0), present: new Array(ageGroups.length).fill(0) };
            data.forEach(row => {
                const age = row.Age;
                let ageGroup;
                if (age <= 18) ageGroup = 0;
                else if (age <= 40) ageGroup = 1;
                else if (age <= 60) ageGroup = 2;
                else if (age <= 100) ageGroup = 3;
                else ageGroup = 4;
                ageGroupData[row.Kyphosis][ageGroup]++;
            });
            const kyphosisByAgeGroupTraceAbsent = {
                x: ageGroups,
                y: ageGroupData.absent,
                name: 'Absent',
                type: 'bar'
            };
            const kyphosisByAgeGroupTracePresent = {
                x: ageGroups,
                y: ageGroupData.present,
                name: 'Present',
                type: 'bar'
            };
            Plotly.newPlot('kyphosisByAgeGroup', [kyphosisByAgeGroupTraceAbsent, kyphosisByAgeGroupTracePresent], {
                title: 'Kyphosis by Age Group',
                barmode: 'stack'
            });

            // Start Value Distribution
            const startValues = data.map(row => row.Start);
            const startTrace = {
                y: startValues,
                type: 'box'
            };
            Plotly.newPlot('startDistribution', [startTrace], { title: 'Start Value Distribution' });
        }
    </script>
</body>
</html>
