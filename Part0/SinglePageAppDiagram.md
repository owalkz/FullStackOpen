::: mermaid
sequenceDiagram
participant Browser
participant Server
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/spa for the HTML notes page
Server->>Browser: 200 Response with the HTML page
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/main.css for the CSS of the single page application
Server->>Browser: 200 Response with the requested CSS
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/spa.js for the JS Script code of the single page application
Server->>Browser: 200 Response with the requested JS script
Browser->>Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/data.json for the notes data
Server->>Browser: 200 Response with the notes data
:::
