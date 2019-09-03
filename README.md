# mq-events

Repository holding information about the events published to our Message Queue server.

Each application defining new events should add a new folder in `definitions/` where they may add a README.md file describing the events and their usage, as well as .json files describing any events emitted.

An application must prescribe all events it owns, including information about its VHost, payload structure and queue name.

Two applications may not prescribe the same event in the case there is overlap in publishing and subscribing for the purpose of triggers functions.

Which application is the one to control the event is to be decided between the projects. If no agreement can be made, the Head of Production will have the final word and may consult other members and organizers if they so choose.

## Event definition format

A document describing and event shall be a .json file containing a single JSON object that describes the format of the message in the [JSON Schema](https://json-schema.org/) format, using the `schemas/event-schema.json` schema from this repository.

Following is an example event definition using this schema:

```json
{
	"$schema": "https://raw.githubusercontent.com/esamarathon/mq-events/master/schemas/event-schema.json",
	"$meta": {
		"vHost": "vhost.domain.tld",
		"name": "EventName",
		"exchange": "exchange",
		"routingKey": "routing.key.for.event",
		"ownerTool": "ToolName"
	},
	"required": [
		"_id",
		"nullableProp"
	],
	"properties": {
		"_id": {
			"type": "string",
			"description": "The database ID of the affected item"
		},
		"optionalProp": {
			"type": "number",
			"description": "A property that can either be undefined or a number, but will never be null"
		},
		"nullableProp": {
			"type": ["null", "string"],
			"description": "A property that can either be null or a number, but will always be declared"
		}
	},
	"additionalProperties": false
}
```

Aside from standard JSON Schema properties the schema has a `$meta` property consisting of the following properties:

```js
"$meta": {
	"vHost": "esa_prod", // VHost this event is emitted to
	"name": "DonationFullyProcessed", // Name of this message type
	"exchange": "tracker", // RabbitMQ exchange name this event is emitted to
	"routingKey": "<event name>.donation.<donation ID>.fully_processed", // RabbitMQ routing key (topic) this event is emitted to in a custom format (see below)
	"ownerTool": "Tracker", // Name of the tool that controls this event
	"accessControl": "jwt.id === this._id" // (optional) access control code (see below)
}
```


### `routingKey` property

The `routingKey` property is a string describing possible parts of the topic.

It may contain any of the following special sequences:

- `<word_name>` signifies a single word of the topic. The word may be prefixed or suffixed with other sequences. The word must not be empty. The name of the word must not consist of characters other than `/a-z0-9_/`. This is similar to `/[^\.]+/` in RegEx.

- `{,a,b}` signifies a choice between any of the included options. Each comma begins a new option. A single empty option may be included at the beginning to signify that this choice can be missing. Options may include dots, other choice sequences and word sequences. This is similar to `/(|a|b)/` in RegEx.

#### Examples

`routingKey` | Matching topics | Invalid topics
---|---|---
`<event_name>.started` | `esaw2019s1.started` | `esaw2019s2.ended`, `.started`
`timer.{started,paused}` | `timer.started`, `timer.paused` | `timer.restarted`
`donation.update{,.read}` | `donation.update`, `donation.update.read` | `donation.update.approved`
`esa{w|s}<year>s1` | `esaw2019s1`, `esas2019s1`, `esaw2020s1` | `esaw`, `esa2019s1`, `esaws1`, `esaw2019s2`


### `accessControl` property

The `$meta.accessControl` field contains arbitrary JavaScript code (including `require()` calls) that verifies if the user has access to this event.
The code shall return a boolean `true` if the user can access the event.

In the scope of this code, the following values are exposed:
* `jwt` the user's JWT token, which has already been decoded and verified.
* `this` is the event or filter the check is being run against
* `hasPermission(<permission name>)` checks if the user has access to a specific permission

This code shall be functional and therefore have no side effects (aside from logging or similar, if needed). For users with the `Admin` permission, this check is ommitted.
