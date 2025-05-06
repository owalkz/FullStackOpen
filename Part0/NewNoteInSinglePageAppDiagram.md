::: mermaid
sequenceDiagram
participant Browser
participant Server
Browser->>Server: POST Request to https://studies.cs.helsinki.fi/exampleapp/new_note_spa with form Data
Server->>Browser: 201 Response
:::
