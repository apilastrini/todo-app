export interface TaskItem {
  id: string | null;
  title: string;
  description: string;
  completed: boolean;
  timestamp: Date | string;
}
