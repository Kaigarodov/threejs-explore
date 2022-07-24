import glsl from 'glslify'

const fragment = glsl(`
// An incoming value from JavaScript
      uniform float u_time;
      // An incoming value from the vertex shader
      varying vec2 vUv;
      // Let's define PI constant
      #define PI 3.14

      void main () {
        vec3 color = vec3(0.0);
        
        color.r = abs(sin(vUv.x + u_time));
        color.g = abs(cos(vUv.y + u_time));
        color.b = abs(sin(vUv.y + u_time));
        
        gl_FragColor = vec4(color, 1.0);
      }
`)

export default fragment 