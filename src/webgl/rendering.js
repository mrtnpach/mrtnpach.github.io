// Will refactor later, I promise
import { vertexShaderSource, fragmentShaderSource } from "./shaders";
import { mat4 } from "gl-matrix";

let rotationRadians = 0.0;
let deltaTime = 0.0;

function Render(canvas) {
    const gl = canvas.getContext("webgl");

    if(!gl) {
      return;
    }

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const vertices = new Float32Array([
      // Position         // Color
      -0.5, -0.5, -0.5,   1.0, 0.0, 0.0, // 0
      0.5, -0.5, -0.5,    0.0, 0.0, 1.0, // 1
      0.5,  0.5, -0.5,    0.0, 1.0, 0.0, // 2
      -0.5,  0.5, -0.5,   1.0, 0.0, 0.0, // 3
      -0.5, -0.5,  0.5,   0.0, 0.0, 1.0, // 4
      0.5, -0.5,  0.5,    0.0, 1.0, 0.0, // 5
      0.5,  0.5,  0.5,    1.0, 0.0, 1.0, // 6
      -0.5,  0.5,  0.5,   1.0, 1.0, 0.0 // 7
    ]);

    const indices = new Uint16Array([
      // Front (+Z)
      4, 5, 6,
      4, 6, 7,

      // Back (-Z)
      0, 2, 1,
      0, 3, 2,

      // Left (-X)
      0, 4, 7,
      0, 7, 3,

      // Right (+X)
      1, 2, 6,
      1, 6, 5,

      // Top (+Y)
      3, 7, 6,
      3, 6, 2,

      // Bottom (-Y)
      0, 1, 5,
      0, 5, 4,
    ]);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Compilation will succeed. I believe!
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // I still believe!

    // Use VAO later!!
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      0, // Assume location = 0?
      3,
      gl.FLOAT,
      false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(0);
    
    gl.vertexAttribPointer(
      1, // Assume location = 1?
      3,
      gl.FLOAT,
      false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT,
    );
    gl.enableVertexAttribArray(1);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);
    
    const viewMatrix = mat4.create();
    mat4.lookAt(
      viewMatrix,
      [0.0, 0.0, -3.0],
      [0.0, 0.0, 0.0,],
      [0.0, 1.0, 0.0]
    );
    
    const projectionMatrix = mat4.create();
    mat4.perspective(
      projectionMatrix,
      Math.PI / 4,
      canvas.width / canvas.height,
      0.1,
      100
    );

    let prevTime = 0;

    function renderScene(now)
    {
        now *= 0.001;
        deltaTime = now - prevTime;
        prevTime = now;

        rotationRadians += 50.0 * deltaTime;
        let yPosition = Math.sin(2.0 * now) / 3.0;

         // draw-scene
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const modelMatrix = mat4.create();
        mat4.identity(modelMatrix);
        mat4.translate(modelMatrix, modelMatrix, [0.0, yPosition, 0.0]);
        mat4.rotateY(modelMatrix, modelMatrix, rotationRadians / 180)
        mat4.rotateX(modelMatrix, modelMatrix, rotationRadians / 180)

        gl.useProgram(shaderProgram);

        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "modelMatrix"),
            false,
            modelMatrix
        );

        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "viewMatrix"),
            false,
            viewMatrix
        );

        gl.uniformMatrix4fv(
            gl.getUniformLocation(shaderProgram, "projectionMatrix"),
            false,
            projectionMatrix
        );

        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(renderScene);
    }
    requestAnimationFrame(renderScene);
}

export default Render;