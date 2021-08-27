import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Area,
  Tooltip,
  Legend,
  AreaChart,
} from 'recharts'
import {format, parseISO, subDays} from 'date-fns'
import BarCharts from '../BarCharts'

import './index.css'

// const data = []
const legendData = [
  {name: 'confirmed', value: 'Confirmed'},
  {name: 'recovered', value: 'Recovered'},
  {name: 'deceased', value: 'Deceased'},
  {name: 'tested', value: 'Tested'},
]
export default class Charts extends Component {
  state = {
    data: '',
  }

  componentDidMount() {
    this.timeLine()
  }

  kFormatter = num =>
    Math.abs(num) > 999
      ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`
      : Math.sign(num) * Math.abs(num)

  dateFormatter = str =>
    // const date = parseISO(str)
    parseISO(str).getDate() % 30 === 0 ? format(parseISO(str), 'MMM, d') : ''

  timeLine = async () => {
    const {code} = this.props
    const response = await fetch(
      `https://data.covid19india.org/v4/min/timeseries-${code}.min.json`,
    )

    if (response.ok) {
      const fetchedData = await response.json()
      console.log('fetchedData', fetchedData)

      console.log(fetchedData[code].dates) // replace AP with other state codes

      const values = Object.keys(fetchedData[code].dates).map(date => ({
        date,
        confirmed: fetchedData[code].dates[date].total.confirmed,
        recovered: fetchedData[code].dates[date].total.recovered,
        deceased: fetchedData[code].dates[date].total.deceased,
        tested: fetchedData[code].dates[date].total.tested,
      }))
      console.log('Values', values)
      this.setState({data: values.slice(20, 50)})
    }
  }

  render() {
    const {data} = this.state
    console.log('Data', data)

    return (
      <>
        <div className="p-5 m-3">
          <h2 className="pb-5">Spread Trends</h2>
          <button key="button" className=" com" type="button">
            Cumulative
          </button>
          <button
            key="button"
            type="button"
            className="btn daily"
            value="Daily"
          >
            Daily
          </button>
          <div className="p-5 m-3">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} className="border conf m-3">
                <Area dataKey="confirmed" />
                <XAxis stroke="#FF073A" dataKey="date" />
                <Legend
                  wrapperStyle={{margin: '5px', color: 'red'}}
                  layout="vertical"
                  verticalAlign="top"
                  align="right"
                />
                <YAxis
                  stroke="#FF073A"
                  dataKey="confirmed"
                  tickCount={6}
                  tickFormatter={num => this.kFormatter(num)}
                />
                <Tooltip />
                <Line type="monotone" dataKey="confirmed" stroke="red" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="p-5 m-2">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} className="border rec">
                <Area dataKey="recovered" />
                <XAxis stroke="#27A243" dataKey="date" />
                <Legend
                  wrapperStyle={{margin: '5px', color: 'green'}}
                  layout="vertical"
                  verticalAlign="top"
                  align="right"
                />
                <YAxis
                  stroke=" #27A243"
                  dataKey="recovered"
                  tickCount={6}
                  tickFormatter={num => this.kFormatter(num)}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="recovered"
                  stroke="#27A243"
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="p-5 m-2">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} className="border dec">
                <Area dataKey="deceased" />
                <XAxis stroke="#6C757D" dataKey="date" />
                <Legend
                  wrapperStyle={{margin: '5px', color: '#6C757D'}}
                  layout="vertical"
                  verticalAlign="top"
                  align="right"
                />
                <YAxis
                  stroke=" #6C757D"
                  dataKey="deceased"
                  tickCount={6}
                  tickFormatter={num => this.kFormatter(num)}
                />
                <Tooltip />
                <Line type="monotone" dataKey="deceased" stroke="#6C757D" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="p-5 m-2">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} className="border tested">
                <Area dataKey="tested" />
                <XAxis stroke="#9673B9" dataKey="date" />
                <Legend
                  wrapperStyle={{margin: '5px', color: '#9673B9'}}
                  layout="vertical"
                  verticalAlign="top"
                  align="right"
                />
                <YAxis
                  stroke="#9673B9"
                  dataKey="tested"
                  tickCount={6}
                  tickFormatter={num => this.kFormatter(num)}
                />
                <Tooltip />
                <Line type="monotone" dataKey="tested" stroke="#9673B9" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    )
  }
}

function CustomTooltip({active, label}) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
      </div>
    )
  }
  return null
}

// Object.keys(myObject).map(function(key, index) {
//   myObject[key] *= 2;
// });
//   'recovered':fetchedData[code].dates[date].total.recovered,
//   'tested':fetchedData[code].dates[date].total.recovered,
//   'deceased':fetchedData[code].dates[date].total.deceased,

// import {useTheme} from '@material-ui/core/styles'

// Generate Sales Dataz
// function createData(time, cases) {
//   return {time, cases}
// }

// const legendData = [
//   {name: 'something', value: 'confirmed'},
//   {name: 'something1', value: 'date'},
//   {name: 'something2', value: 'cases'},
// ]

// function Chart() {
//   //   const theme = useTheme()

//   return (
//     <>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//           className="styles"
//         >
//           <YAxis stroke={'red'} orientation="right">
//             <Label
//               angle={270}
//               position="right"
//               style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
//             ></Label>
//           </YAxis>
//           <Tooltip />
//           <XAxis dataKey="time" stroke={'red'} className="x-axis-styles" />
//           <Legend
//             payload={legendData.map((item, index) => ({
//               id: item.name,
//               type: 'line',
//               value: item.value,
//             }))}
//             wrapperStyle={{margin: '5px', color: 'red'}}
//             layout="vertical"
//             verticalAlign="top"
//             align="left"
//           />
//           <Line type="monotone" dataKey="cases" stroke={'red'} dot={true} />
//         </LineChart>
//       </ResponsiveContainer>
//     </>
//   )
// }
