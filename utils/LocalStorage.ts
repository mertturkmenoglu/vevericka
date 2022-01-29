export type LocalStorageField =
  | 'v-token'
  | 'v-user'
  | 'v-is-dark-theme';

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

  public get isDarkTheme(): boolean {
    const strValue = this.getValue('v-is-dark-theme');

    if (!strValue) {
      this.setValue('v-is-dark-theme', 'false');
      return false;
    }

    return strValue === 'true';
  }

  public set isDarkTheme(value: boolean) {
    this.setValue('v-is-dark-theme', value.toString());
  }
}