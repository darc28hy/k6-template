import { render as renderChecks } from './checks'
import { render as renderStats } from './stats'
import { render as renderTrendMetricTable } from './trendMetricTable'
import { formatDate } from './utils'
import type { Data } from './type'

export const render = (title: string, data: Data): string => {
  const datetime = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss')

  const renderContent = () => {
    return `
    <div class="container mx-auto my-4">
      <div class="w-full flex justify-between">
        <h1 class="text-gray-600 text-3xl font-bold">${title}</h1>
        <p class="text-gray-600 text-lg font-normal">${datetime}</p>
      </div>

      ${renderSection('Stats', renderStats(data))}

      ${renderSection('Checks', renderChecks(data))}

      ${renderSection(
        'Metrics (Built-In)',
        renderTrendMetricTable(data, false),
      )}

      ${renderSection('Metrics (Custom)', renderTrendMetricTable(data, true))}

    </div>
    `
  }

  const renderSection = (title: string, children: string) => {
    return `
    <div class="w-full overflow-x-auto my-6">
      <h2 class="text-gray-600 text-2xl font-bold mb-2">${title}</h2>
      ${children}
    </div>
    `
  }

  return `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>${title}</title>
  </head>
  <body>
    ${renderContent()}
  </body>
  </html>
  `
}
