import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private data: any = [];
  private now = new Date(1997, 9, 3);
  private oneDay = 24 * 3600 * 1000;
  private value = Math.random() * 1000; 
  private option: echarts.EChartsOption | undefined
  private myChart: any;
  
  ngOnInit() {
    setInterval(() => {
      for (let i = 0; i < 20; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }
      this.InitPipe();
      this.myChart.setOption(this.option);
    }, 500);
    for (let i = 0; i < 1000; i++) {  
      this.data.push(this.randomData());
    }
  }

  private randomData() : any {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 20 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }

  private InitPipe(): void {
    this.myChart = echarts.init((document.getElementById('chart')) as any);
    this.option = {
      title: {
        text: 'Echart (Realtime Chart)'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0]; 
          let date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {  
          show: true
        }
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: this.data
        }
      ]
    };
  }
}
