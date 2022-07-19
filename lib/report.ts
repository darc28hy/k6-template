// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'
import { render as renderChecks } from './checks'
import { render as renderHtmlReport } from './htmlReport'
import { render as renderTrendMetricTable } from './trendMetricTable'
import type { Data } from './type'

export const outputReport = (title: string, data: Data) => {
  return {
    stdout: textSummary(data, {
      indent: ' ',
      enableColors: true,
      summaryTimeUnit: 's',
    }),
    [`${title}.json`]: JSON.stringify(data, null, 2),
    [`${title}.html`]: renderHtmlReport(title, data),
    // for GitHub Actions job summary
    [`${title}_checks.html`]: renderChecks(data),
    [`${title}_metrics_builtin.html`]: renderTrendMetricTable(data, false),
    [`${title}_metrics_custom.html`]: renderTrendMetricTable(data, true),
  }
}
