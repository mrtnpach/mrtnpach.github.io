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
    gl.clearColor(0.4, 0.612, 0.561, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const vertices = new Float32Array([
        // Front face
        -1.0, -1.0, 1.0, 
        1.0, -1.0, 1.0, 
        1.0, 1.0, 1.0, 
        -1.0, 1.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0, 
        -1.0, 1.0, -1.0, 
        1.0, 1.0, -1.0, 
        1.0, -1.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0, 
        -1.0, 1.0, 1.0, 
        1.0, 1.0, 1.0, 
        1.0, 1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0, 
        1.0, -1.0, -1.0, 
        1.0, -1.0, 1.0, 
        -1.0, -1.0, 1.0,
        // Right face
        1.0, -1.0, -1.0, 
        1.0, 1.0, -1.0, 
        1.0, 1.0, 1.0, 
        1.0, -1.0, 1.0,
        // Left face
        -1.0, -1.0, -1.0, 
        -1.0, -1.0, 1.0, 
        -1.0, 1.0, 1.0, 
        -1.0, 1.0, -1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      0, // Assume location = 0?
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(0);

    const faceColors = [
        [0.659, 0.118, 0.047],
        [0.659, 0.118, 0.047],
        [0.047, 0.306, 0.659],
        [0.047, 0.306, 0.659],
        [0.831, 0.816, 0.035],
        [0.831, 0.816, 0.035],
    ];

    let colors = [];
    for (const c of faceColors) 
    {
        colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
      1, // Assume location = 1?
      3,
      gl.FLOAT,
      false,
      0,
      0,
    );
    gl.enableVertexAttribArray(1);

    // Use VAO later!!
    const indices = new Uint16Array([
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ]);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

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
    
    gl.useProgram(shaderProgram);
    const viewMatrix = mat4.create();
    mat4.lookAt(
      viewMatrix,
      [0.0, 0.0, -8.0],
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

    const modelMatLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
    const viewMatLocation = gl.getUniformLocation(shaderProgram, "viewMatrix");
    const projMatLocation = gl.getUniformLocation(shaderProgram, "projectionMatrix");

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

        gl.uniformMatrix4fv(modelMatLocation, false, modelMatrix);
        gl.uniformMatrix4fv(viewMatLocation, false, viewMatrix);
        gl.uniformMatrix4fv(projMatLocation, false, projectionMatrix);

        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(renderScene);
    }
    requestAnimationFrame(renderScene);
}

export default Render;