import React, { useEffect, useRef } from 'react';

// 3D Point in molecular structure
interface Atom3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  glowColor: string;
  charge: 'positive' | 'negative' | 'neutral';
}

interface Bond3D {
  from: number;
  to: number;
  doubleBond?: boolean;
}

interface Molecule3D {
  cx: number;
  cy: number;
  cz: number;
  vx: number;
  vy: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  scale: number;
  atoms: Atom3D[];
  bonds: Bond3D[];
}

interface AmbientParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  baseAlpha: number;
}

interface RippleEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const MolecularCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    prevX: -1000,
    prevY: -1000,
    speed: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const ripples: RippleEffect[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = w;
      height = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - mouseRef.current.prevX;
      const dy = currentY - mouseRef.current.prevY;
      const distMoved = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.targetX = currentX;
      mouseRef.current.targetY = currentY;
      mouseRef.current.speed = distMoved;
      mouseRef.current.active = true;

      // Trigger ripple if cursor moves rapidly
      if (distMoved > 18 && Math.random() < 0.4) {
        ripples.push({
          x: currentX,
          y: currentY,
          radius: 5,
          maxRadius: Math.min(180, distMoved * 4.5),
          alpha: 0.6,
          color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(123, 44, 191, ',
        });
      }

      mouseRef.current.prevX = currentX;
      mouseRef.current.prevY = currentY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Color Palette: Electric Blue, Cyan, Subtle Violet, Crisp White
    const cyanGlow = 'rgba(0, 242, 254, ';
    const electricBlueGlow = 'rgba(0, 180, 255, ';
    const violetGlow = 'rgba(140, 60, 240, ';
    const whiteGlow = 'rgba(255, 255, 255, ';

    // Generate 3D Benzene / Complex Molecule Nodes
    const createBenzeneMolecule = (
      cx: number,
      cy: number,
      cz: number,
      scale: number,
      vx: number,
      vy: number,
      vRotX: number,
      vRotY: number,
      vRotZ: number
    ): Molecule3D => {
      const atoms: Atom3D[] = [];
      const bonds: Bond3D[] = [];
      const numVertices = 6;
      const r = scale;

      // 6 Carbon Ring Nodes
      for (let i = 0; i < numVertices; i++) {
        const angle = (i * Math.PI) / 3;
        const bx = Math.cos(angle) * r;
        const by = Math.sin(angle) * r;
        const bz = (Math.sin(angle * 2) * r) * 0.2;
        
        atoms.push({
          x: bx,
          y: by,
          z: bz,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          radius: 4.5,
          color: '#00f2fe',
          glowColor: cyanGlow,
          charge: i % 2 === 0 ? 'positive' : 'negative',
        });
      }

      // Outer Hydrogen / Functional Groups
      for (let i = 0; i < numVertices; i++) {
        const angle = (i * Math.PI) / 3;
        const hr = r * 1.65;
        const bx = Math.cos(angle) * hr;
        const by = Math.sin(angle) * hr;
        const bz = (Math.cos(angle * 3) * r) * 0.25;

        const isSpecialGroup = i === 1 || i === 4;
        atoms.push({
          x: bx,
          y: by,
          z: bz,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          radius: isSpecialGroup ? 5.5 : 3,
          color: isSpecialGroup ? '#a855f7' : '#ffffff',
          glowColor: isSpecialGroup ? violetGlow : whiteGlow,
          charge: 'neutral',
        });
      }

      // Ring Bonds
      for (let i = 0; i < numVertices; i++) {
        const next = (i + 1) % numVertices;
        bonds.push({ from: i, to: next, doubleBond: i % 2 === 0 });
      }

      // Outer Bonds to Hydrogens/Groups
      for (let i = 0; i < numVertices; i++) {
        bonds.push({ from: i, to: i + numVertices });
      }

      return {
        cx,
        cy,
        cz,
        vx,
        vy,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX,
        vRotY,
        vRotZ,
        scale,
        atoms,
        bonds,
      };
    };

    // Helper: Create Chain Molecule Structure
    const createChainMolecule = (
      cx: number,
      cy: number,
      cz: number,
      scale: number,
      vx: number,
      vy: number,
      vRotX: number,
      vRotY: number,
      vRotZ: number
    ): Molecule3D => {
      const atoms: Atom3D[] = [];
      const bonds: Bond3D[] = [];
      const length = 5;

      for (let i = 0; i < length; i++) {
        const bx = (i - length / 2) * (scale * 0.9);
        const by = (i % 2 === 0 ? 1 : -1) * (scale * 0.45);
        const bz = Math.sin(i * 1.2) * (scale * 0.3);

        const isPurple = i === 2;
        atoms.push({
          x: bx,
          y: by,
          z: bz,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          radius: isPurple ? 6 : 4,
          color: isPurple ? '#c084fc' : '#38bdf8',
          glowColor: isPurple ? violetGlow : electricBlueGlow,
          charge: i % 2 === 0 ? 'positive' : 'negative',
        });

        if (i > 0) {
          bonds.push({ from: i - 1, to: i, doubleBond: i === 2 });
        }
      }

      // Side functional groups
      atoms.push({
        x: atoms[1].baseX,
        y: atoms[1].baseY - scale * 0.8,
        z: atoms[1].baseZ + scale * 0.3,
        baseX: atoms[1].baseX,
        baseY: atoms[1].baseY - scale * 0.8,
        baseZ: atoms[1].baseZ + scale * 0.3,
        radius: 3.5,
        color: '#ffffff',
        glowColor: whiteGlow,
        charge: 'neutral',
      });
      bonds.push({ from: 1, to: length });

      return {
        cx,
        cy,
        cz,
        vx,
        vy,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX,
        vRotY,
        vRotZ,
        scale,
        atoms,
        bonds,
      };
    };

    // Initialize Molecules - concentrated on the RIGHT and CENTER-RIGHT (x: 0.50 ~ 0.92)
    const molecules: Molecule3D[] = [
      createBenzeneMolecule(width * 0.78, height * 0.32, 1.2, 52, -0.12, 0.08, 0.003, 0.004, 0.002),
      createBenzeneMolecule(width * 0.88, height * 0.68, 0.9, 42, 0.09, -0.10, -0.003, 0.005, -0.003),
      createChainMolecule(width * 0.62, height * 0.72, 1.0, 48, -0.08, -0.07, 0.004, -0.003, 0.004),
      createBenzeneMolecule(width * 0.58, height * 0.22, 0.7, 36, 0.10, 0.09, -0.002, 0.003, 0.005),
      createChainMolecule(width * 0.92, height * 0.20, 0.8, 38, -0.07, 0.06, 0.002, 0.004, -0.002),
      createBenzeneMolecule(width * 0.70, height * 0.85, 0.6, 32, -0.06, -0.05, 0.003, -0.002, 0.003),
    ];

    // Initialize Hundreds of Floating 3D Micro Particles (200 Particles)
    const totalParticles = Math.min(Math.floor((width * height) / 6000), 220);
    const ambientParticles: AmbientParticle[] = [];

    const pGlows = [cyanGlow, electricBlueGlow, violetGlow, whiteGlow];
    const pColors = ['#00f2fe', '#38bdf8', '#a855f7', '#ffffff'];

    for (let i = 0; i < totalParticles; i++) {
      // Biased towards right side: 70% of particles on x > 0.45
      let x = Math.random() * width;
      if (Math.random() < 0.72) {
        x = width * 0.40 + Math.random() * (width * 0.60);
      }
      const y = Math.random() * height;
      const z = Math.random() * 1.4 + 0.3; // depth scale

      const colorIdx = Math.floor(Math.random() * pColors.length);

      ambientParticles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.35 * z,
        vy: (Math.random() - 0.5) * 0.35 * z,
        vz: (Math.random() - 0.5) * 0.005,
        radius: (Math.random() * 2.2 + 0.8) * z,
        color: pColors[colorIdx],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        baseAlpha: (Math.random() * 0.5 + 0.25) * z,
      });
    }

    // 3D Matrix Rotation Helper
    const rotate3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number
    ): { x: number; y: number; z: number } => {
      // Rotate around X
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      let x1 = x;

      // Rotate around Y
      let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      let y2 = y1;

      // Rotate around Z
      let x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      let z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    // Main Render Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse position smoothing with damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Space Parallax Background Gradient & Glow
      const bgGrad = ctx.createRadialGradient(
        width * 0.75,
        height * 0.4,
        50,
        width * 0.75,
        height * 0.4,
        width * 0.65
      );
      bgGrad.addColorStop(0, 'rgba(10, 25, 55, 0.4)');
      bgGrad.addColorStop(0.5, 'rgba(6, 15, 35, 0.25)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Cursor Soft Glow Spotlight
      if (mouse.active && mouse.x > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        cursorGlow.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
        cursorGlow.addColorStop(0.4, 'rgba(123, 44, 191, 0.08)');
        cursorGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 4;
        rip.alpha -= 0.015;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${rip.color}${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 4. Render Ambient 3D Floating Particles
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.pulsePhase += p.pulseSpeed;

          if (p.z < 0.2) p.vz = Math.abs(p.vz);
          if (p.z > 1.6) p.vz = -Math.abs(p.vz);

          // Wrap screen bounds
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Parallax mouse displacement
        const parallaxX = mouse.active ? (mouse.x - width / 2) * 0.025 * p.z : 0;
        const parallaxY = mouse.active ? (mouse.y - height / 2) * 0.025 * p.z : 0;

        let renderX = p.x + parallaxX;
        let renderY = p.y + parallaxY;

        // Mouse magnetic / repulsion force
        if (mouse.active) {
          const dx = renderX - mouse.x;
          const dy = renderY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 140;

          if (dist < forceRadius && dist > 1) {
            const force = (1 - dist / forceRadius) * 22;
            renderX += (dx / dist) * force;
            renderY += (dy / dist) * force;
          }
        }

        const alpha = Math.max(
          0.05,
          (p.baseAlpha + Math.sin(p.pulsePhase) * 0.2) * (1 - renderX / (width * 3))
        );
        const radius = Math.max(0.6, p.radius * (0.8 + Math.sin(p.pulsePhase) * 0.25));

        // Particle Core
        ctx.beginPath();
        ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Bloom Glow for larger foreground particles
        if (p.z > 0.8) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha * 0.25;
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;
      }

      // 5. Draw Interconnected Network Lines between Close Ambient Particles
      ctx.lineWidth = 0.75;
      for (let i = 0; i < ambientParticles.length; i++) {
        // Only connect a subset on the right side for high performance and sleek look
        if (ambientParticles[i].x < width * 0.35) continue;

        for (let j = i + 1; j < ambientParticles.length; j++) {
          const p1 = ambientParticles[i];
          const p2 = ambientParticles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 85 * Math.min(p1.z, p2.z);

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            let lineAlpha = (1 - dist / maxDist) * 0.25 * Math.min(p1.z, p2.z);

            // Brighten if near mouse cursor
            if (mouse.active) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
              if (mouseDist < 120) {
                lineAlpha = Math.min(0.8, lineAlpha + (1 - mouseDist / 120) * 0.5);
              }
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.z > 0.9 ? '#00f2fe' : '#38bdf8';
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // 6. Render 3D Molecular Structures
      for (let m = 0; m < molecules.length; m++) {
        const mol = molecules[m];

        if (!prefersReducedMotion) {
          mol.cx += mol.vx * mol.cz;
          mol.cy += mol.vy * mol.cz;
          mol.rotX += mol.vRotX;
          mol.rotY += mol.vRotY;
          mol.rotZ += mol.vRotZ;

          // Wrap bounds on right half of screen
          if (mol.cx < width * 0.38) mol.vx = Math.abs(mol.vx);
          if (mol.cx > width * 0.96) mol.vx = -Math.abs(mol.vx);
          if (mol.cy < height * 0.1) mol.vy = Math.abs(mol.vy);
          if (mol.cy > height * 0.9) mol.vy = -Math.abs(mol.vy);
        }

        // Parallax mouse translation
        const parallaxX = mouse.active ? (mouse.x - width / 2) * 0.035 * mol.cz : 0;
        const parallaxY = mouse.active ? (mouse.y - height / 2) * 0.035 * mol.cz : 0;

        const centerRenderX = mol.cx + parallaxX;
        const centerRenderY = mol.cy + parallaxY;

        // Transform all atoms in 3D
        const transformedAtoms: {
          x: number;
          y: number;
          z: number;
          screenX: number;
          screenY: number;
          atom: Atom3D;
        }[] = [];

        for (let i = 0; i < mol.atoms.length; i++) {
          const atom = mol.atoms[i];
          const rotated = rotate3D(
            atom.baseX,
            atom.baseY,
            atom.baseZ,
            mol.rotX,
            mol.rotY,
            mol.rotZ
          );

          const screenX = centerRenderX + rotated.x;
          const screenY = centerRenderY + rotated.y;

          transformedAtoms.push({
            x: rotated.x,
            y: rotated.y,
            z: rotated.z,
            screenX,
            screenY,
            atom,
          });
        }

        // Sort atoms by Z for proper 3D depth rendering (back to front)
        transformedAtoms.sort((a, b) => a.z - b.z);

        // Distance from mouse to molecule center
        const mouseDistToMol = mouse.active
          ? Math.hypot(centerRenderX - mouse.x, centerRenderY - mouse.y)
          : 999;
        const isHovered = mouseDistToMol < 180;
        const hoverIntensity = isHovered ? (1 - mouseDistToMol / 180) : 0;

        // Render Bonds
        for (let b = 0; b < mol.bonds.length; b++) {
          const bond = mol.bonds[b];
          const a1 = transformedAtoms.find((item) => item.atom === mol.atoms[bond.from]);
          const a2 = transformedAtoms.find((item) => item.atom === mol.atoms[bond.to]);

          if (!a1 || !a2) continue;

          const bondZ = (a1.z + a2.z) / 2;
          const depthAlpha = Math.max(0.2, (bondZ + mol.scale) / (mol.scale * 2));
          let bondAlpha = 0.45 * depthAlpha * mol.cz;

          if (isHovered) {
            bondAlpha = Math.min(0.95, bondAlpha + hoverIntensity * 0.45);
          }

          ctx.beginPath();
          ctx.moveTo(a1.screenX, a1.screenY);
          ctx.lineTo(a2.screenX, a2.screenY);

          const bondGrad = ctx.createLinearGradient(
            a1.screenX,
            a1.screenY,
            a2.screenX,
            a2.screenY
          );
          bondGrad.addColorStop(0, isHovered ? '#00f2fe' : a1.atom.color);
          bondGrad.addColorStop(1, isHovered ? '#a855f7' : a2.atom.color);

          ctx.strokeStyle = bondGrad;
          ctx.lineWidth = (bond.doubleBond ? 2.4 : 1.4) * mol.cz;
          ctx.globalAlpha = bondAlpha;
          ctx.stroke();

          // Render Double Bond Parallel Offset
          if (bond.doubleBond) {
            const dx = a2.screenX - a1.screenX;
            const dy = a2.screenY - a1.screenY;
            const len = Math.hypot(dx, dy);
            if (len > 0) {
              const nx = -dy / len;
              const ny = dx / len;
              const offset = 3.5 * mol.cz;

              ctx.beginPath();
              ctx.moveTo(a1.screenX + nx * offset, a1.screenY + ny * offset);
              ctx.lineTo(a2.screenX + nx * offset, a2.screenY + ny * offset);
              ctx.lineWidth = 1.0 * mol.cz;
              ctx.stroke();
            }
          }

          ctx.globalAlpha = 1.0;
        }

        // Render Spherical Glowing Nodes / Atoms
        for (let i = 0; i < transformedAtoms.length; i++) {
          const item = transformedAtoms[i];
          const atom = item.atom;

          const depthScale = Math.max(0.4, (item.z + mol.scale * 1.5) / (mol.scale * 2.5));
          const nodeRadius = atom.radius * depthScale * mol.cz * (1 + hoverIntensity * 0.25);
          const nodeAlpha = Math.min(1.0, (0.5 + depthScale * 0.5) * mol.cz);

          // Outer Spherical Atmospheric Glow Ring
          const glowGrad = ctx.createRadialGradient(
            item.screenX,
            item.screenY,
            0,
            item.screenX,
            item.screenY,
            nodeRadius * 3.5
          );
          glowGrad.addColorStop(0, `${atom.glowColor}${nodeAlpha * 0.8})`);
          glowGrad.addColorStop(0.5, `${atom.glowColor}${nodeAlpha * 0.2})`);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(item.screenX, item.screenY, nodeRadius * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Solid Atom Core
          ctx.beginPath();
          ctx.arc(item.screenX, item.screenY, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? '#ffffff' : atom.color;
          ctx.globalAlpha = nodeAlpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Inner Specular Light Reflection
          ctx.beginPath();
          ctx.arc(
            item.screenX - nodeRadius * 0.3,
            item.screenY - nodeRadius * 0.3,
            nodeRadius * 0.35,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto opacity-95 ${className}`}
    />
  );
};

