## Description
A generic react template to build web apps.

## Install
1. ```shell git clone https://github.com/nabeelthedev/react-template.git ```
2. ```cd react-template ```
3. ```sudo npm install ```

## Start
1. ```npm run dev```
2. http://localhost:8080/

Open */src/main.js* and start building your react app.

## Scripts
Use ```npm run dev``` to run *webpack-dev-server* to start development testing.<br/>
Use ```npm run build``` to build before publishing.

## Libraries
react, react-dom<br/>
bootstrap<br/>
jQuery<br/>
webpack, webpack-cli, webpack-dev-server<br/>
babel, babel-loader, babel/preset-env, babel/preset-react<br/>
css-loader, style-loader

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
*bootstrap.**bundle**.js* includes popper.js which is needed for some bootstrap functionality.

### jQuery
```javascript
import $ from 'jquery'
```
