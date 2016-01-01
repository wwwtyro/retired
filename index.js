'use strict';

var tform = require('geo-3d-transform-mat4');
var clonedeep = require('lodash.clonedeep');
var mat4 = require('gl-mat4');

var faces = {
    pos: {x: {}, y: {}, z:{}},
    neg: {x: {}, y: {}, z:{}}
}

var _nz = [
    -1, -1, -1,
     1, -1, -1,
     1,  1, -1,
    -1, -1, -1,
     1,  1, -1,
    -1,  1, -1
];

var rot;

rot = mat4.create();
mat4.rotateY(rot, rot, Math.PI/2);
faces.neg.x.positions = tform(_nz, rot);

rot = mat4.create();
mat4.rotateX(rot, rot, -Math.PI/2);
faces.neg.y.positions = tform(_nz, rot);

faces.neg.z.positions = _nz.slice(0);

rot = mat4.create();
mat4.rotateY(rot, rot, -Math.PI/2);
faces.pos.x.positions = tform(_nz, rot);

rot = mat4.create();
mat4.rotateX(rot, rot, Math.PI/2);
faces.pos.y.positions = tform(_nz, rot);

rot = mat4.create();
mat4.rotateY(rot, rot, Math.PI);
faces.pos.z.positions = tform(_nz, rot);

var _uv = [
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1
];

faces.neg.x.uvs = _uv.slice(0);
faces.neg.y.uvs = _uv.slice(0);
faces.neg.z.uvs = _uv.slice(0);
faces.pos.x.uvs = _uv.slice(0);
faces.pos.y.uvs = _uv.slice(0);
faces.pos.z.uvs = _uv.slice(0);

module.exports = function() {
    return clonedeep(faces);
}
