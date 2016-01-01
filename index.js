var Geometry = require('gl-geometry');
var glShader = require('gl-shader');
var glslify = require('glslify');
var mat4 = require('gl-mat4');
var createSkyboxGeometry = require('geo-disjoint-skybox');

function Skybox(gl, textures) {

    var skybox = createSkyboxGeometry();

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

    var program = glShader(gl, glslify('./skybox.vert'), glslify('./skybox.frag'));

    var model = mat4.create();

    this.update = function(newTextures) {
        textures = newTextures;
    }

    this.draw = function(camera) {
        program.bind();
        program.uniforms.uModel = model;
        program.uniforms.uView = camera.view;
        program.uniforms.uProjection = camera.projection;
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
    }

    this.dispose = function() {
        program.dispose();
        geoms.pos.x.dispose();
        geoms.pos.y.dispose();
        geoms.pos.z.dispose();
        geoms.neg.x.dispose();
        geoms.neg.y.dispose();
        geoms.neg.z.dispose();
    }


}

module.exports = function createSkybox(gl, textures) {
    return new Skybox(gl, textures);
}
