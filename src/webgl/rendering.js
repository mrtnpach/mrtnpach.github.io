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

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    //     console.log(
    //     `An error occurred compiling the shaders: ${gl.getShaderInfoLog(vertexShader)}`,
    //     );
    //     gl.deleteShader(vertexShader);
    //     return null;
    // }

    // Compilation will succeed. I believe!
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    //     console.log(
    //     `An error occurred compiling frag shaders: ${gl.getShaderInfoLog(fragmentShader)}`,
    //     );
    //     gl.deleteShader(fragmentShader);
    //     return null;
    // }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
            shaderProgram,
        )}`
        );
        return null;
    }

    // I still believe!
    gl.useProgram(shaderProgram);

    const vertices = new Float32Array([
        // Front face       Normals
        -1.0, -1.0, 1.0,    0.0, 0.0, 1.0,
        1.0, -1.0, 1.0,     0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,      0.0, 0.0, 1.0,
        -1.0, 1.0, 1.0,     0.0, 0.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0,   0.0, 0.0, -1.0,
        -1.0, 1.0, -1.0,    0.0, 0.0, -1.0,
        1.0, 1.0, -1.0,     0.0, 0.0, -1.0,
        1.0, -1.0, -1.0,    0.0, 0.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0,    0.0, 1.0, 0.0,
        -1.0, 1.0, 1.0,     0.0, 1.0, 0.0,
        1.0, 1.0, 1.0,      0.0, 1.0, 0.0,
        1.0, 1.0, -1.0,     0.0, 1.0, 0.0,
        // Bottom face
        -1.0, -1.0, -1.0,   0.0, -1.0, 0.0,
        1.0, -1.0, -1.0,    0.0, -1.0, 0.0,
        1.0, -1.0, 1.0,     0.0, -1.0, 0.0,
        -1.0, -1.0, 1.0,    0.0, -1.0, 0.0,
        // Right face
        1.0, -1.0, -1.0,    1.0, 0.0, 0.0,
        1.0, 1.0, -1.0,     1.0, 0.0, 0.0,
        1.0, 1.0, 1.0,      1.0, 0.0, 0.0,
        1.0, -1.0, 1.0,     1.0, 0.0, 0.0,
        // Left face
        -1.0, -1.0, -1.0,   -1.0, 0.0, 0.0,
        -1.0, -1.0, 1.0,    -1.0, 0.0, 0.0,
        -1.0, 1.0, 1.0,     -1.0, 0.0, 0.0,
        -1.0, 1.0, -1.0,    -1.0, 0.0, 0.0
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.vertexAttribPointer(
        positionLocation, // Assume location = 0?
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(positionLocation);
    
    const normalLocation = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.vertexAttribPointer(
        normalLocation,
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(normalLocation);
    
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
        
        const colorLocation = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.vertexAttribPointer(
            colorLocation, // Assume location = 2?
            3,
            gl.FLOAT,
            false,
            0,
            0,
        );
        gl.enableVertexAttribArray(colorLocation);
        
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

    const modelMatLocation = gl.getUniformLocation(shaderProgram, "uModelMatrix");
    const viewMatLocation = gl.getUniformLocation(shaderProgram, "uViewMatrix");
    const projMatLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    
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
        mat4.rotateY(modelMatrix, modelMatrix, rotationRadians / 180);
        mat4.rotateX(modelMatrix, modelMatrix, rotationRadians / 180);

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