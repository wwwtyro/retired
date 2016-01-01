'use strict';

var Geometry = require('gl-geometry');
var glShader = require('gl-shader');
var glslify = require('glslify');
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

    var program = glShader(gl, glslify('./simple.vert'), glslify('./simple.frag'));

    var uModel = mat4.create();
    var uView = mat4.create();
    var uProjection = mat4.create();

    gl.clearColor(1,0,1,1);

    var tick = 0;

    function render() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        tick += 0.01;
        mat4.lookAt(uView, [0,0,0], [Math.cos(tick), Math.cos(tick), Math.sin(tick)], [0,1,0]);
        mat4.perspective(uProjection, Math.PI/2, canvas.width/canvas.height, 0.1, 10.0);

        program.bind();
        program.uniforms.uModel = uModel;
        program.uniforms.uView = uView;
        program.uniforms.uProjection = uProjection;
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

        requestAnimationFrame(render);
    }

    render();
}
