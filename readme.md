## Description

A generic react template to build web apps.

## Install

1. `git clone https://github.com/nabeelthedev/react-template.git`
2. `cd react-template`
3. `npm install`

## Start

1. `npm run dev`
2. http://localhost:8080/

Open _/src/main.js_ and start building your react app.

## Scripts

Use `npm run dev` to run _webpack-dev-server_ to start development testing.<br/>
Use `npm run build` to build before publishing.

## How to include libraries

### react, react-dom

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
```

### bootstrap

```javascript
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
```

_bootstrap.**bundle**.js_ includes popper.js which is needed for some bootstrap functionality.
