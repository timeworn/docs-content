export interface GiveCurrency {
  currency: "credits" | "eternium" | "quartz" | "admincoins" | "id";
  /**
   * @default 1
   */
  count?: number;
}

export interface GiveItem {
  id: number;
  /**
   * @default 1
   */
  count?: number;
}
