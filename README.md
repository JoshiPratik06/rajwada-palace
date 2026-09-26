# JoshiWada Hotel & Dining Demo

A responsive React/Vite front-end demo for JoshiWada in Shivajinagar, Pune.
There is no backend: bookings, saved rooms, cart contents, food orders, and
demo accounts are stored locally in the current browser only.

## Run locally

```sh
npm install
npm run dev
```

Other available scripts:

```sh
npm run build
npm run preview
npm run lint
```

## Demo features

- Browse, filter, and compare rooms. Prices and availability are sample data.
- Save demo bookings, wishlist selections, and cart/orders in browser storage.
- Use the footer’s **Clear local demo data** control to erase those saved items.
- Choose English, Hindi, or Marathi from the navigation language selector.
- Install the site where supported, or open it offline after the first online load.
  The offline experience uses a cached app shell; remote photos and fonts may not
  be available without an internet connection.
- Use map directions, phone, and email links for the Shivajinagar location.

## Important limitations

This project does not send reservations, process payments, submit contact or
newsletter forms to a server, or share locally saved data between devices.
Contact actions open the visitor’s email app. Do not enter real passwords,
payment details, or sensitive personal information into this demo.

The installable app and service worker require HTTPS in deployment (localhost is
also supported for development). Route metadata is updated by the client-side
app; social preview crawlers that do not run JavaScript may only see the default
metadata in `index.html`.
