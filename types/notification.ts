export interface NotificationParams {
  page?: number;
  pageSize: number;
}

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

export interface Notifications {
  totalCount: number;
  list: Notification[];
}
