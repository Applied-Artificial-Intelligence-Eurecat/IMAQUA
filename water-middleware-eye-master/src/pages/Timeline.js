import React, {useContext} from "react";
import {Header} from "../components/Header";
import {TimelineContext} from "../context/TimelineContext";
import {Line} from "react-chartjs-2";

export const Timeline = () => {
    const {id, thingProperty, timeData} = useContext(TimelineContext);
    const timestampArray = timeData.map(item => item.timestamp);
    const valueData = timeData.map(item => item[thingProperty.title]);
    const data = {
        labels: timestampArray,
        datasets: [
            {
                label: thingProperty.title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75, 192, 192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75, 192, 192,1)',
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 10,
                pointHitRadius: 10,
                data: valueData
            }
        ]
    };
  return (
      <>
          <Header title={'Real-Time Information of '+ id + " for property "+ thingProperty.title}></Header>
          <Line data={data}></Line>
      </>
  );
};