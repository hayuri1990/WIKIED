// 상대 시간 처리
export const formatRelativeTime = (isoString: string): string => {
  const created = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) {
    return `${diff}초 전`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}분 전`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}시간 전`;
  } else {
    return `${Math.floor(diff / 86400)}일 전`;
  }
};
