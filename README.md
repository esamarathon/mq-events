# mq-events
Repository holding information about the events published to our Message Queue server.


Each application should add a new folder to the repository where they may add a README.md file describing the events and their usage, as well as Protobuf files describing any datatypes used.

A application must prescribe all events they own, on which Vhost, Payload structure and queue name.

Two applications may not prescribe the same event in the case there is a overlap in publishing and subscribing for the purpose of triggers functions. 

Which application is the one to control the event is to be decided between the projects. If no agreement can be made, the head of Production will have the final word, but my consult other members and organizers if so chooses.
