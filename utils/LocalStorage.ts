export type LocalStorageField =
  | 'v-token'
  | 'v-user';

export class LocalStorage {
  private setValue(field: LocalStorageField, value: string): void {
    window.localStorage.setItem(field, value);
  }

  private getValue(field: LocalStorageField): string | null {
    return window.localStorage.getItem(field);
  }

  public get vToken(): string {
    return this.getValue('v-token') || '';
  }

  public set vToken(value: string) {
    this.setValue('v-token', value);
  }
}