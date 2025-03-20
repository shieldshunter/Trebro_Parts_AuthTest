# minimal-authentication-page

This is a minimal sample application built using Vite, TypeScript, HTML, and
WebComponents. It is a simple authentication page which uses email whitelisting to
dynamically display form components. Uses Password Hashing as well as Azure Blobs
for storage. Authentication leads to an Iframe containing Parts Manual data.

## Running the demo

1. Install dependencies:

```bash
yarn install
```

2. Run `dev` script:

```bash
yarn run dev
```

3. Go to:

[http://localhost:3000](http://localhost:3000)

(Your port might be different.
Check the actual port in the output of the previous command.)

## Loading data

You can load data by drag and drop, or using a pick file dialog.
