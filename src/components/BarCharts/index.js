import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {format, parseISO, subDays} from 'date-fns'

const dataFormatter = number => {
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}

const dateFormatter = str => {
  if (str !== undefined) {
    console.log(str)
    const date = parseISO(str)
    console.log('Date', date)
    return date
  }
  return ''
}

export default class BarCharts extends Component {
  state = {
    data: '',
  }

  componentDidMount() {
    this.timeLine()
  }

  timeLine = async () => {
    const {code, cases} = this.props
    const response = await fetch(
      `https://data.covid19india.org/v4/min/timeseries-${code}.min.json`,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log('Cases in BarCharts is', cases)
      console.log('BarChart dates =', fetchedData)

      const values = Object.keys(fetchedData[code].dates).map(date => ({
        date,
        confirmed: fetchedData[code].dates[date].total.confirmed,
        recovered: fetchedData[code].dates[date].total.recovered,
        deceased: fetchedData[code].dates[date].total.deceased,
        tested: fetchedData[code].dates[date].total.tested,
      }))

      console.log('Values', values)
      const data = values.slice(20, 30)
      console.log('Data', data)
      this.setState({data})
    }
  }

  getCases = () => {}

  render() {
    const {fillColor, cases} = this.props
    const {data} = this.state
    const options = {
      plugins: {
        datalabels: {
          display: true,
          color: '#FF073A',
        },
      },
      legend: {
        display: false,
      },
    }
    console.log('Cases', cases)

    return (
      <div>
        <BarChart
          width={900}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 15,
          }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
            // tickFormatter={dateFormatter}
          />
          <YAxis
            dataKey={cases}
            tickFormatter={dataFormatter}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <Bar
            dataKey={cases}
            fill={fillColor}
            options={options}
            radius={[10, 10, 0, 0]}
            barSize="20%"
          >
            <LabelList dataKey={cases} position="insideTop" />
            <Tooltip />
          </Bar>
        </BarChart>
      </div>
    )
  }
}

// import {
//   ResponsiveContainer,
//   AreaChart,
//   XAxis,
//   YAxis,
//   Area,
//   Tooltip,
//   CartesianGrid,
// } from 'recharts'
// import {format, parseISO, subDays} from 'date-fns'

// const data = []
// for (let num = 30; num >= 0; num -= 1) {
//   data.push({
//     date: subDays(new Date(), num).toISOString().substr(0, 10),
//     value: 1 + Math.random(),
//   })
// }

// export default function Home() {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <AreaChart data={data}>
//         <defs>
//           <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
//             <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
//           </linearGradient>
//         </defs>

//         <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

//         <XAxis
//           dataKey="date"
//           axisLine={false}
//           tickLine={false}
//           tickFormatter={str => {
//             const date = parseISO(str)

//             return format(date, 'MMM, d')
//           }}
//         />

//         <YAxis
//           datakey="value"
//           axisLine={false}
//           tickLine={false}
//           tickCount={8}
//           tickFormatter={number => `$${number.toFixed(2)}`}
//         />

//         <Tooltip />

//         <CartesianGrid opacity={0.1} vertical={false} />
//       </AreaChart>
//     </ResponsiveContainer>
//   )
// }

// function CustomTooltip({active, payload, label}) {
//   if (active) {
//     return (
//       <div className="tooltip">
//         <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
//         <p>${payload[0].value.toFixed(2)} CAD</p>
//       </div>
//     )
//   }
//   return null
// }
