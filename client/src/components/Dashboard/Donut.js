import React from 'react'
import ReactApexChart from "react-apexcharts";

const Donut = ({ unpaid, paid, partial }) => {

    const series = [unpaid.length, paid.length, partial.length];
    const options = {
      chart: {
        type: 'donut',
      },
      labels: ['Unpaid Qoutations', 'Paid Qoutations', 'Partially Qoutations'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="donut" width={450} />
        </div>
    )
}

export default Donut
