import { combineReducers } from 'redux'

import { appReducer } from 'app/appReducer'
import { apiReducer } from 'app/apiReducer'
import { docReducer } from 'app/document/reducer'
import { memReducer } from 'app/member/reducer'
import { profileReducer } from 'app/profile/reducer'
import { adminReducer } from 'app/admin/reducer'
import { homeReducer } from 'app/home/reducer'

const rootReducer = combineReducers({
  api: apiReducer,
  app: appReducer,
  home: homeReducer,
  doc: docReducer,
  mem: memReducer,
  profile: profileReducer,
  admin: adminReducer
})

export default rootReducer
