
import {Doughnut } from "react-chartjs-2";

export default function DonutChart4() {
  return (
    <>

      <Doughnut
        data={{
          labels: ['A', 'B', 'C', 'D'], // 4 labels
          datasets: [
            {
              label: 'Assets',
              data: [100, 200, 300, 400], // 4 values
              backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'], // optional colors
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Bar Chart Example",
            },
          },
        }}
      />
    </>
  );
}
