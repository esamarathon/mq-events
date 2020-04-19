/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface SponsorLogoChanged {
  /**
   * Short name for the physical event this message was for, usually the same as the donation tracker.
   */
  event: string;
  /**
   * Name/URL of the logo file that is now being shown; will not be defined if nothing is shown on stream.
   */
  logo?: string;
  /**
   * Length of time in seconds that the sponsor logo is set to show for; will not be defined if nothing is shown on stream.
   */
  length?: number;
  /**
   * Time the sponsor logo changed
   */
  time: {
    /**
     * Timestamp representation in the ISO 8601 format
     */
    iso: string;
    /**
     * Timestamp representation in seconds since the Unix epoch, including a fractional millisecond part
     */
    unix: number;
  };
}
