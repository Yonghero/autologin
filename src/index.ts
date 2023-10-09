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

// const autologin = new AutoLogin(async () => (true))

// const al = autologin.withAxios()

// al(config)
