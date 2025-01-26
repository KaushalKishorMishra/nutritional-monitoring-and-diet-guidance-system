import React, { useEffect, useState } from "react";
import { getReport } from "../../../../api/user.api";
import { ReportResponse } from "../../../../types/nutrients";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Gauge from "react-svg-gauge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ReportPage: React.FC = () => {
  const [report, setReport] = useState<ReportResponse>({
    bmi: 0,
    bmiCategory: "",
    dailyCalories: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getReport();
        setReport(data);
      } catch (err) {
        setError("Failed to load report");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels: string[] = Object.keys(report.dailyCalories).slice(0, 7);
  const values: number[] = Object.values(report.dailyCalories).slice(0, 7);

  const data = {
    labels, // Use the labels directly
    datasets: [
      {
        label: "Daily Calorie Intake",
        data: values, // Use the values directly
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center my-6">
        <Gauge
          value={report.bmi}
          width={400}
          height={250}
          label="BMI"
          min={10}
          max={60}
          valueLabelStyle={{
            fontSize: "50px",
            fill: "black",
          }}
          topLabelStyle={{
            fontSize: "30px",
            color: "gray",
          }}
        />
        <div className="text-center -mt-10">{report.bmiCategory}</div>
      </div>

      <div className="card w-full bg-base-100 p-6 shadow-xl border">
        <div className="text-xl font-semibold">Daily Calorie Intakes</div>

        <div className="divider mt-2"></div>

        <div className="h-full w-full bg-base-100 pb-6">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
