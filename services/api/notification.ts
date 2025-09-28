import { NotificationParams, Notifications } from '@/types/notification';
import { authAxiosInstance } from './axiosInstance';

export const getNotifications = (params: NotificationParams) => {
  return authAxiosInstance.get<Notifications>('/notifications', {
    params,
  });
};

export const deleteNotifications = (id: number) => {
  return authAxiosInstance.delete(`/notifications/${id}`);
};
