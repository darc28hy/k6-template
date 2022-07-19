import { getByteSize } from './utils'
import type { Data } from './type'

export const render = (data: Data) => {
  const renderCard = (
    title: string,
    contents: string[],
    /** https://heroicons.com/ */
    iconSvg: string,
    type: 'normal' | 'success' | 'failed' = 'normal',
  ) => {
    const colors = {
      normal: 'gray',
      success: 'teal',
      failed: 'rose',
    }
    const color = colors[type]

    let contentsElements = ''
    contents.forEach((content) => {
      contentsElements += `
      <div class="text-${color}-600 text-xl font-bold font-mono">
        ${content}
      </div>
      `
    })
    return `
    <div class="flex flex-col justify-center items-center bg-${color}-100 rounded-lg p-4">
      <div class="flex flex-row-reverse items-center gap-2 mb-2">
        <div class="text-base font-semibold">${title}</div>
        ${iconSvg}
      </div>
      ${contentsElements}
    </div>
    `
  }

  const totalRequests = data.metrics.http_reqs.values.count
  const failedRequests = data.metrics.http_req_failed.values.passes
  const failedRate = (data.metrics.http_req_failed.values.rate * 100).toFixed(2)
  const failed = data.metrics.http_req_failed.values.passes > 0
  const iterationsCount = data.metrics.iterations.values.count
  const iterationsRate = data.metrics.iterations.values.rate.toFixed(2)
  const virtualUsersMin = data.metrics.vus ? data.metrics.vus.values.min : 1
  const virtualUsersMax = data.metrics.vus ? data.metrics.vus.values.max : 1
  const dataReceived = getByteSize(data.metrics.data_received.values.count, 1)
  const dataSent = getByteSize(data.metrics.data_sent.values.count, 1)

  return `
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
    ${renderCard(
      'Total Requests',
      [totalRequests.toString()],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      `,
      'success',
    )}
    ${renderCard(
      'Failed Requests',
      [`${failedRequests}${failed ? ` (${failedRate}%)` : ''}`],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      `,
      failed ? 'failed' : 'success',
    )}
    ${renderCard(
      'Iterations',
      [`Total ${iterationsCount}`, `Rate ${iterationsRate}/s`],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      `,
    )}
    ${renderCard(
      'Virtual Users',
      [`Min ${virtualUsersMin}`, `Max ${virtualUsersMax}`],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      `,
    )}
    ${renderCard(
      'Data Received',
      [dataReceived.size + dataReceived.unit],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      `,
    )}
    ${renderCard(
      'Data Sent',
      [dataSent.size + dataSent.unit],
      `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      `,
    )}
  </div>
  `
}
