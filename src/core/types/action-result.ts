// /core/types/action-result.ts
export type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; message: string };
