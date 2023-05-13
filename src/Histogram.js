import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Histogram() {
  
  const [words, setWords] = useState([]);
  const [histogramData, setHistogramData] = useState(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };
  

  useEffect(() => {
    fetch("https://www.terriblytinytales.com/test.txt")
      .then((response) => response.text())
      .then((text) => {
        const cleanedText = text.replace(/[^\w\s]/gi, "").toLowerCase();

        const wordsArray = cleanedText.split(/\s+/);

        const frequency = {};
        wordsArray.forEach((word) => {
          frequency[word] = frequency[word] || 0;
          frequency[word]++;
        });

        const sortedWords = Object.keys(frequency).sort(
          (a, b) => frequency[b] - frequency[a]
        );

        const topWords = sortedWords.slice(0, 20);

        const data = {
          labels: topWords,
          datasets: [
            {
              label: "Word's Frequency",
              data: topWords.map((word) => frequency[word]),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        };
        setHistogramData(data);

        setWords(sortedWords);
      });
  }, []);

  const handleExport = () => {
    if (histogramData) {
      const csv = [
        ["Word", "Frequency"],
        ...histogramData.labels.map((label, index) => [
          label,
          histogramData.datasets[0].data[index],
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "histogram.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      style={{
        width: "60vw",
        height: "75vh",
        margin: "70px",
        padding: "20px",
        border: "3px solid white",
        borderRadius: "5px",
        backgroundColor: "#E8B0FE",
       
      }}
    >
      {histogramData && <Bar data={histogramData} />}
      <br />
      <br />
      <div>
        <button
          onClick={handleExport}
          style={{
            margin: "30px",
            padding: "10px",
            width: "20vh",
            borderRadius: "5px",
            cursor: "pointer",
            background : "rgb(141, 254, 235)"
          }}
        >
          Export
        </button>
        <button
         onClick={handleGoBack}
          style={{
            margin: "30px",
            padding: "10px",
            width: "20vh",
            borderRadius: "8px",
            cursor: "pointer",
            background : "rgb(141, 254, 235)",

          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
