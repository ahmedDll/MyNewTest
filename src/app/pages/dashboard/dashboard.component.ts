import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { UserService } from 'src/app/_service/master/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  IProgram: IProgram[]=[];
  public cloudStorageChartOptions: any = {};
  public lineChartOptions: any = {};
  public barChartOptions: any = {};
  public chartOptions: any = {};
  public date:string
  public date2=new Date();
 public arr=  [0, 0 ,0 , 0, 0, 0, 0,0,0,0,0,0];
 public  arr2=  [0, 0 ,0 , 0, 0, 0, 0,0,0,0,0,0];
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#000",
    cardBg         : "#fff",
    fontFamily     : "'cairo','Roboto', Helvetica, sans-serif"
  }

  constructor(public _UserService:UserService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef) {
  
    this._UserService.GetPrograms(localStorage.getItem('id'),
    localStorage.getItem('Lang')).subscribe(data => {
     this.IProgram = data.filter(r=>r.showInMenu==true);
     this.cdRef.detectChanges();
   });
   this._UserService.Dashboard( localStorage.getItem('branchCode')).subscribe(res=>{
    this._UserService._Idashboard=res;
   });

   this.date = this.datePipe.transform(this.date2, 'yyyy-MM-dd');
  }

  ngOnInit(): void {

    this._UserService.Dashboard2( localStorage.getItem('branchCode'),localStorage.getItem('Year')).subscribe(res=>{
      this.arr=res[0];
      this.arr2=res[1];
      this.cloudStorageChartOptions = getCloudStorageChartOptions(this.obj);
      this.lineChartOptions = getLineChartOptions(this.obj);
      this.barChartOptions = getBarChartOptions(this.obj,this.arr,this.arr2);
      this.chartOptions = getchartOptions(this.obj);
     });
   
  
  }

}
function getCloudStorageChartOptions(obj: any) {
  
  return {
    series: [75],
    chart: {
      height: 250,
      type: "radialBar",
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 4,
        left: 5,
        blur: 4,
        color: 'rgba(0, 0, 0, 0.40)',
        opacity: 0.35
    }
    },
    colors: ["#18448B"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#8EB1EC"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "69%"
        },
        track: {
          show: true,
          background: obj.light,
          strokeWidth: '100%',
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -11,
            show: false,
            color: obj.muted,
            fontSize: "13px"
          },
          value: {
            color: obj.bodyColor,
            fontSize: "30px",
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["فواتير المشتريات" ,"sz المشتريات"] ,
  }
};


/**
 * Line chart options
 */
 function getLineChartOptions(obj: any) {
  return {
    series: [
      {
        name: "فواتير مستحقه ",
        data: [45, 45 ,40 , 41, 40, 45, 44,39,50,45,44,45]
      },
      {
        name: "فواتير دفعت",
        data:[47, 44 ,42 , 49, 40, 45, 44,40,51,46,45,45]
      },
      {
        name:
          "فواتير انشئت",
        data: [25, 30,30,33,34,35,35,35,40,40,44]
      }
    ],
    chart: {
      type: "line",
      height: '320',
      parentHeightOffset: 1,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: ["#0C2246", "#8EB1EC", "#E7EEFB"],
    grid: {
      padding: {
        bottom: -4

      },
      borderColor: "#ddd",
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {

      categories: [
        "يناير" ,
        "فبراير" ,
        "مارس",
        "ابريل" ,
        "مايو" ,
        "يونيو" ,
        "يوليو",
        "اغسطس" ,
        "سبتمبر" ,
        "اكتوبر " ,
        "نوفمبر" ,
        "ديسمير"
      ],
      labels: {
        style: {
          fontSize: "12px"
        }
      },
      lines: {
        show: true
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: "#fff",
      },
    },
    yaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ],
      labels: {
        offsetX: -10
      }
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 10
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
  }
};

/**
 * Bar chart options
 */
 function getBarChartOptions(obj: any,res,res2) {
  console.log(res)
  return {
    series: [{
      name: 'ايرادات',
      data: res
    },{
      name: 'مصروفات',
      data: res2
    }],
    chart: {
      type: 'bar',
      height: '245',
      stacked: true,
      stackType: "100%",
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#18448B" ,"#D3E1F8"],
    grid: {
      show: false,
      padding: {
        bottom: -4
      },
      borderColor: "#fff",
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 10
      },
    },

    xaxis: {
      categories: ["يناير" ,
      "فبراير" ,
      "مارس",
      "ابريل" ,
      "مايو" ,
      "يونيو" ,
      "يوليو",
      "اغسطس" ,
      "سبتمبر" ,
      "اكتوبر " ,
      "نوفمبر" ,
      "ديسمير"],
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: "#fff",
      },
    },
    yaxis: {
      labels: {
        offsetX: -10
      },
      min: 0,
      max: 100,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "55%",

      }
    },

  }
};
 /* REVERSED BAR CHART */
 function getchartOptions(obj: any) {
  return {
    chart: {
      height: 350,
      type: 'bar',
      stackType: "100%",
      toolbar: {
        show: false
      },
    },
    colors: ["#18448B" ,"#D3E1F8"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 22,
        columnWidth: "10%",
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      data: [400, 430, 448, 470, 540]
    }],
    xaxis: {
      categories: ['سوبر ماركت كارفور', 'فتح الله', 'الندوب ماركت', 'امازون', 'سوق'],

      labels: {
        style: {
          fontSize: '12px',
          margin:4
        }
      }
    },
    yaxis: {
      reversed: true,
      axisTicks: {
        show: false
      },
    },

}};
