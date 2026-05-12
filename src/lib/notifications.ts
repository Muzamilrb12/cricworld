type NotificationType = 'wicket' | 'boundary' | 'info';

interface NotificationEvent {
  title: string;
  msg: string;
  type: NotificationType;
}

class NotificationManager {
  private listeners: ((event: NotificationEvent) => void)[] = [];

  subscribe(listener: (event: NotificationEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event: NotificationEvent) {
    this.listeners.forEach(l => l(event));
  }
}

export const notificationManager = new NotificationManager();

export const triggerNotification = (title: string, msg: string, type: NotificationType = 'info') => {
  notificationManager.notify({ title, msg, type });
};
