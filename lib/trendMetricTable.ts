import { builtinMetricsDescriptions } from './dictionary'
import {
  getCustomMetrics,
  isCounterType,
  isRateType,
  isTrendMetric,
} from './helper'
import type { Data, Metrics, MetricType, ValuesKey } from './type'

const outputTargetBuiltinMetrics = [
  'http_req_duration',
  'http_req_waiting',
  'http_req_connecting',
  'http_req_tls_handshaking',
  'http_req_sending',
  'http_req_receiving',
  'http_req_blocked',
  'iteration_duration',
]

export const render = (data: Data, custom: boolean): string => {
  const renderRows = () => {
    let result = ''
    let counter = 0

    if (!custom) {
      outputTargetBuiltinMetrics.forEach((target) => {
        result += renderRow(target, counter)
        counter++
      })
    } else {
      const customMetrics = getCustomMetrics(data.metrics)
      for (const key in customMetrics) {
        result += renderRow(key as keyof Metrics, counter)
        counter++
      }
    }
    return result
  }

  const renderRow = (key: keyof Metrics, index: number) => {
    const metric = data.metrics[key]

    return `
      <tr class="${index % 2 != 0 ? 'bg-gray-50' : ''}">
        <td class="border border-gray-300 px-2">${key}</td>
        ${renderCell(metric, 'count', 'value')}
        ${renderCell(metric, 'rate')}
        ${renderCell(metric, 'avg')}
        ${renderCell(metric, 'max')}
        ${renderCell(metric, 'min')}
        ${renderCell(metric, 'p(90)')}
        ${renderCell(metric, 'p(95)')}
        <td class="border border-gray-300 px-2">
          ${builtinMetricsDescriptions[key] ?? ''}
        </td>
      </tr>
      `
  }

  const renderCell = (
    metric: MetricType,
    key: ValuesKey,
    subKey?: ValuesKey,
  ) => {
    const { values, thresholds } = metric
    const value = (values as any)[key] as number | undefined
    const subValue = subKey
      ? ((values as any)[subKey] as number | undefined)
      : null
    const searchKey = subKey && subValue ? subKey : key
    const resolvedValue = subValue ?? value
    const displayValue =
      resolvedValue === undefined ||
      resolvedValue === null ||
      (isCounterType(metric) && searchKey == 'rate')
        ? '-'
        : isTrendMetric(metric)
        ? Math.round(resolvedValue) + 'ms'
        : isRateType(metric)
        ? (resolvedValue * 100).toFixed(1) + '%'
        : resolvedValue

    const checkThresholdsResult = (key: ValuesKey) => {
      let haveResult = false
      let result = false
      for (const name in thresholds) {
        if (name.startsWith(key)) {
          haveResult = true
          result = thresholds[name].ok
        }
      }
      return haveResult ? result : null
    }

    const result = checkThresholdsResult(searchKey)
    const color = result === null ? 'gray' : result ? 'teal' : 'rose'
    const textColorClass = `text-${color}-600`
    const bgColorClass = result === null ? '' : `bg-${color}-100`

    return `
    <td class="border border-gray-300 px-2 ${textColorClass} ${bgColorClass} font-mono font-light text-sm" align="right">
      ${displayValue}
    </td>
    `
  }

  return `
  <table class="table-auto border-collapse w-full">
    <thead>
      <tr>
        <th class="border border-gray-300 px-2 font-semibold w-[208px]" align="left">Metrics</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Count</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Rate</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Average</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Maximum</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Minimum</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">90 Percentile</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">95 Percentile</th>
        <th class="border border-gray-300 px-2 font-semibold w-[480px]" align="left">Description</th>
      </tr>
    </thead>
    <tbody>
      ${renderRows()}
    </tbody>
  </table>
  `
}
