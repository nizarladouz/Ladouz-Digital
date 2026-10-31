// Domain model – tenant-scoped, backend-ready (ids stable, no UI state inside).
export type TaskStatus = "pending" | "in-progress" | "completed";
export interface Task { id: string; title: string; description: string; status: TaskStatus }
export interface Phase { id: string; title: string; tasks: Task[] }
export interface FrameworkLink { id: string; url: string; title: string }
export interface ModuleDef { id: string; title: string; iconName: string; phases: Phase[]; links?: FrameworkLink[] }
export interface Client { id: string; name: string; primaryColor: string; logoUrl: string; modules: ModuleDef[] }
export interface Workspace { version: 1; tenantId: string; clients: Client[]; activeClientId: string | null }
