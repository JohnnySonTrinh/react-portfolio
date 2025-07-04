import { useEffect } from "react";

const useWebGLAnimation = (canvasRef, audioData) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: true });

    // WebGL shader source codes
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source code
    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_audioData;

      vec2 hash(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                        dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      }

      vec3 getGradientColor(float t) {
          vec3 purple = vec3(84.0/255.0, 3.0/255.0, 81.0/255.0);
          vec3 cyan = vec3(37.0/255.0, 175.0/255.0, 206.0/255.0);
          float cycle = fract(t);
          if (cycle < 0.5) {
              return mix(purple, cyan, cycle * 2.0);
          } else {
              return mix(cyan, purple, (cycle - 0.5) * 2.0);
          }
      }

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          uv = uv * 2.0 - 1.0;
          uv.x *= u_resolution.x / u_resolution.y;

          float radius = 0.5 + u_audioData * 0.5;
          float edgeThickness = 0.05;

          float dist = length(uv) - radius;
          float n = noise(uv * 4.0 + vec2(u_time * 0.5, u_time * 0.5)) * 0.1;
          n += noise(uv * 8.0 + vec2(u_time * 0.3, -u_time * 0.3)) * 0.05;

          float edge = smoothstep(edgeThickness, 0.0, dist + n);

          float gradientSpeed = 0.02;
          float gradientPosition = fract(uv.x * 0.25 - u_time * gradientSpeed);
          vec3 color = getGradientColor(gradientPosition);

          color *= edge;

          gl_FragColor = vec4(color, edge);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const audioDataLocation = gl.getUniformLocation(program, "u_audioData");

    const resizeCanvasIfNeeded = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    let frameId;
    const render = (time) => {
      time *= 0.001;

      resizeCanvasIfNeeded();

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(audioDataLocation, audioData.current);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [canvasRef, audioData]);
};

export default useWebGLAnimation;
