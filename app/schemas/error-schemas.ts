// ОШибки валидации
export const ERROR_ISSUE_SCHEME = {
  USER_ID: {
    number: {
      required_error: "ID обязателен",
      invalid_type_error: "ID должен быть числом",
    },
  },
  TITLE: {
    required_error: "Заголовок обязателен",
    invalid_type_error: "Заголовок должен быть строкой",
    min: "Заголовок должен содержать не менее 1 символа",
    max: "Заголовок должен содержать не более 255 символов",
  },
  DESCRIPTION: {
    required_error: "Описание обязательно",
    invalid_type_error: "Описание должно быть строкой",
    min: "Описание должно содержать не менее 1 символа",
  },
};
