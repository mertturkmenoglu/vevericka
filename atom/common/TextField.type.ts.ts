export const TextFieldTypeAsArray = ['text', 'password', 'email'] as const;

export type TextFieldType = typeof TextFieldTypeAsArray[number];
