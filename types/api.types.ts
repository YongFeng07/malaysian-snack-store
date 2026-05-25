export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  ok: boolean
}
