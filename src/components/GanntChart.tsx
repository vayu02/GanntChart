import { useEffect, useRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import {
  Chart as ChartJS,
  // CategoryScale,
  // LinearScale,
  // BarElement,
  // Title,
  // Tooltip,
  // Legend,
  registerables,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import * as React from 'react'

ChartJS.register(...registerables)

const colors = [
  'rgba(255,26,104,1)',
  'rgba(255, 159, 64, 1)',
  'rgba(75, 192,192, 1)',
]

// Gloabal plugins
const todayLine = {
  id: 'todayLine',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(255, 26, 104, 1)'
    ctx.setLineDash([6, 6])
    ctx.moveTo(x.getPixelForValue(new Date()), top)
    ctx.lineTo(x.getPixelForValue(new Date()), bottom)
    ctx.stroke()
    ctx.setLineDash([])
  },
}

//assginedTasks

const assignedTask = {
  id: 'assignedTask',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart
    ctx.save()
    ctx.font = 'bold 12px sans-serif'
    ctx.fillStyle = 'black'
    // ctx.fillText(text, x, y)
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'
    data.datasets[0].data.forEach((dataPoint, idx) => {
      // ctx.fillText(data.datasets[0].data[0].name, 10, y.getPixelForValue(0))
      ctx.fillText(dataPoint.name, 10, y.getPixelForValue(idx))
    })
    ctx.restore()
  },
}

const status = {
  id: 'status',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart
    const icons = [<FaCheck />]
    ctx.save()
    ctx.font = 'bold 12px sans-serif'
    ctx.fillStyle = 'black'
    // ctx.fillText(text, x, y)
    ctx.textBaseline = 'middle'
    data.datasets[0].data.forEach((dataPoint, idx) => {
      // ctx.fillText(data.datasets[0].data[0].name, 10, y.getPixelForValue(0))
      ctx.fillStyle = colors[dataPoint.status]

      ctx.fillText(dataPoint.status, right + 10, y.getPixelForValue(idx))
    })
    ctx.restore()
  },
}

export const options = {
  responsive: true,
  indexAxis: 'y',

  layout: {
    padding: {
      left: 100,
      right: 100,
    },
  },
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },

  scales: {
    x: {
      position: 'top',
      type: 'time',
      time: {
        unit: 'day',
      },
      min: '2023-06-01',
      max: '2023-06-31',
    },
  },
}

// const labels = ['Mon', 'tue']

export const data = {
  // labels,

  datasets: [
    {
      label: 'Weekly Sales',
      data: [
        {
          x: ['2023-06-03', '2023-06-06'],
          y: 'Task 1',
          name: 'James',
          status: 2,
        },
        {
          x: ['2023-06-06', '2023-06-12'],
          y: 'Task 2',
          name: 'Jane',
          status: 2,
        },
        {
          x: ['2023-06-09', '2023-06-12'],
          y: 'Task 3',
          name: 'John',
          status: 2,
        },
        {
          x: ['2023-06-12', '2023-06-21'],
          y: 'Task 4',
          name: 'David',
          status: 2,
        },
        {
          x: ['2023-06-15', '2023-06-24'],
          y: 'Task 5',
          name: 'Rocky',
          status: 0,
        },
        {
          x: ['2023-06-18', '2023-06-30'],
          y: 'Task 6',
          name: 'Luna',
          status: 1,
        },
      ],
      backgroundColor: (ctx) => {
        console.log(ctx.raw.status, 'ctx')
        return colors[ctx.raw.status]
      },
      borderColor: [
        'rgba(255,26,104, 1)',
        'rgba(54,162,235, 1)',
        'rgba(255,206,86, 1)',
      ],
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: 10,
      barPercentage: 0.5,
    },
  ],
}

const GanttChart: React.ReactElement = () => {
  const barRef = useRef()

  useEffect(() => {
    // barRef.current.config._config.plugins = [todayLine]
    console.log(barRef.current)
  }, [])

  return (
    <Bar
      options={options}
      data={data}
      ref={barRef}
      plugins={[todayLine, assignedTask, status]}
    />
  )
}

export default GanttChart
