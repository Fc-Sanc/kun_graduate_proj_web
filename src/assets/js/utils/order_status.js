export const order_status = {
  not_pay: {
    code: 'not_pay',
    text: '未支付'
  },
  paid: {
    code: 'paid',
    text: '已支付'
  },
  mailing: {
    code: 'mailing',
    text: '已发货'
  },
  delivered: {
    code: 'delivered',
    text: '已收货'
  },
  refund: {
    code: 'refund',
    text: '退款中'
  },
  refunded: {
    code: 'refunded',
    text: '已退款'
  }
}

export function getOrderStatusText(code) {
  return order_status[code].text
}

export function getOrderStatusCode(text) {
  for (let entry in order_status) {
    if (text === entry.text) return entry.code
  }
  return null
}
