
</head>
<body>
    <h1>Interactive Dashboard</h1>
    <p>This is a simple interactive dashboard built with HTML, JavaScript, and Plotly.js. The dashboard generates five key visualizations based on a JSON file that can be uploaded from your local machine.</p>
    <h2>Visualizations</h2>
    <ul>
        <li><strong>Kyphosis Distribution</strong>: A bar chart showing the proportion of individuals with kyphosis condition present or absent.</li>
        <li><strong>Age Distribution</strong>: A histogram to visualize the age distribution in the dataset.</li>
        <li><strong>Number vs Age</strong>: A scatter plot comparing age to the number of events, with colors representing kyphosis conditions.</li>
        <li><strong>Kyphosis by Age Group</strong>: A stacked bar chart showing kyphosis conditions across different age groups.</li>
        <li><strong>Start Value Distribution</strong>: A box plot representing the start values across the dataset.</li>
    </ul>


[
  {
    "Kyphosis": "absent",
    "Age": 71,
    "Number": 3,
    "Start": 5
  },
  {
    "Kyphosis": "present",
    "Age": 128,
    "Number": 4,
    "Start": 5
  }
]
    </pre>
    <p>Each entry should include:</p>
    <ul>
        <li><strong>Kyphosis</strong>: Whether kyphosis is "present" or "absent".</li>
        <li><strong>Age</strong>: The age of the individual.</li>
        <li><strong>Number</strong>: The number of events (e.g., surgeries).</li>
        <li><strong>Start</strong>: The start value for the event.</li>
    </ul>

  
</html>

