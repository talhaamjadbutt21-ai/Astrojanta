export interface AdminOverview {
  users: { total: number; last7Days: number };
  chat: { questionsToday: number; conversations: number };
  pro: { inquiries: number; subscribers: number };
}
