import type {
  Metrics,
  MetricType,
  CounterType,
  RateType,
  GaugeType,
  TrendType,
} from './type'

export const builtinMetricNames = [
  'vus',
  'vus_max',
  'iterations',
  'iteration_duration',
  'dropped_iterations',
  'data_received',
  'data_sent',
  'checks',
]

export const httpSpecificBuiltinMetricNames = [
  'http_reqs',
  'http_req_blocked',
  'http_req_connecting',
  'http_req_tls_handshaking',
  'http_req_sending',
  'http_req_waiting',
  'http_req_receiving',
  'http_req_duration',
  'http_req_failed',
]

export const getBuiltinMetrics = (
  metrics: Metrics,
): { [key: string]: MetricType } => {
  let builtinMetrics: { [key: string]: MetricType } = {}
  for (const key in metrics) {
    if (
      [...builtinMetricNames, ...httpSpecificBuiltinMetricNames].includes(
        key,
      ) &&
      key !== 'http_req_duration{expected_response:true}' &&
      key !== 'http_req_duration{expected_response:false}'
    ) {
      builtinMetrics = {
        ...builtinMetrics,
        [key]: metrics[key],
      }
    }
  }
  return builtinMetrics
}

export const getCustomMetrics = (
  metrics: Metrics,
): { [key: string]: MetricType } => {
  let customMetrics: { [key: string]: MetricType } = {}
  Object.keys(metrics)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .forEach((key) => {
      if (
        ![...builtinMetricNames, ...httpSpecificBuiltinMetricNames].includes(
          key,
        ) &&
        key !== 'http_req_duration{expected_response:true}' &&
        key !== 'http_req_duration{expected_response:false}'
      ) {
        customMetrics = {
          ...customMetrics,
          [key]: metrics[key],
        }
      }
    })

  return customMetrics
}

export const getCustomMetricNames = (metrics: Metrics): string[] => {
  const customMetrics = getCustomMetrics(metrics)
  const names = []
  for (const key in customMetrics) {
    names.push(key)
  }
  return names
}

export const isCounterType = (arg: any): arg is CounterType => {
  return arg !== null && arg.type === 'counter'
}

export const isRateType = (arg: any): arg is RateType => {
  return arg !== null && arg.type === 'rate'
}

export const isGaugeType = (arg: any): arg is GaugeType => {
  return arg !== null && arg.type === 'gauge'
}

export const isTrendMetric = (arg: any): arg is TrendType => {
  return arg !== null && arg.type === 'trend'
}
