import type { QueueTask } from './types'

export function createAutoLoginWithAxios(axiosInstance: (config: Record<string, any>) => void, asyncCb: () => Promise<boolean>) {
  const queue = [] as QueueTask[]

  let refreshing = false

  return async function autologin(config: Record<string, any>) {
    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        })
      })
    }

    refreshing = true

    await asyncCb()

    refreshing = false

    queue.forEach(({ config: cg, resolve }) => {
      resolve(axiosInstance(cg))
    })
    return axiosInstance(config)
  }
}
