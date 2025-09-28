import Image from 'next/image';
import topCloseIcon from '@/assets/icons/close.svg';
import styles from '@/components/common/modal/components/editNotification/styles.module.scss';
import NotificationCard from '@/components/common/modal/components/editNotification/notificationCard';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { EditNotificationProps } from '@/components/common/modal/components/editNotification/types';
import {
  deleteNotifications,
  getNotifications,
} from '@/services/api/notification';
import { Notification } from '@/types/notification';
import { formatRelativeTime } from '@/utils/dateFormat';

const EditNotification = ({
  size = 'large',
  onClose,
}: EditNotificationProps) => {
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 알림 목록 조회
  const [page] = useState(1);
  const [pageSize] = useState(10);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await getNotifications({ page, pageSize });
        setNotifications(data.list);
        setNotificationCount(data.totalCount);
      } catch (error) {
        console.error('알림 가져오기 실패', error);
      }
    };

    fetchNotifications();
  }, [page, pageSize]);

  // 알림 삭제
  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotifications(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error('알림 삭제 실패', error);
    }
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.length);
  };

  return (
    <div className={styles['overlay']} onClick={handleOverlayClick}>
      <div
        className={clsx(
          styles['container'],
          styles[size],
          notifications.length > 0 && styles['has-notifications'],
        )}
      >
        <div className={styles['header']}>
          <strong className={clsx(styles['title'], styles[size])}>
            {notificationCount === null
              ? null
              : notificationCount > 0
                ? `알림 ${notificationCount}개`
                : '아직 알림이 없어요 🙂'}
          </strong>
          <button
            className={clsx(styles['close-button'], styles[size])}
            onClick={closeModal}
          >
            <Image
              className={clsx(styles['close-icon'], styles[size])}
              src={topCloseIcon}
              alt="닫기"
            />
          </button>
        </div>
        <div className={styles['notification-card-wrapper']}>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              timeStamp={formatRelativeTime(notification.createdAt)}
              size={size}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditNotification;
