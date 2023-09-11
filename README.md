# Ubiquiti FE Test Assignment

Imagine that you are a developer at Ubiquiti, Inc. and your product manager has asked you to help another team - to kick-start a project and put it in good shape for that other team to take over.

Your product manager has shared the context: multiple teams need a shared internal productivity tool to help developers, designers, PM:s and other roles to discover, verify, share and align on insights about Ubiquit’s products and their images to visualize the product database UIDB which is used by many systems.

The designers have defined the UX and UI for all the features that the teams were asking for get the Figma file here. But they have not negotiated the design with you. Feel free to alter things if you have good reasons.

Currently these are the key fields in UIDB:

- id - primary key
- line - what you use for Filters
- product.name - human readable name
- shortnames - multiple lookup keys as used by various systems and their versions
- icon.id - used for image urls
- icon.resolutions - ordered list of available image sizes (width and height)
- images should be square
- notice that a lot of devices have a more limited set of sizes than others

Image urls can be built using
`https://static.ui.com/fingerprint/ui/icons/${icon.id}_${size.width}x${size.height}.png`

For an example see: https://static.ui.com/fingerprint/ui/icons/1a431afe-91c6-400f-bd34-c2eeffec263d_257x257.png

The UIDB team is not guaranteeing the schema won't change tomorrow. Your product manager asks you to expect the unexpected and fail gracefully.

React and Typescript are requirements, but the other teams will adopt potential additional choices.

You don’t know the other team and have no ability to talk to them. Whatever you hand over has to be in the git repository.

Product managers and designers will not be able to run your code just to see what you have built. Deploy your latest version somewhere online.

You have only NN hours. Make the biggest impact you can!

Practicalities
If you have any questions about the assignment or the hand-off process please reach out to simon.perstorper@ui.com.

## Table of Contents:

- [Getting Started](#getting-started)

- [Installation options](#installation-options)

## Getting Started

First, run the development server:

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Installation options

1. Clone this repo: `git clone https://github.com/davidkluvers/ubiquiti-uidb.git`

2. Navigate to the directory and run `npm install`

3. Run `npm run dev`

4. Make your changes
