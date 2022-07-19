import { sleep, check } from 'k6'
import http from 'k6/http'
import { Options } from 'k6/options'
import { outputReport } from '../lib/report'
import type { Data } from '../lib/type'

const testName = 'get-200-status-test'

export const options: Options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  const res = http.get('https://test-api.k6.io')
  check(res, {
    'status is 200': () => res.status === 200,
  })
  sleep(1)
}

export const handleSummary = (data: Data) => {
  return outputReport(testName, data)
}
