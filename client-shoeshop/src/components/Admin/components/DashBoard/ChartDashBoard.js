import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../../actions/OrderAction";


export default function ChartDashBoard() {
  const dispatch = useDispatch()
  const allOrder = useSelector(state => state.allOrder.order)

  const numberOfOrdersOnMonth = (month) => {
    if(allOrder){
      return allOrder.filter((order) => {
        if(order.status == 'paid') {
          const allOrder = new Date(order.createdAt).getMonth();
          if (allOrder + 1 === month) {
            return order;
          }
        }
      }).length;
    }
    return
  };

  useEffect(() => {
    dispatch(getAllOrder())
  }, [dispatch])

  const chartOptions = {
    series: [{
        name: 'Monthly bill',
        data: [
          numberOfOrdersOnMonth(1) ,
          numberOfOrdersOnMonth(2) ,
          numberOfOrdersOnMonth(3) ,
          numberOfOrdersOnMonth(4),
          numberOfOrdersOnMonth(5),
          numberOfOrdersOnMonth(6),
          numberOfOrdersOnMonth(7),
          numberOfOrdersOnMonth(8),
          numberOfOrdersOnMonth(9),
          numberOfOrdersOnMonth(10),
          numberOfOrdersOnMonth(11) ,
          numberOfOrdersOnMonth(12) ,
        ]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
  }

  return (
    <div className="dashboard-middle-chart">
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type='line'
        width="500"
      />
    </div>
  );
}
