import Image from 'next/image';
import topCloseIcon from '@/assets/icons/close.svg';
import styles from '@/components/common/modal/components/editNotification/styles.module.scss';
import NotificationCard from '@/components/common/modal/components/editNotification/notificationCard';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import {
  EditNotificationProps,
  Notification,
} from '@/components/common/modal/components/editNotification/types';
import { mockNotifications } from '@/components/common/modal/components/editNotification/constants';

const EditNotification = ({
  size = 'large',
  onClose,
}: EditNotificationProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const handleDeleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.length);
  };

  // 알림 삭제 시 notificationCount 갱신되는 로직
  useEffect(() => {
    setNotificationCount(notifications.length);
  }, [notifications]);

  // mockData로 상태 초기화 하는 로직
  const loadMockNotifications = () => {
    setNotifications(mockNotifications);
    setNotificationCount(mockNotifications.length);
  };

  useEffect(() => {
    loadMockNotifications();
  }, []);

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

  /**
   * @ TODO
   * @ 1. overlay style 수정 필요
   */

  return (
    <div className={styles['overlay']} onClick={handleOverlayClick}>
      <div className={clsx(styles['container'], styles[size])}>
        <div className={styles['header']}>
          <strong className={clsx(styles['title'], styles[size])}>
            {notificationCount > 0
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
              timeStamp={notification.timeStamp}
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
