export interface QueueTask {
  config: Record<string, any>
  resolve: (value: unknown) => void
}
