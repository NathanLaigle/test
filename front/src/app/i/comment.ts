export interface Comment {
  id?: number;
  rating: number;
  title: string;
  content: string;
  AppId: number;
  UserEmail?: string;
  createdAt?: string;
  updatedAt?: string;
}
