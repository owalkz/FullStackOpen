::: mermaid
sequenceDiagram
participant Browser
participant Server
Browser->>Server: POST Request to https://studies.cs.helsinki.fi/exampleapp/new_note with form Data
Server->>Browser: 302 Response
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/notes for the HTML notes page
Server->>Browser: 200 Response with the HTML page
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/main.css for the CSS of the notes page
Server->>Browser: 200 Response with the requested CSS
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/main.js for the JS Script code of the notes page
Server->>Browser: 200 Response with the requested JS script
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/data.json for the notes data
Server->>Browser: 200 Response with the notes data
:::
