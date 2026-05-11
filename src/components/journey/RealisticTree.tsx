import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  className?: string;
};

const RealisticTree: React.FC<Props> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    let mounted = true;
    let reducedMotion = false;
    let disposeScene: (() => void) | null = null;

    try {
      reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch { reducedMotion = false; }

    (async () => {
      if (!mounted || !containerRef.current) return;

      const container = containerRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
      camera.position.set(0, 9, 24);
      camera.lookAt(0, 5.5, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Hemisphere: warm sky above, dark soil below
      const hemiLight = new THREE.HemisphereLight(0xb8e8c8, 0x2a1a06, 0.72);
      scene.add(hemiLight);

      // Warm golden sunlight from upper-right
      const keyLight = new THREE.DirectionalLight(0xffe8a0, 2.6);
      keyLight.position.set(10, 16, 10);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 70;
      keyLight.shadow.camera.left = -14;
      keyLight.shadow.camera.right = 14;
      keyLight.shadow.camera.top = 20;
      keyLight.shadow.camera.bottom = -6;
      keyLight.shadow.bias = -0.001;
      scene.add(keyLight);

      // Cool sky-blue fill from the left
      const fillLight = new THREE.DirectionalLight(0x88b8e0, 0.58);
      fillLight.position.set(-12, 7, 5);
      scene.add(fillLight);

      // Warm back-rim for depth separation
      const backLight = new THREE.DirectionalLight(0xffcc88, 0.40);
      backLight.position.set(0, 12, -18);
      scene.add(backLight);

      // Green canopy bounce light
      const bounceLight = new THREE.PointLight(0x44cc66, 0.60, 20);
      bounceLight.position.set(0, 7.5, 0);
      scene.add(bounceLight);

      const root = new THREE.Group();
      scene.add(root);

      // ── Materials ────────────────────────────────────────────────────────────
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.93, metalness: 0.03 });
      const branchMat = new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 0.96, metalness: 0 });
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x1b3209, roughness: 0.99, metalness: 0 });
      const leafMats = [
        new THREE.MeshStandardMaterial({ color: 0x4caf6a, roughness: 0.82, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x2e7d4f, roughness: 0.92, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x68c86e, roughness: 0.78, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x3a9455, roughness: 0.87, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x8bc34a, roughness: 0.76, metalness: 0 }),
      ];

      const up = new THREE.Vector3(0, 1, 0);

      type BranchNode = {
        start: THREE.Vector3;
        direction: THREE.Vector3;
        length: number;
        radius: number;
        depth: number;
        revealAt: number;
      };

      const branches: Array<{ group: THREE.Group; revealAt: number }> = [];
      const leafClusters: Array<{ group: THREE.Group; revealAt: number }> = [];

      // Creates a tapered cylinder oriented along `dir` starting at `start`
      const createSegment = (
        start: THREE.Vector3,
        dir: THREE.Vector3,
        length: number,
        radius: number,
        revealAt: number,
      ) => {
        const grp = new THREE.Group();
        grp.position.copy(start);
        const d = dir.clone().normalize();
        const axis = new THREE.Vector3().crossVectors(up, d);
        const angle = Math.acos(THREE.MathUtils.clamp(up.dot(d), -1, 1));
        grp.quaternion.setFromAxisAngle(axis.lengthSq() > 0 ? axis.normalize() : new THREE.Vector3(1, 0, 0), angle);

        const mat = radius > 0.25 ? trunkMat : branchMat;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.52, radius, length, 9, 1), mat);
        mesh.position.y = length / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        grp.add(mesh);
        root.add(grp);
        branches.push({ group: grp, revealAt });

        const endPoint = new THREE.Vector3(0, length, 0).applyQuaternion(grp.quaternion).add(start);
        return { grp, endPoint };
      };

      // Leaf cluster: spheres distributed in a circular pattern
      const addLeafCluster = (center: THREE.Vector3, radius: number, revealAt: number, count: number) => {
        const cluster = new THREE.Group();
        cluster.position.copy(center);
        for (let i = 0; i < count; i++) {
          const detail = i < 4 ? 2 : 1;
          const geo = new THREE.IcosahedronGeometry(radius * (0.42 + i * 0.05), detail);
          const leaf = new THREE.Mesh(geo, leafMats[i % leafMats.length]);
          const a = (i / count) * Math.PI * 2 + i * 0.88;
          const sp = radius * (0.28 + (i % 3) * 0.26);
          leaf.position.set(Math.cos(a) * sp, (i * 0.35) * radius * 0.1 - radius * 0.07, Math.sin(a) * sp);
          leaf.rotation.set(Math.sin(i * 1.3) * 0.45, i * 0.72, Math.cos(i * 0.9) * 0.32);
          leaf.scale.setScalar(0.87 + (i % 5) * 0.08);
          leaf.castShadow = true;
          leaf.receiveShadow = true;
          cluster.add(leaf);
        }
        root.add(cluster);
        leafClusters.push({ group: cluster, revealAt });
      };

      // Recursive branch: fans two children left/right relative to parent direction
      const addTreeBranch = (node: BranchNode): void => {
        const { endPoint } = createSegment(node.start, node.direction, node.length, node.radius, node.revealAt);

        if (node.depth <= 0) {
          addLeafCluster(endPoint, Math.max(0.72, node.radius * 2.8), node.revealAt + 0.08, 10);
          return;
        }

        const nextLen = node.length * 0.66;
        const nextRad = node.radius * 0.60;
        const childReveal = node.revealAt + 0.10;

        // Perpendicular axis for the fan — avoid parallel with direction
        const ref = Math.abs(node.direction.y) < 0.85
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(1, 0, 0);
        const side = new THREE.Vector3().crossVectors(node.direction, ref).normalize();

        // Fan left and right, bias slightly upward
        const leftDir  = node.direction.clone().addScaledVector(side,  0.48).addScaledVector(up, 0.10).normalize();
        const rightDir = node.direction.clone().addScaledVector(side, -0.48).addScaledVector(up, 0.10).normalize();

        addTreeBranch({ start: endPoint, direction: leftDir,  length: nextLen,        radius: nextRad,        depth: node.depth - 1, revealAt: childReveal + 0.04 });
        addTreeBranch({ start: endPoint, direction: rightDir, length: nextLen,        radius: nextRad,        depth: node.depth - 1, revealAt: childReveal + 0.08 });

        // Extra upward shoot at depth ≥ 2 to thicken the crown interior
        if (node.depth >= 2) {
          const upDir = node.direction.clone().addScaledVector(up, 0.35).normalize();
          addTreeBranch({ start: endPoint, direction: upDir, length: nextLen * 0.78, radius: nextRad * 0.80, depth: node.depth - 1, revealAt: childReveal + 0.12 });
        }

        // Dense leaf mass at the joint of depth-1 branches
        if (node.depth === 1) {
          addLeafCluster(endPoint, Math.max(0.88, node.radius * 2.4), node.revealAt + 0.12, 10);
        }
      };

      // ── Trunk ────────────────────────────────────────────────────────────────
      const TRUNK_H = 7.5;
      // Tall tapered trunk: wide at base, narrow at crown entry
      createSegment(new THREE.Vector3(0, 0, 0), up, TRUNK_H, 1.05, 0.0);

      // Root flare — wider base ring for a grounded, natural look
      const flare = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.9, 0.55, 10), trunkMat);
      flare.position.y = -0.12;
      flare.castShadow = true;
      flare.receiveShadow = true;
      root.add(flare);

      // Ground disc
      const ground = new THREE.Mesh(new THREE.CircleGeometry(5.5, 40), groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.35;
      ground.receiveShadow = true;
      root.add(ground);

      // Point on trunk at fraction f of its height
      const tp = (f: number) => new THREE.Vector3(0, f * TRUNK_H, 0);

      // ── Lower tier — 4 cardinal branches, ~35° above horizontal ──────────────
      // These give the wide, spreading silhouette of the lower canopy.
      const lowerDirs = [
        new THREE.Vector3(-1.00,  0.65,  0.10).normalize(),
        new THREE.Vector3( 1.00,  0.65, -0.10).normalize(),
        new THREE.Vector3( 0.10,  0.65,  1.00).normalize(),
        new THREE.Vector3(-0.10,  0.65, -1.00).normalize(),
      ];
      lowerDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.40), direction: dir, length: 3.6, radius: 0.36, depth: 2, revealAt: 0.14 + i * 0.04 }),
      );

      // ── Mid tier — 4 diagonal branches, ~50° above horizontal ────────────────
      // Offset 45° from the lower tier so the canopy fills all 360°.
      const midDirs = [
        new THREE.Vector3(-0.80,  0.82,  0.60).normalize(),
        new THREE.Vector3( 0.80,  0.82, -0.60).normalize(),
        new THREE.Vector3( 0.60,  0.82,  0.80).normalize(),
        new THREE.Vector3(-0.60,  0.82, -0.80).normalize(),
      ];
      midDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.62), direction: dir, length: 3.1, radius: 0.24, depth: 2, revealAt: 0.30 + i * 0.035 }),
      );

      // ── Upper-mid tier — fills the gap between mid (y≈4.65) and crown (y≈6.45) ─
      const upperMidDirs = [
        new THREE.Vector3(-0.70,  0.92,  0.30).normalize(),
        new THREE.Vector3( 0.70,  0.92, -0.30).normalize(),
        new THREE.Vector3( 0.30,  0.92,  0.70).normalize(),
        new THREE.Vector3(-0.30,  0.92, -0.70).normalize(),
      ];
      upperMidDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.74), direction: dir, length: 2.6, radius: 0.20, depth: 2, revealAt: 0.40 + i * 0.03 }),
      );

      // ── Upper tier — 5 near-vertical branches forming the crown peak ─────────
      const upperDirs = [
        new THREE.Vector3(-0.45,  1.0,  0.12).normalize(),
        new THREE.Vector3( 0.45,  1.0, -0.12).normalize(),
        new THREE.Vector3( 0.12,  1.0,  0.45).normalize(),
        new THREE.Vector3(-0.12,  1.0, -0.45).normalize(),
        new THREE.Vector3( 0.00,  1.0,  0.00),
      ];
      upperDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.86), direction: dir, length: 1.65, radius: 0.16, depth: 1, revealAt: 0.48 + i * 0.028 }),
      );

      // ── Upper tier — 5 near-vertical branches forming the crown peak ─────────
      const upperTopDirs = [
        new THREE.Vector3(-0.30,  1.0,  0.6).normalize(),
        new THREE.Vector3( 0.30,  1.0, -0.6).normalize(),
        new THREE.Vector3( 0.6,  1.0,  0.25).normalize(),
        new THREE.Vector3(-0.6,  1.0, -0.25).normalize(),
        new THREE.Vector3( 0.00,  1.0,  0.00),
      ];
      upperTopDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.86), direction: dir, length: 3.2, radius: 0.16, depth: 1, revealAt: 0.48 + i * 0.028 }),
      );

      // ── Render loop ──────────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      let growth = reducedMotion ? 1 : 0;
      let growthComplete = reducedMotion;

      const resize = () => {
        if (!containerRef.current) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const applyAnimationState = (elapsed: number) => {
        branches.forEach((item) => {
          const p = THREE.MathUtils.clamp((growth - item.revealAt) / 0.18, 0, 1);
          item.group.scale.set(1, p, 1);
        });
        leafClusters.forEach((item) => {
          const p = THREE.MathUtils.clamp((growth - item.revealAt) / 0.18, 0, 1);
          item.group.scale.setScalar(p);
          item.group.visible = p > 0.01;
        });

        // Gentle perpetual sway — trunk sways more than crown
        root.rotation.y = Math.sin(elapsed * 0.36) * 0.06 + Math.sin(elapsed * 0.17) * 0.02;
        root.rotation.x = Math.sin(elapsed * 0.25) * 0.018;
        root.rotation.z = Math.sin(elapsed * 0.19) * 0.013;

        bounceLight.intensity = 0.52 + Math.sin(elapsed * 0.52) * 0.10;
      };

      const render = () => {
        if (!mounted) return;
        const elapsed = clock.getElapsedTime();
        if (!growthComplete) {
          growth = Math.min(1, growth + 0.011);
          if (growth >= 1) growthComplete = true;
        }
        applyAnimationState(elapsed);
        renderer.render(scene, camera);
        animationFrameRef.current = window.requestAnimationFrame(render);
      };

      resize();
      if (reducedMotion) {
        growth = 1;
        applyAnimationState(0);
        renderer.render(scene, camera);
      } else {
        animationFrameRef.current = window.requestAnimationFrame(render);
      }

      const observer = new ResizeObserver(() => {
        resize();
        if (reducedMotion) renderer.render(scene, camera);
      });
      observer.observe(container);
      resizeObserverRef.current = observer;

      const disposeMat = (m: THREE.Material | THREE.Material[]) => {
        if (Array.isArray(m)) m.forEach(x => x.dispose()); else m.dispose();
      };

      disposeScene = () => {
        if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
        resizeObserverRef.current?.disconnect();
        renderer.dispose();
        [trunkMat, branchMat, groundMat, ...leafMats].forEach(m => m.dispose());
        [...branches, ...leafClusters].forEach(item =>
          item.group.traverse(obj => {
            if ((obj as THREE.Mesh).isMesh) (obj as THREE.Mesh).geometry.dispose();
          }),
        );
        flare.geometry.dispose();
        ground.geometry.dispose();
        disposeMat(ground.material);
        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      };
    })();

    return () => {
      mounted = false;
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
      resizeObserverRef.current?.disconnect();
      disposeScene?.();
      const container = containerRef.current;
      if (container) while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className={className ?? 'absolute inset-0'} />;
};

export default RealisticTree;
