/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface OBSStreamingStatusChanged {
  /**
   * Short name for the physical event this message was for, usually the same as the donation tracker.
   */
  event: string;
  /**
   * Specifies if streaming has stopped or started.
   */
  streaming: boolean;
  /**
   * Time the streaming status was changed.
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
