/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ButtonIP {
  /**
   * ID of button
   */
  button_id: number;
  /**
   * Sent by Pi on startup as diagnostics. Used to easily discover the IP to VNC into.
   */
  button_ip_address?: string;
}
