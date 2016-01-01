'use strict';

var mat4 = require('gl-mat4');

var debugCubemap = require('gl-cubemap-placeholder');
var createSkybox = require('../index.js');

window.onload = function() {

    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.width = canvas.style.height = '100%';
    document.body.appendChild(canvas);

    var gl = canvas.getContext('webgl');
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    var textures = debugCubemap(gl);
    var skybox = createSkybox(gl, textures);

    var view = mat4.create();
    var projection = mat4.create();

    gl.clearColor(1,0,1,1);

    var tick = 0;

    function render() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        tick += 0.01;
        mat4.lookAt(view, [0,0,0], [Math.cos(tick), Math.cos(tick), Math.sin(tick)], [0,1,0]);
        mat4.perspective(projection, Math.PI/2, canvas.width/canvas.height, 0.1, 10.0);

        skybox.draw({
            view: view,
            projection: projection
        });

        requestAnimationFrame(render);
    }

    render();
}
