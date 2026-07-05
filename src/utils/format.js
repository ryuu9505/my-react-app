export default function formatYearMonth(dateStr, separator = '.') {
  if (typeof dateStr !== 'string' || !dateStr) return '';
  const [year, month] = dateStr.split(/[-/.]/);
  if (!year || !month) return '';
  return `${year}${separator}${month.padStart(2, '0')}`;
}

export function withParentheses(str) {
  return str ? `(${str})` : '';
}

export function formatDate(dateStr, separator = '.') {
  if (typeof dateStr !== 'string' || !dateStr) return '';
  const [datePart] = dateStr.split('T');
  if (!datePart) return '';
  const [year, month, day] = datePart.split(/[-/.]/);
  if (!year || !month || !day) return '';
  return `${year}${separator}${month.padStart(2, '0')}${separator}${day.padStart(2, '0')}`;
}

export function getPeriodLength(startDate, endDate) {
  if (!startDate) return '';
  const end = endDate ? new Date(endDate) : new Date();
  const start = new Date(startDate);
  if (isNaN(start) || isNaN(end)) return '';

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let result = '';
  if (years > 0) result += `${years}년`;
  if (months > 0) result += (result ? ' ' : '') + `${months}개월`;
  if (!result) result = '1개월 미만';
  return result;
}
