/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface NewScreenedSub {
  message: {
    /**
     * The message following the system message.
     */
    trailing?: string;
    /**
     * This object represents a deserialized Twitch IRC message. Only properties that we use are listed here.
     */
    tags: {
      /**
       * The system message supplied by Twitch. Spaces are escaped as `\s`.
       */
      "system-msg": string;
      [k: string]: any;
    };
  };
}
