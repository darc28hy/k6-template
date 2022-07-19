export interface Data {
  metrics: Metrics
  root_group: Group
}

export interface Metrics {
  vus: GaugeType
  vus_max: GaugeType
  iterations: CounterType
  iteration_duration: TrendType
  dropped_iterations: TrendType
  data_received: CounterType
  data_sent: CounterType
  checks: RateType
  http_reqs: CounterType
  http_req_blocked: TrendType
  http_req_connecting: TrendType
  http_req_tls_handshaking: TrendType
  http_req_sending: TrendType
  http_req_waiting: TrendType
  http_req_receiving: TrendType
  http_req_duration: TrendType
  http_req_failed: RateType
  [key: string]: MetricType
}

export type MetricType = CounterType | RateType | GaugeType | TrendType

export type ValuesKey =
  | keyof CounterType['values']
  | keyof RateType['values']
  | keyof GaugeType['values']
  | keyof TrendType['values']

export interface CounterType extends MetricsItem {
  type: 'counter'
  values: {
    count: number
    rate: number
  }
}

export interface RateType extends MetricsItem {
  type: 'rate'
  values: {
    rate: number
    passes: number
    fails: number
  }
}

export interface GaugeType extends MetricsItem {
  type: 'gauge'
  values: {
    value: number
    min: number
    max: number
  }
}

export interface TrendType extends MetricsItem {
  type: 'trend'
  values: {
    min: number
    max: number
    avg: number
    med: number
    'p(90)': number
    'p(95)': number
  }
}

export interface Group {
  id: string
  name: string
  path: string
  checks: Check[]
  groups: Group[]
}

export interface Check {
  id: string
  name: string
  path: string
  passes: number
  fails: number
}

interface MetricsItem {
  type: string
  contains: string
  thresholds?: {
    [key: string]: {
      ok: boolean
    }
  }
}
