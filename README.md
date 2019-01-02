# mq-events
Repository holding information about the events published to our Message Queue server.


Each application should add a new folder to the repository where they may add a README.md file describing the events and their usage, as well as .json files describing any events emitted.

A application must prescribe all events they own, on which Vhost, Payload structure and queue name.

Two applications may not prescribe the same event in the case there is a overlap in publishing and subscribing for the purpose of triggers functions. 

Which application is the one to control the event is to be decided between the projects. If no agreement can be made, the head of Production will have the final word, but my consult other members and organizers if so chooses.

## Schema format
A format document shall be a .json file containing a single JSON object that describes the format of the message.
The format of the schema is derived from the mongoose schema model:

The schema consists of a `$meta` section consisting of the following required properties (each of which are strings):

```
"$meta": {
  "VHost": VHost this event is emit to,
  "name": Name of this message type,
  "queue": RabbitMQ queue name this event is emit to,
  "ownerTool": Name of the tool that controls this event
}
```


Any property is described as 
```
"propertyName": <type>
```
where `<type>` is either a string, a list of `<type>` or an object of the format 
```
{ "$type": <type>, <other metadata> }
```
If `<type>` is a string, it shall be one of the following:
```
"string"
"number"
"boolean"
"id"
```
While `<other metadata>` can consist of the following optional properties:
```
$required: A boolean (true/false) if this property HAS to be included in all events emitted of this type

$description: An arbitrary explanatory string that explains what this property denotes.
```

## Template
A full template that can be used to get started setting up a new message

```
{
  "$meta": {
    "vHost": "vhost.domain.tld",
    "name": "EventName",
    "queue": "queue-name",
    "ownerTool": "ToolName"
  },
  "_id": { "$type": "id", "$required": true, "$description": "The database ID of the affected item" }
}
```