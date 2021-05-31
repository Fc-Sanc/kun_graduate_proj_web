import {get_image_url} from "assets/js/api/api_internal";
import {date} from "quasar";
import {time_formats} from "assets/js/utils/time_formats";

export function userModel(user) {
  let model = {}

  model.id = user.id
  model.createTime = date.formatDate(user.createTime, time_formats.format1)
  model.username = user.username
  model.avatar = get_image_url(user.portraitUrl)
  model.balance = user.balance

  return model
}
