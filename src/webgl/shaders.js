// ES GLSL does not support layout specification
// in -> attribute
// out -> varying -> in -> varying

const vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec3 aVertexColor;

    varying vec3 vVertexColor;
    varying vec3 vNormalVector;
    // varying vec3 vFragmentPositionWS;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;


    void main()
    {
        vVertexColor = aVertexColor;
        // vFragmentPositionWS = vec3(uModelMatrix * aVertexPosition);
        
        // Inverse op not compatible. Using uniform transforms so I'll ommit it
        vNormalVector = mat3(uModelMatrix) * aVertexNormal;
        
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
    }
`;

const fragmentShaderSource = `
    varying highp vec3 vVertexColor;
    varying highp vec3 vNormalVector;
    // varying vec3 vFragmentPositionWS;

    void main()
    {
        highp vec3 normal = normalize(vNormalVector);

        // highp vec3 ambientColor = vec3(0.078, 0.969, 0.682);
        highp vec3 ambientColor = vec3(0.5, 0.5, 0.5);
        highp vec3 directionalColor = vec3(1, 1, 1);
        highp vec3 lightDirection = normalize(-vec3(-0.5, 0.0, 0.8));

        highp float directionalFactor = max(dot(normal, lightDirection), 0.0);
        
        highp vec3 ambientResult = ambientColor * 0.5 * vVertexColor;
        highp vec3 directionalResult = directionalFactor * directionalColor * vVertexColor;
        highp vec3 diffuse = ambientResult + directionalResult;

        gl_FragColor = vec4(diffuse, 1.0);
        // gl_FragColor = vec4(directionalResult, 1.0);
    }
`;

export { vertexShaderSource, fragmentShaderSource };