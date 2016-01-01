# geo-disjoint-skybox

Six cube face geometries forming a disjoint skybox.

## Install

```sh
npm install geo-disjoint-skybox
```

## Example

```js
var debugCubemap = require('gl-cubemap-placeholder');
var createSkybox = require('geo-disjoint-skybox');

...

var textures = debugCubemap(gl);
var skybox = createSkybox();

var geoms = {pos: {}, neg: {}};

geoms.pos.x = Geometry(gl)
    .attr('aPosition', skybox.pos.x.positions)
    .attr('aUV', skybox.pos.x.uvs, {size: 2});
geoms.pos.y = Geometry(gl)
    .attr('aPosition', skybox.pos.y.positions)
    .attr('aUV', skybox.pos.y.uvs, {size: 2});
geoms.pos.z = Geometry(gl)
    .attr('aPosition', skybox.pos.z.positions)
    .attr('aUV', skybox.pos.z.uvs, {size: 2});
geoms.neg.x = Geometry(gl)
    .attr('aPosition', skybox.neg.x.positions)
    .attr('aUV', skybox.neg.x.uvs, {size: 2});
geoms.neg.y = Geometry(gl)
    .attr('aPosition', skybox.neg.y.positions)
    .attr('aUV', skybox.neg.y.uvs, {size: 2});
geoms.neg.z = Geometry(gl)
    .attr('aPosition', skybox.neg.z.positions)
    .attr('aUV', skybox.neg.z.uvs, {size: 2});

...

program.uniforms.uTexture = textures.pos.x.bind(0);
geoms.pos.x.bind(program);
geoms.pos.x.draw();
program.uniforms.uTexture = textures.pos.y.bind(0);
geoms.pos.y.bind(program);
geoms.pos.y.draw();
program.uniforms.uTexture = textures.pos.z.bind(0);
geoms.pos.z.bind(program);
geoms.pos.z.draw();
program.uniforms.uTexture = textures.neg.x.bind(0);
geoms.neg.x.bind(program);
geoms.neg.x.draw();
program.uniforms.uTexture = textures.neg.y.bind(0);
geoms.neg.y.bind(program);
geoms.neg.y.draw();
program.uniforms.uTexture = textures.neg.z.bind(0);
geoms.neg.z.bind(program);
geoms.neg.z.draw();

```

## API

```js
var createSkybox = require('geo-disjoint-skybox');
```

#### `var geometries = createSkybox()`

Returns six skybox face geometries in the form:

```js
{
    pos: {
        x: {
            positions: [...],
            uvs: [...]
        },
        y: {
            positions: [...],
            uvs: [...]
        },
        z: {
            positions: [...],
            uvs: [...]
        }
    },
    neg: {
        x: {
            positions: [...],
            uvs: [...]
        },
        y: {
            positions: [...],
            uvs: [...]
        },
        z: {
            positions: [...],
            uvs: [...]
        }
    }
}
```
