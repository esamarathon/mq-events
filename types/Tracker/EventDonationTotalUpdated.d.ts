/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface EventDonationTotalUpdated {
  /**
   * Shorthand event string this total is for.
   */
  event: string;
  /**
   * The new overall donation total. Currency isn't specified but is (currently) USD.
   */
  new_total: number;
}
