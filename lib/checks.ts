import type { Data } from './type'

export const render = (data: Data): string => {
  const renderRows = () => {
    let result = ''
    data.root_group.checks.forEach((target, index) => {
      result += `
      <tr class="${index % 2 != 0 ? 'bg-gray-50' : ''}">
        <td class="border border-gray-300 px-2">${target.name}</td>
        ${renderCell('passes', target.passes)}
        ${renderCell('fails', target.fails)}
      </tr>
      `
    })
    return result
  }

  const renderCell = (type: 'passes' | 'fails', value: number) => {
    const color = type === 'fails' && value > 0 ? 'rose' : 'teal'
    const textColorClass = `text-${color}-600`
    const bgColorClass = `bg-${color}-100`

    return `
    <td class="border border-gray-300 px-2 ${textColorClass} ${bgColorClass} font-mono font-light text-sm" align="right">
      ${value}
    </td>
    `
  }

  return `
  <table class="table-auto border-collapse">
    <thead>
      <tr>
        <th class="border border-gray-300 px-2 font-semibold w-[208px]" align="left">Name</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Passes</th>
        <th class="border border-gray-300 px-2 font-semibold min-w-[80px]">Fails</th>
      </tr>
    </thead>
    <tbody>
      ${renderRows()}
    </tbody>
  </table>
  `
}
