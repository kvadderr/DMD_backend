enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  USER = 'user'
}

enum Lang {
  RU = 'ru',
  EN = 'en'
}

enum OrderStatus {
  WAITING = 'waiting',
  SUCCESS = 'success',
  CANCELED = 'canceled'
}

export {
  Gender,
  UserRole,
  Lang,
  OrderStatus
}