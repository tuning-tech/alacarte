# Alacarte
> A prototype for realtime peer to peer collaborative shopping cart.

## How to use

- `cd alacarte-web`

- `npm install`

- `ng serve` to run the app

- on a different window run `HOST=localhost PORT=4444 alacarte_web/node_modules/y-webrtc/bin/server.js`
    - This will run a signalling server for finding other peers

- Try sharing the app link to multiple tabs, multiple devices, we should be able to collaboratively edit the fodd ordering cart

