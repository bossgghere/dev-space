
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const v = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.); }`;
const p = `precision highp float;`;
const s = `precision mediump sampler2D;`;

const shaders = {
  splat: [
    v,
    `${p} ${s}
    uniform sampler2D uTarget; uniform float aspectRatio,radius; uniform vec3 color; uniform vec2 point; varying vec2 vUv;
    void main(){ vec2 p=vUv-point; p.x*=aspectRatio; gl_FragColor=vec4(texture2D(uTarget,vUv).xyz+exp(-dot(p,p)/radius)*color,1.); }`,
  ],

  advection: [
    v,
    `${p} ${s}
    uniform sampler2D uVelocity,uSource; uniform vec2 texelSize; uniform float dt,dissipation; varying vec2 vUv;
    void main(){ gl_FragColor=vec4(dissipation*texture2D(uSource,vUv-dt*texture2D(uVelocity,vUv).xy*texelSize).rgb,1.); }`,
  ],

  divergence: [
    v,
    `${p} ${s}
    uniform sampler2D uVelocity; uniform vec2 texelSize; varying vec2 vUv;
    vec2 vel(vec2 uv){ vec2 e=vec2(1.); if(uv.x<0.){uv.x=0.;e.x=-1.;} if(uv.x>1.){uv.x=1.;e.x=-1.;} if(uv.y<0.){uv.y=0.;e.y=-1.;} if(uv.y>1.){uv.y=1.;e.y=-1.;} return e*texture2D(uVelocity,uv).xy; }
    void main(){ vec2 L=vUv-vec2(texelSize.x,0.),R=vUv+vec2(texelSize.x,0.),T=vUv+vec2(0.,texelSize.y),B=vUv-vec2(0.,texelSize.y); gl_FragColor=vec4(.5*(vel(R).x-vel(L).x+vel(T).y-vel(B).y),0.,0.,1.); }`,
  ],

  curl: [
    v,
    `${p} ${s}
    uniform sampler2D uVelocity; uniform vec2 texelSize; varying vec2 vUv;
    void main(){ vec2 L=vUv-vec2(texelSize.x,0.),R=vUv+vec2(texelSize.x,0.),T=vUv+vec2(0.,texelSize.y),B=vUv-vec2(0.,texelSize.y); gl_FragColor=vec4(texture2D(uVelocity,R).y-texture2D(uVelocity,L).y-texture2D(uVelocity,T).x+texture2D(uVelocity,B).x,0.,0.,1.); }`,
  ],

  vorticity: [
    v,
    `${p} ${s}
    uniform sampler2D uVelocity,uCurl; uniform vec2 texelSize; uniform float curlStrength,dt; varying vec2 vUv;
    void main(){ vec2 L=vUv-vec2(texelSize.x,0.),R=vUv+vec2(texelSize.x,0.),T=vUv+vec2(0.,texelSize.y),B=vUv-vec2(0.,texelSize.y); vec2 f=normalize(vec2(abs(texture2D(uCurl,T).x)-abs(texture2D(uCurl,B).x),abs(texture2D(uCurl,R).x)-abs(texture2D(uCurl,L).x))+.0001)*curlStrength*texture2D(uCurl,vUv).x; gl_FragColor=vec4(texture2D(uVelocity,vUv).xy+f*dt,0.,1.); }`,
  ],

  pressure: [
    v,
    `${p} ${s}
    uniform sampler2D uPressure,uDivergence; uniform vec2 texelSize; varying vec2 vUv;
    void main(){ 
      vec2 L = clamp(vUv - vec2(texelSize.x, 0.0), 0.0, 1.0);
      vec2 R = clamp(vUv + vec2(texelSize.x, 0.0), 0.0, 1.0);
      vec2 T = clamp(vUv + vec2(0.0, texelSize.y), 0.0, 1.0);
      vec2 B = clamp(vUv - vec2(0.0, texelSize.y), 0.0, 1.0);
      float pL = texture2D(uPressure, L).x;
      float pR = texture2D(uPressure, R).x;
      float pT = texture2D(uPressure, T).x;
      float pB = texture2D(uPressure, B).x;
      float div = texture2D(uDivergence, vUv).x;
      gl_FragColor = vec4((pL + pR + pT + pB - div) * 0.25, 0.0, 0.0, 1.0);
    }`,
  ],

  gradientSubtract: [
    v,
    `${p} ${s}
    uniform sampler2D uPressure,uVelocity; uniform vec2 texelSize; varying vec2 vUv;
    void main(){ 
      float pL=texture2D(uPressure,clamp(vUv-vec2(texelSize.x,0.),0.,1.)).x;
      float pR=texture2D(uPressure,clamp(vUv+vec2(texelSize.x,0.),0.,1.)).x;
      float pT=texture2D(uPressure,clamp(vUv+vec2(0.,texelSize.y),0.,1.)).x;
      float pB=texture2D(uPressure,clamp(vUv-vec2(0.,texelSize.y),0.,1.)).x;
      gl_FragColor=vec4(texture2D(uVelocity,vUv).xy-vec2(pR-pL,pT-pB),0.,1.); }`,
  ],

  clear: [
    v,
    `${p} ${s}
    uniform sampler2D uTexture; uniform float value; varying vec2 vUv;
    void main(){ gl_FragColor=value*texture2D(uTexture,vUv); }`,
  ],

  display: [
    v,
    `${p}
    uniform sampler2D uTexture; uniform float threshold,edgeSoftness; uniform vec3 inkColor; varying vec2 vUv;
    void main(){ float d=clamp(length(texture2D(uTexture,vUv).rgb),0.,1.); float a=edgeSoftness>0.?smoothstep(threshold-edgeSoftness*.5,threshold+edgeSoftness*.5,d):step(threshold,d); gl_FragColor=vec4(inkColor,a); }`,
  ],
};

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config = {
      simResolution: 128,
      dyeResolution: 512,
      curl: 30,
      pressureIterations: 20,
      velocityDissipation: 0.98,
      dyeDissipation: 0.98,
      splatRadius: 0.2,
      forceStrength: 10,
      pressureDecay: 0.8,
      threshold: 0.6,
      edgeSoftness: 0.2,
      inkColor: new THREE.Color(0, 0, 0), // Default black, will change based on theme
    };

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const dpr = renderer.getPixelRatio();
    let width = window.innerWidth * dpr;
    let height = window.innerHeight * dpr;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    scene.add(quad);

    const aspect = width / height;
    const options = { type: THREE.HalfFloatType, depthBuffer: false };

    const single = (w: number, h: number) => new THREE.WebGLRenderTarget(w, h, options);
    const double = (w: number, h: number) => {
      let read = single(w, h);
      let write = single(w, h);
      return {
        get read() { return read; },
        get write() { return write; },
        swap() {
          const tmp = read;
          read = write;
          write = tmp;
        },
      };
    };

    const simSize = { w: config.simResolution, h: Math.round(config.simResolution / aspect) };
    const dyeSize = { w: config.dyeResolution, h: Math.round(config.dyeResolution / aspect) };

    const velocity = double(simSize.w, simSize.h);
    const dye = double(dyeSize.w, dyeSize.h);
    const divergence = single(simSize.w, simSize.h);
    const curl = single(simSize.w, simSize.h);
    const pressure = double(simSize.w, simSize.h);

    const make = (shader: string[], uniforms: any) =>
      new THREE.ShaderMaterial({
        vertexShader: shader[0],
        fragmentShader: shader[1],
        uniforms,
      });

    const tex = () => ({ value: null as THREE.Texture | null });
    const num = (v = 0) => ({ value: v });
    const vec2 = () => ({ value: new THREE.Vector2() });

    const materials = {
      splat: make(shaders.splat, {
        uTarget: tex(),
        aspectRatio: num(),
        radius: num(),
        color: { value: new THREE.Vector3() },
        point: { value: new THREE.Vector2() },
      }),
      advection: make(shaders.advection, {
        uVelocity: tex(),
        uSource: tex(),
        texelSize: vec2(),
        dt: num(),
        dissipation: num(),
      }),
      divergence: make(shaders.divergence, {
        uVelocity: tex(),
        texelSize: vec2(),
      }),
      curl: make(shaders.curl, { uVelocity: tex(), texelSize: vec2() }),
      vorticity: make(shaders.vorticity, {
        uVelocity: tex(),
        uCurl: tex(),
        texelSize: vec2(),
        curlStrength: num(),
        dt: num(),
      }),
      pressure: make(shaders.pressure, {
        uPressure: tex(),
        uDivergence: tex(),
        texelSize: vec2(),
      }),
      gradientSubtract: make(shaders.gradientSubtract, {
        uPressure: tex(),
        uVelocity: tex(),
        texelSize: vec2(),
      }),
      clear: make(shaders.clear, { uTexture: tex(), value: num() }),
      display: make(shaders.display, {
        uTexture: tex(),
        threshold: num(),
        edgeSoftness: num(),
        inkColor: { value: new THREE.Color() },
      }),
    };

    const mouse = { x: 0, y: 0, velocityX: 0, velocityY: 0, moved: false };

    const onMove = (x: number, y: number) => {
      mouse.velocityX = (x * dpr - mouse.x) * config.forceStrength;
      mouse.velocityY = (y * dpr - mouse.y) * config.forceStrength;
      mouse.x = x * dpr;
      mouse.y = y * dpr;
      mouse.moved = true;
    };

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      width = window.innerWidth * dpr;
      height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    const pass = (material: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
      quad.material = material;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
    };

    const setUniforms = (material: THREE.ShaderMaterial, values: any) => {
      Object.entries(values).forEach(([key, val]) => {
        material.uniforms[key].value = val;
      });
    };

    const splat = (x: number, y: number, vx: number, vy: number) => {
      setUniforms(materials.splat, {
        aspectRatio: width / height,
        point: new THREE.Vector2(x / width, 1 - y / height),
        radius: config.splatRadius / 100,
      });

      setUniforms(materials.splat, {
        uTarget: velocity.read.texture,
        color: new THREE.Vector3(vx, -vy, 0),
      });
      pass(materials.splat, velocity.write);
      velocity.swap();

      setUniforms(materials.splat, {
        uTarget: dye.read.texture,
        color: new THREE.Vector3(1, 1, 1), // Splat white color for difference mode
      });
      pass(materials.splat, dye.write);
      dye.swap();
    };

    let lastTime = Date.now();
    let frameId: number;

    const loop = () => {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016);
      lastTime = now;

      if (mouse.moved) {
        splat(mouse.x, mouse.y, mouse.velocityX, mouse.velocityY);
        mouse.moved = false;
      }

      const simTexel = new THREE.Vector2(1 / simSize.w, 1 / simSize.h);

      // Simulation steps
      setUniforms(materials.curl, { uVelocity: velocity.read.texture, texelSize: simTexel });
      pass(materials.curl, curl);

      setUniforms(materials.vorticity, {
        uVelocity: velocity.read.texture,
        uCurl: curl.texture,
        texelSize: simTexel,
        curlStrength: config.curl,
        dt,
      });
      pass(materials.vorticity, velocity.write);
      velocity.swap();

      setUniforms(materials.divergence, { uVelocity: velocity.read.texture, texelSize: simTexel });
      pass(materials.divergence, divergence);

      setUniforms(materials.clear, { uTexture: pressure.read.texture, value: config.pressureDecay });
      pass(materials.clear, pressure.write);
      pressure.swap();

      setUniforms(materials.pressure, { uDivergence: divergence.texture, texelSize: simTexel });
      for (let i = 0; i < config.pressureIterations; i++) {
        materials.pressure.uniforms.uPressure.value = pressure.read.texture;
        pass(materials.pressure, pressure.write);
        pressure.swap();
      }

      setUniforms(materials.gradientSubtract, {
        uPressure: pressure.read.texture,
        uVelocity: velocity.read.texture,
        texelSize: simTexel,
      });
      pass(materials.gradientSubtract, velocity.write);
      velocity.swap();

      setUniforms(materials.advection, {
        uVelocity: velocity.read.texture,
        uSource: velocity.read.texture,
        texelSize: simTexel,
        dt,
        dissipation: config.velocityDissipation,
      });
      pass(materials.advection, velocity.write);
      velocity.swap();

      setUniforms(materials.advection, {
        uSource: dye.read.texture,
        texelSize: new THREE.Vector2(1 / dyeSize.w, 1 / dyeSize.h),
        dissipation: config.dyeDissipation,
      });
      pass(materials.advection, dye.write);
      dye.swap();

      // Render to screen
      const isDark = document.documentElement.classList.contains('dark');
      setUniforms(materials.display, {
        uTexture: dye.read.texture,
        threshold: config.threshold,
        edgeSoftness: config.edgeSoftness,
        inkColor: isDark ? new THREE.Color(1, 1, 1) : new THREE.Color(0.2, 0.2, 0.2), // Light gray in light mode for visibility
      });
      pass(materials.display, null);

      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] transition-opacity duration-1000"
      style={{ mixBlendMode: 'difference' }}
    />
  );
};

export default FluidBackground;
