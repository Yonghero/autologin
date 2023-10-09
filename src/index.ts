import { createAutoLoginWithAxios } from './withAxios'

export class AutoLogin {
  asyncCb

  constructor(asyncCb: () => Promise<boolean>) {
    this.asyncCb = asyncCb
  }

  withAxios(axiosInstance: (config: Record<string, any>) => void) {
    return createAutoLoginWithAxios(axiosInstance, this.asyncCb)
  }
}
