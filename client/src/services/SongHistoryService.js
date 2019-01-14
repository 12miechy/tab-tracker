import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('histories', {
      params: params
    })
  },
  post (histroy) {
    return Api().post('histories', histroy)
  }
}
