

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  className?: string;
};

const MobileTree: React.FC<Props> = ({ className }) => {
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
      const camera = new THREE.PerspectiveCamera(25, 2, 0.1, 200);
      camera.position.set(0, 4, 20);
      camera.lookAt(0, 3, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(1);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Lighting
      const hemiLight = new THREE.HemisphereLight(0xb8e8c8, 0x2a1a06, 0.72);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xffe8a0, 2.0);
      keyLight.position.set(8, 12, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 512;
      keyLight.shadow.mapSize.height = 512;
      keyLight.shadow.camera.far = 50;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x88b8e0, 0.5);
      fillLight.position.set(-10, 6, 4);
      scene.add(fillLight);

      const root = new THREE.Group();
      scene.add(root);

      // Materials
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.93, metalness: 0.03 });
      const branchMat = new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 0.96, metalness: 0 });
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x1b3209, roughness: 0.99, metalness: 0 });
      const leafMats = [
        new THREE.MeshStandardMaterial({ color: 0x4caf6a, roughness: 0.82, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x2e7d4f, roughness: 0.92, metalness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x68c86e, roughness: 0.78, metalness: 0 }),
      ];

      const up = new THREE.Vector3(0, 1, 0);
      const branches: Array<{ group: THREE.Group; revealAt: number }> = [];
      const leafClusters: Array<{ group: THREE.Group; revealAt: number }> = [];

      // Create segment
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
        grp.quaternion.setFromAxisAngle(
          axis.lengthSq() > 0 ? axis.normalize() : new THREE.Vector3(1, 0, 0),
          angle
        );

        const mat = radius > 0.25 ? trunkMat : branchMat;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.52, radius, length, 8, 1), mat);
        mesh.position.y = length / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        grp.add(mesh);
        root.add(grp);
        branches.push({ group: grp, revealAt });

        const endPoint = new THREE.Vector3(0, length, 0).applyQuaternion(grp.quaternion).add(start);
        return { grp, endPoint };
      };

      // Add leaf cluster
      const addLeafCluster = (center: THREE.Vector3, radius: number, revealAt: number, count: number) => {
        const cluster = new THREE.Group();
        cluster.position.copy(center);
        for (let i = 0; i < count; i++) {
          const geo = new THREE.IcosahedronGeometry(radius * (0.42 + i * 0.05), 1);
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

      // Recursive branch
      const addTreeBranch = (node: any): void => {
        const { endPoint } = createSegment(node.start, node.direction, node.length, node.radius, node.revealAt);

        if (node.depth <= 0) {
          addLeafCluster(endPoint, Math.max(0.72, node.radius * 2.8), node.revealAt + 0.08, 8);
          return;
        }

        const nextLen = node.length * 0.66;
        const nextRad = node.radius * 0.60;
        const childReveal = node.revealAt + 0.10;

        const ref = Math.abs(node.direction.y) < 0.85 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        const side = new THREE.Vector3().crossVectors(node.direction, ref).normalize();

        const leftDir = node.direction.clone().addScaledVector(side, 0.48).addScaledVector(up, 0.10).normalize();
        const rightDir = node.direction.clone().addScaledVector(side, -0.48).addScaledVector(up, 0.10).normalize();

        addTreeBranch({ start: endPoint, direction: leftDir, length: nextLen, radius: nextRad, depth: node.depth - 1, revealAt: childReveal + 0.04 });
        addTreeBranch({ start: endPoint, direction: rightDir, length: nextLen, radius: nextRad, depth: node.depth - 1, revealAt: childReveal + 0.08 });

        if (node.depth >= 2) {
          const upDir = node.direction.clone().addScaledVector(up, 0.35).normalize();
          addTreeBranch({ start: endPoint, direction: upDir, length: nextLen * 0.78, radius: nextRad * 0.80, depth: node.depth - 1, revealAt: childReveal + 0.12 });
        }

        if (node.depth === 1) {
          addLeafCluster(endPoint, Math.max(0.88, node.radius * 2.4), node.revealAt + 0.12, 8);
        }
      };

      // Build simplified tree for mobile (fewer branches)
      const TRUNK_H = 5.5;
      createSegment(new THREE.Vector3(0, 0, 0), up, TRUNK_H, 0.8, 0.0);

      const flare = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 0.45, 8), trunkMat);
      flare.position.y = -0.1;
      flare.castShadow = true;
      flare.receiveShadow = true;
      root.add(flare);

      const ground = new THREE.Mesh(new THREE.CircleGeometry(4, 32), groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.3;
      ground.receiveShadow = true;
      root.add(ground);

      const tp = (f: number) => new THREE.Vector3(0, f * TRUNK_H, 0);

      // Lower branches (simplified)
      const lowerDirs = [
        new THREE.Vector3(-1.0, 0.65, 0.1).normalize(),
        new THREE.Vector3(1.0, 0.65, -0.1).normalize(),
        new THREE.Vector3(0.1, 0.65, 1.0).normalize(),
        new THREE.Vector3(-0.1, 0.65, -1.0).normalize(),
      ];
      lowerDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.35), direction: dir, length: 2.4, radius: 0.26, depth: 1, revealAt: 0.12 + i * 0.04 })
      );

      // Upper branches
      const upperDirs = [
        new THREE.Vector3(-0.5, 1.0, 0.2).normalize(),
        new THREE.Vector3(0.5, 1.0, -0.2).normalize(),
        new THREE.Vector3(0.2, 1.0, 0.5).normalize(),
        new THREE.Vector3(-0.2, 1.0, -0.5).normalize(),
      ];
      upperDirs.forEach((dir, i) =>
        addTreeBranch({ start: tp(0.65), direction: dir, length: 1.8, radius: 0.15, depth: 1, revealAt: 0.28 + i * 0.04 })
      );

      // Render loop
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
        const revealDuration = 0.24;

        branches.forEach((item) => {
          const p = THREE.MathUtils.clamp((growth - item.revealAt) / revealDuration, 0, 1);
          item.group.scale.set(1, p, 1);
        });
        leafClusters.forEach((item) => {
          const p = THREE.MathUtils.clamp((growth - item.revealAt) / revealDuration, 0, 1);
          item.group.scale.setScalar(p);
          item.group.visible = p > 0.01;
        });

        // Mobile animation: playful rotation
        root.rotation.y = Math.sin(elapsed * 0.52) * 0.12 + Math.sin(elapsed * 0.24) * 0.04;
        root.rotation.x = Math.sin(elapsed * 0.35) * 0.028;
        root.rotation.z = Math.sin(elapsed * 0.28) * 0.022;
      };

      const render = () => {
        if (!mounted) return;
        const elapsed = clock.getElapsedTime();
        if (!growthComplete) {
          growth = Math.min(1, growth + 0.007);
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
        if (Array.isArray(m)) m.forEach(x => x.dispose());
        else m.dispose();
      };

      disposeScene = () => {
        if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
        resizeObserverRef.current?.disconnect();
        renderer.dispose();
        [trunkMat, branchMat, groundMat, ...leafMats].forEach(m => m.dispose());
        [...branches, ...leafClusters].forEach(item =>
          item.group.traverse(obj => {
            if ((obj as THREE.Mesh).isMesh) (obj as THREE.Mesh).geometry.dispose();
          })
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

export default MobileTree;
