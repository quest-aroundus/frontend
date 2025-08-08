// 날짜 필터 값을 실제 날짜 범위로 변환하는 함수
export const getDateRangeFromFilter = (
  filterValue?: string
): { start?: string; end?: string } => {
  if (!filterValue) return {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filterValue) {
    case 'any':
      return {}; // 제한 없음

    case 'this_week':
      // 이번 주 월요일부터 일요일까지 (현재 타임존 기준)
      const startOfWeek = new Date(today);
      const dayOfWeek = today.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 아니면 1-dayOfWeek
      startOfWeek.setDate(today.getDate() + mondayOffset);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return {
        start: startOfWeek.toISOString(),
        end: endOfWeek.toISOString(),
      };

    case 'this_month':
      // 이번 달 1일부터 마지막 날까지 (현재 타임존 기준)
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      return {
        start: startOfMonth.toISOString(),
        end: endOfMonth.toISOString(),
      };

    default:
      return {};
  }
};
