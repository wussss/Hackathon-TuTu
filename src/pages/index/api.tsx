import { baseUrl } from '../../config'

interface IData {
  url: string
  status: number
}

// 生成妆图
export function genPhoto(id: string, before: string): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseUrl + '/gen_photo',
      filePath: before,
      name: 'photo',
      formData: {
        target_id: id || '0',
      },
      header: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
      success: function (res) {
        const data: IData = JSON.parse(res.data)
        resolve(data.url)
        // setAfter(data.url)
      },
      fail: function (res) {
        console.error(res)
        reject(res)
      },
    })
  })
}

// 上传妆面
export function uploadMakeup(): Promise<any> {
  const mid: string = Date.now() + '000' + ~~(Math.random() * 10000)
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        const customMakeUp = res.tempFilePaths[0]
        wx.uploadFile({
          url: baseUrl + '/up_photo',
          filePath: customMakeUp,
          name: 'photo',
          formData: {
            makeup_id: mid,
          },
          header: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
          success: function (res) {
            const data: IData = JSON.parse(res.data)
            const newItem = {
              id: mid,
              src: data.url,
              text: '自定义',
            }
            resolve(newItem)
          },
          fail: function (res) {
            console.error(res)
            reject(res)
          },
        })
      },
      fail: function (res) {
        console.error(res)
        reject(res)
      },
    })
  })
}
