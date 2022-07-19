import { sleep, check } from 'k6'
import http from 'k6/http'
import { Options } from 'k6/options'
import { outputReport } from '../lib/report'
import { randomIntBetween } from '../lib/utils'
import type { Data } from '../lib/type'

const testName = 'post-400-status-test'

export const options: Options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  const res = http.post('https://httpbin.org/status/400')
  check(res, {
    'status is 400': () => res.status === 400,
  })
  sleep(randomIntBetween(1, 5))
}

export const handleSummary = (data: Data) => {
  return outputReport(testName, data)
}
