import * as THREE from 'three';
import gsap from 'gsap';

export default function switchEffect(opts) {

  var vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

  var fragment = `
varying vec2 vUv;
uniform float dispFactor;
uniform float dpr;
uniform sampler2D disp;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float angle1;
uniform float angle2;
uniform float intensity1;
uniform float intensity2;
uniform vec4 res;
uniform vec2 parent;
mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}
void main() {
  vec4 disp = texture2D(disp, vUv);
  vec2 dispVec = vec2(disp.r, disp.g);
  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;
  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;
  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
  vec4 _texture1 = texture2D(texture1, distortedPosition1);
  vec4 _texture2 = texture2D(texture2, distortedPosition2);
  gl_FragColor = mix(_texture1, _texture2, dispFactor);
}
`;

  // please respect authorship and do not remove
  console.log('%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ', 'color: #bada55; font-size: 0.8rem');


  function firstDefined() {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] !== undefined) return arguments[i];
    }
  }

  var parent = opts.parent;
  var dispImage = opts.displacementImage;

  var image1 = opts.currentImg;
  var image2 = opts.nextImg;

  var imagesRatio = firstDefined(opts.imagesRatio, 1.0);
  var intensity1 = firstDefined(opts.intensity1, opts.intensity, 1);
  var intensity2 = firstDefined(opts.intensity2, opts.intensity, 1);
  var commonAngle = firstDefined(opts.angle, Math.PI / 4);
  var angle1 = firstDefined(opts.angle1, commonAngle);
  var angle2 = firstDefined(opts.angle2, -commonAngle * 3);
  var speedIn = firstDefined(opts.speedIn, opts.speed, 1.6);
  //var speedOut = firstDefined(opts.speedOut, opts.speed, 1.2);
  //var userHover = firstDefined(opts.hover, true);
  var easing = firstDefined(opts.easing, gsap.easeOut);

  if (!parent) {
    console.warn('Parent missing');
    return;
  }

  if (!(image1 && image2 && dispImage)) {
    console.warn('One or more images are missing');
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(
    parent.offsetWidth / -2,
    parent.offsetWidth / 2,
    parent.offsetHeight / 2,
    parent.offsetHeight / -2,
    1,
    1000
  );

  camera.position.z = 1;

  var renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    canvas: parent.firstChild
  });

  renderer.setPixelRatio(2.0);
  renderer.setClearColor(0xffffff, 0.0);
  renderer.setSize(parent.offsetWidth, parent.offsetHeight);


  var render = function () {
    // This will be called by the TextureLoader as well as gsap.
    renderer.render(scene, camera);
  };

  var loader = new THREE.TextureLoader();
  loader.crossOrigin = '';

  var disp = loader.load(dispImage, render);
  disp.magFilter = disp.minFilter = THREE.LinearFilter;

  var texture1 = loader.load(image1, render);
  var texture2 = loader.load(image2, render);

  texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
  texture1.minFilter = texture2.minFilter = THREE.LinearFilter;


  let a1, a2;
  var imageAspect = imagesRatio;
  if (parent.offsetHeight / parent.offsetWidth < imageAspect) {
    a1 = 1;
    a2 = parent.offsetHeight / parent.offsetWidth / imageAspect;
  } else {
    a1 = (parent.offsetWidth / parent.offsetHeight) * imageAspect;
    a2 = 1;
  }

  var mat = new THREE.ShaderMaterial({
    uniforms: {
      intensity1: {
        type: 'f',
        value: intensity1
      },
      intensity2: {
        type: 'f',
        value: intensity2
      },
      dispFactor: {
        type: 'f',
        value: 0.0
      },
      angle1: {
        type: 'f',
        value: angle1
      },
      angle2: {
        type: 'f',
        value: angle2
      },
      texture1: {
        type: 't',
        value: texture1
      },
      texture2: {
        type: 't',
        value: texture2
      },
      disp: {
        type: 't',
        value: disp
      },
      res: {
        type: 'vec4',
        value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2)
      },
      dpr: {
        type: 'f',
        value: window.devicePixelRatio
      }
    },

    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    opacity: 1.0,
  });

  var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
  var object = new THREE.Mesh(geometry, mat);
  scene.add(object);

  function transitionIn() {
    gsap.to(mat.uniforms.dispFactor, speedIn, {
      value: 1,
      ease: easing,
      onUpdate: render,
      onComplete: render,
    });
  }


  transitionIn()


  window.addEventListener('resize', function (e) {
    if (parent.offsetHeight / parent.offsetWidth < imageAspect) {
      a1 = 1;
      a2 = parent.offsetHeight / parent.offsetWidth / imageAspect;
    } else {
      a1 = (parent.offsetWidth / parent.offsetHeight) * imageAspect;
      a2 = 1;
    }
    object.material.uniforms.res.value = new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);

    render()
  });
};