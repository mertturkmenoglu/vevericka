import NotificationType from '@/api/responses/NotificationType.ts';

type INotification = {
    _id: string;
    origin: {
        _id: string;
        name: string;
        username: string;
        image: string;
    };
    target: {
        _id: string;
        name: string;
        username: string;
        image: string;
    };
    type: NotificationType;
    delivered: boolean;
    metadata: string;
    createdAt: Date;
    updatedAt: Date;
    deliveredAt: Date;
}

export default INotification;
