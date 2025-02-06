export interface Email {
    id: number;
    sender: string;
    subject: string;
    preview: string;
    content: string;
    timestamp: string;
    priority: string;
    unread: boolean;
}