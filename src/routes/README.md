# Includes

Components For Certain Route / URL

## Folders / Files

### Tree

+route1  
  +__tests__  
  +_components (optional)  
  index.js  
  messages.js (optional)  
  _routes.js (optional)  
  Route1Component.js  
  +Route2Component
+route2  
  ...  

### Files Description

Every component has a root folder with the proper screen name.  
`components` is a folder to keep the components to be used to render this route(all common components to be used under this route). Each component can be a single file or have a structure same to this (and nested again if necessary) - components, __tests__, index.js, messages.js. When the component is defined as a single file (ie. Header), you need to define a test file under __tests__ of this route.  
`index.js` is where we define a container/page.  
`messages.js` is to keep the pairs of id and defaultMessage for multilingual titles/subheadings/descriptions/captions/...  
`_routes.js` is a file to keep the nested routes. no need to write test file for this.  
`Route1Component.js` if a component(for a route) is simple enough without nested routes or components, it can be written in a file.  
`Route2Component` if a component(for a route) is complicated having nested routes or components, it should be written in a folder.  
