import { createAutoLoginWithAxios } from './withAxios'

export class AutoLogin {
  asyncCb

  constructor(asyncCb: () => Promise<boolean>) {
    this.asyncCb = asyncCb
  }

  withAxios(axiosInstance: any) {
    return createAutoLoginWithAxios(axiosInstance, this.asyncCb)
  }
}
