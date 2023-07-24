
interface Notification {
    notification_id: number;
    message: string;
    viewed: boolean;
  }

  interface TopBarProps {
    updateDate: string;
  }


  export type { Notification, TopBarProps };