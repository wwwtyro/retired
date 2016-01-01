# gl-disjoint-skybox

Draws a disjoint skybox into a 3D scene.

## Install

```sh
npm install gl-disjoint-skybox
```

## Example
```js
var debugCubemap = require('gl-cubemap-placeholder');
var createSkybox = require('gl-disjoint-skybox');

var textures = debugCubemap(gl);
var skybox = createSkybox(gl, textures);

var view = mat4.create();
var projection = mat4.create();

mat4.lookAt(view, [0,0,0], [0,0,-1], [0,1,0]);
mat4.perspective(projection, Math.PI/2, width/height, 0.1, 10.0);

skybox.draw({
    view: view,
    projection: projection
});

```

## API
```js
var createSkybox = require('gl-disjoint-skybox');
```

### Constructor

`var skybox = createSkybox(gl, textures)`

Returns a skybox object ready for rendering.

Takes a WebGL context `gl` and a disjoint cubemap `textures` structured so:

```js
{
    pos: {
        x: gl-texture2d texture,
        y: gl-texture2d texture,
        z: gl-texture2d texture
    },
    neg: {
        x: gl-texture2d texture,
        y: gl-texture2d texture,
        z: gl-texture2d texture
    }
}
```
See [gl-texture2d](https://github.com/stackgl/gl-texture2d) for more
information about the required texture objects.

### Methods

`skybox.draw(camera)`

Takes an object `camera` that has `view` and `projection` fields defined:

```js
{
    view: gl-mat4 view matrix,
    projection: gl-mat4 projection matrix
}
```

`skybox.update(textures)`

Updates the skybox textures. Takes a disjoint cubemap `textures` structured
as described in the constructor.

`skybox.dispose()`

Disposes of all resources associated with the skybox.
