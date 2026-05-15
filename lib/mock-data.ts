export type Priority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  assignee: { name: string; avatar: string; initials: string };
  dueDate: string;
  status: TaskStatus;
  category: string;
}

export interface AnalyticsDataPoint {
  date: string;
  productivity: number;
  completed: number;
  inprogress: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface KPIMetric {
  label: string;
  value: string;
  change: number;
  unit: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastMessage: string;
  lastTime: string;
  unread: number;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  sent: boolean;
}

export const mockTasks: Task[] = [
  { id: "t1", title: "Design new onboarding flow", priority: "high", assignee: { name: "Alice Johnson", avatar: "linear-gradient(135deg,#6366f1,#8b5cf6)", initials: "AJ" }, dueDate: "May 18", status: "inprogress", category: "Design" },
  { id: "t2", title: "Integrate Stripe payment API", priority: "high", assignee: { name: "David Kim", avatar: "linear-gradient(135deg,#10b981,#059669)", initials: "DK" }, dueDate: "May 20", status: "todo", category: "Engineering" },
  { id: "t3", title: "Write Q2 performance report", priority: "medium", assignee: { name: "Carol Chen", avatar: "linear-gradient(135deg,#f59e0b,#ef4444)", initials: "CC" }, dueDate: "May 22", status: "todo", category: "Analytics" },
  { id: "t4", title: "Fix auth bug on mobile", priority: "high", assignee: { name: "Grace Park", avatar: "linear-gradient(135deg,#3b82f6,#6366f1)", initials: "GP" }, dueDate: "May 16", status: "inprogress", category: "Engineering" },
  { id: "t5", title: "Set up CI/CD pipeline", priority: "medium", assignee: { name: "Frank Lee", avatar: "linear-gradient(135deg,#f97316,#eab308)", initials: "FL" }, dueDate: "May 24", status: "done", category: "Infrastructure" },
  { id: "t6", title: "Conduct user interviews", priority: "low", assignee: { name: "Emma Wilson", avatar: "linear-gradient(135deg,#ec4899,#a855f7)", initials: "EW" }, dueDate: "May 25", status: "done", category: "Design" },
  { id: "t7", title: "Refactor auth module", priority: "medium", assignee: { name: "David Kim", avatar: "linear-gradient(135deg,#10b981,#059669)", initials: "DK" }, dueDate: "May 28", status: "todo", category: "Engineering" },
  { id: "t8", title: "Optimize DB queries for dashboard", priority: "high", assignee: { name: "Henry Brown", avatar: "linear-gradient(135deg,#14b8a6,#0ea5e9)", initials: "HB" }, dueDate: "May 19", status: "inprogress", category: "Engineering" },
  { id: "t9", title: "Update ML model pipeline", priority: "medium", assignee: { name: "Iris Thompson", avatar: "linear-gradient(135deg,#a855f7,#ec4899)", initials: "IT" }, dueDate: "May 30", status: "todo", category: "AI/ML" },
  { id: "t10", title: "Create marketing landing page", priority: "low", assignee: { name: "Bob Martinez", avatar: "linear-gradient(135deg,#0ea5e9,#2dd4bf)", initials: "BM" }, dueDate: "Jun 2", status: "done", category: "Design" },
  { id: "t11", title: "Security audit of user endpoints", priority: "high", assignee: { name: "Alice Johnson", avatar: "linear-gradient(135deg,#6366f1,#8b5cf6)", initials: "AJ" }, dueDate: "May 21", status: "inprogress", category: "Engineering" },
  { id: "t12", title: "Improve search relevance algo", priority: "medium", assignee: { name: "Iris Thompson", avatar: "linear-gradient(135deg,#a855f7,#ec4899)", initials: "IT" }, dueDate: "Jun 1", status: "todo", category: "AI/ML" },
];

export const dailyData: AnalyticsDataPoint[] = [
  { date: "May 1", productivity: 72, completed: 4, inprogress: 8 },
  { date: "May 2", productivity: 68, completed: 3, inprogress: 9 },
  { date: "May 3", productivity: 75, completed: 5, inprogress: 7 },
  { date: "May 4", productivity: 80, completed: 6, inprogress: 6 },
  { date: "May 5", productivity: 78, completed: 5, inprogress: 8 },
  { date: "May 6", productivity: 82, completed: 7, inprogress: 6 },
  { date: "May 7", productivity: 85, completed: 8, inprogress: 5 },
  { date: "May 8", productivity: 79, completed: 6, inprogress: 7 },
  { date: "May 9", productivity: 88, completed: 9, inprogress: 5 },
  { date: "May 10", productivity: 84, completed: 7, inprogress: 6 },
  { date: "May 11", productivity: 90, completed: 10, inprogress: 4 },
  { date: "May 12", productivity: 87, completed: 9, inprogress: 5 },
  { date: "May 13", productivity: 92, completed: 11, inprogress: 4 },
  { date: "May 14", productivity: 89, completed: 10, inprogress: 5 },
];

export const weeklyData: AnalyticsDataPoint[] = [
  { date: "Week 1", productivity: 71, completed: 18, inprogress: 32 },
  { date: "Week 2", productivity: 76, completed: 22, inprogress: 28 },
  { date: "Week 3", productivity: 82, completed: 28, inprogress: 24 },
  { date: "Week 4", productivity: 85, completed: 31, inprogress: 22 },
  { date: "Week 5", productivity: 79, completed: 25, inprogress: 26 },
  { date: "Week 6", productivity: 88, completed: 35, inprogress: 20 },
  { date: "Week 7", productivity: 91, completed: 38, inprogress: 18 },
  { date: "Week 8", productivity: 89, completed: 36, inprogress: 19 },
];

export const monthlyData: AnalyticsDataPoint[] = [
  { date: "Jan", productivity: 68, completed: 72, inprogress: 15 },
  { date: "Feb", productivity: 73, completed: 85, inprogress: 14 },
  { date: "Mar", productivity: 79, completed: 92, inprogress: 12 },
  { date: "Apr", productivity: 82, completed: 98, inprogress: 11 },
  { date: "May", productivity: 88, completed: 110, inprogress: 9 },
];

export const categoryData: CategoryData[] = [
  { name: "Engineering", value: 45, color: "#6366f1" },
  { name: "Design", value: 25, color: "#8b5cf6" },
  { name: "Analytics", value: 15, color: "#0ea5e9" },
  { name: "AI/ML", value: 10, color: "#10b981" },
  { name: "Infrastructure", value: 5, color: "#f59e0b" },
];

export const kpiMetrics: KPIMetric[] = [
  { label: "Sprint Velocity", value: "42", unit: "pts", change: 8.3 },
  { label: "Bug Resolution", value: "1.2", unit: "days avg", change: -15.4 },
  { label: "Code Coverage", value: "87", unit: "%", change: 3.1 },
  { label: "Deploy Frequency", value: "3.2", unit: "/day", change: 12.5 },
];

export const mockContacts: Contact[] = [
  { id: "c1", name: "Alice Johnson", role: "Lead Engineer", avatar: "linear-gradient(135deg,#6366f1,#8b5cf6)", status: "online", lastMessage: "I'll push the fix by EOD 👍", lastTime: "2m", unread: 2 },
  { id: "c2", name: "Bob Martinez", role: "Product Designer", avatar: "linear-gradient(135deg,#0ea5e9,#2dd4bf)", status: "online", lastMessage: "Shared the new design files", lastTime: "15m", unread: 0 },
  { id: "c3", name: "Carol Chen", role: "Data Analyst", avatar: "linear-gradient(135deg,#f59e0b,#ef4444)", status: "away", lastMessage: "The Q2 report looks good!", lastTime: "1h", unread: 1 },
  { id: "c4", name: "David Kim", role: "Backend Dev", avatar: "linear-gradient(135deg,#10b981,#059669)", status: "online", lastMessage: "API endpoints are ready for testing", lastTime: "2h", unread: 0 },
  { id: "c5", name: "Emma Wilson", role: "UX Researcher", avatar: "linear-gradient(135deg,#ec4899,#a855f7)", status: "offline", lastMessage: "Interviews scheduled for Friday", lastTime: "3h", unread: 0 },
  { id: "c6", name: "Frank Lee", role: "DevOps Engineer", avatar: "linear-gradient(135deg,#f97316,#eab308)", status: "online", lastMessage: "CI/CD pipeline is live!", lastTime: "5h", unread: 3 },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: "m1", content: "Hey! Have you reviewed the new onboarding flow designs?", time: "10:22 AM", sent: false },
    { id: "m2", content: "Yes, looks great! The glassmorphism effect is on point.", time: "10:24 AM", sent: true },
    { id: "m3", content: "There's one small issue on mobile — the sidebar overlaps the content when expanded.", time: "10:25 AM", sent: false },
    { id: "m4", content: "I'll push the fix by EOD 👍", time: "10:26 AM", sent: false },
    { id: "m5", content: "Perfect, thanks Alice!", time: "10:28 AM", sent: true },
  ],
  c2: [
    { id: "m1", content: "Bob, can you share the latest component specs?", time: "9:15 AM", sent: true },
    { id: "m2", content: "Sure! Just uploaded them to Figma.", time: "9:18 AM", sent: false },
    { id: "m3", content: "Shared the new design files", time: "9:20 AM", sent: false },
  ],
  c3: [
    { id: "m1", content: "Carol, is the analytics dashboard data ready?", time: "Yesterday", sent: true },
    { id: "m2", content: "Almost! Running final validations.", time: "Yesterday", sent: false },
    { id: "m3", content: "The Q2 report looks good!", time: "8:00 AM", sent: false },
  ],
  c4: [
    { id: "m1", content: "David, how are the new API endpoints coming along?", time: "2h ago", sent: true },
    { id: "m2", content: "API endpoints are ready for testing", time: "1h ago", sent: false },
  ],
  c5: [
    { id: "m1", content: "Emma, do we have any user research scheduled?", time: "3h ago", sent: true },
    { id: "m2", content: "User interviews scheduled for Friday", time: "3h ago", sent: false },
  ],
  c6: [
    { id: "m1", content: "Frank, is the new pipeline ready?", time: "6h ago", sent: true },
    { id: "m2", content: "CI/CD pipeline is live!", time: "5h ago", sent: false },
  ],
};
