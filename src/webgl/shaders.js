// ES GLSL does not support layout specification
// in -> attribute
// out -> varying -> in -> varying

const vertexShaderSource = `
    attribute vec4 vertexPosition;
    attribute vec3 vertexColor;

    varying vec3 fragVertexColor;

    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    void main()
    {
        fragVertexColor = vertexColor;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;
    }
`;

const fragmentShaderSource = `
    precision mediump float;    
    varying vec3 fragVertexColor;

    void main()
    {
        gl_FragColor = vec4(fragVertexColor, 1.0);
        //gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
`;

export { vertexShaderSource, fragmentShaderSource };