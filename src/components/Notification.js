import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Notification() {
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    notifications.forEach((notif) => {
      toast[notif.type === 'price_alert' ? 'info' : 'warn'](`${notif.message}`, {
        toastId: notif.id,
      });
    });
  }, [notifications]);

  return null; // Rendered via ToastContainer in layout
}