import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2'

class Chart extends Component{

  render(){
    return(
      <div className="container card">
      <Bar
        data={{
          labels:['60', '50', '40', '30', '20', '10'],
          datasets:[
            {
              data:this.props.chartData,
              backgroundColor: '#233966',
            }
          ]
        }}
        options={{
          title:{
            display:true,
            text:this.props.language+' Wikipedia',
            fontSize:18
          },
          legend:{
            display:false
          },
          animation:{
            duration:200,
            easing:'linear'
          },
          scales: {
            yAxes: [{
                ticks: {
                    max:this.props.yAxis,
                    min:0,
                    stepSize:(this.props.yAxis/5)
                },
                scaleLabel: {
                  display:true,
                  labelString:'# of bytes edited'
                }
            }],
            xAxes: [{
                gridLines: {
                  display:false
                },
                scaleLabel: {
                  display:true,
                  labelString:'# of seconds ago'
                }
            }]
        }
        }}
      />
      </div>
    )
  }
}

export default Chart;
