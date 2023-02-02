import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { SocketServiceService } from '../services/socket-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private data: any = [];
  private option: echarts.EChartsOption | undefined
  private myChart: any;
  dataList: any;
  constructor(private socketService: SocketServiceService){
    
  }

  ngOnInit() {
   
    this.socketService.socket.on("getData", (data: any) => {
      this.dataList = data;
      console.log(this.dataList)
    })

    this.socketService.socket.on("getDataInChart", (response: any) => {
      this.data = [];
      this.data =  response;
      this.InitPipe();
      this.myChart.setOption(this.option);
      console.log(this.data)
    })
  }

  addID(): void{
    const newItem = {
      id: crypto.randomUUID()
    } 

    this.socketService.socket.emit("addID", newItem)
  }

  deleteID(id: string): void{
    this.socketService.socket.emit("deleteID", id)
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
