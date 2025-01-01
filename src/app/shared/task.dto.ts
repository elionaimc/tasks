export interface Task {
    title: string;
    description?: string;
    created_at: Date;
    edited_at: Date;
    finished: boolean;
}