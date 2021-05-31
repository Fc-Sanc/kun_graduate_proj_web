import {date} from "quasar";
import {time_formats} from "assets/js/utils/time_formats";
import {getOrderStatusText} from "assets/js/utils/order_status";
import {get_image_url} from "assets/js/api/api_internal";

export function orderModel(order) {
  return {
    id: order.id,
    createTime: date.formatDate(order.createTime, time_formats.format2),
    quantity: order.orderDetail.quantity,
    status: getOrderStatusText(order.orderDetail.status),
    total_price: order.orderDetail.totalPrice,
    book: {
      id: order.orderDetail.book.id,
      isbn: order.orderDetail.book.isbn,
      name: order.orderDetail.book.name,
      coverUrl: get_image_url(order.orderDetail.book.coverUrl),
      price: order.orderDetail.book.price,
      type: order.orderDetail.book.type.name,
      author: order.orderDetail.book.author.name,
      brief: order.orderDetail.book.descText,
      language: order.orderDetail.book.language,
    },
    user_address: {
      id: order.userAddress.id,
      address: order.userAddress.address,
      phoneNumber: order.userAddress.phoneNumber,
      receiver: order.userAddress.receiver,
    },
  }

}
