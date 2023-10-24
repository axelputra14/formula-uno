# client

A Vue3 based website with Vue router and Pinia.
Individual project for FSJS batch 06 2023. Formula Uno. A simple fansite who loves F1. You could see list of scheduled F1 circuits from 2012 to 2023 along with their location using Google Maps. Connected to an ExpressJS backend that uses Prisma as ORM.

Third party API used:

- https://rapidapi.com/api-sports/api/api-formula-1
- Google Map API

Package used:

- Axios
- ElevatorJS
- Sweetalert2

Extra features:

- Registration requires client to verify email first before login.
- Carousel of vids on home page.
- Ability to move between navigation using speech-to-text function of webkitSpeechRecognition. Try say "home", "circuit", and "logout" after clicking speech button.
