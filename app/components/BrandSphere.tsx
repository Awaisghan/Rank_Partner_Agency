"use client";

import React, { useEffect, useRef } from "react";

const companyLogos = [
  { name: "Forbes", bg: "#f2f2f2", text: "#111111" },
  { name: "BBC", bg: "#050505", text: "#ffffff" },
  { name: "CNBC", bg: "#f2f2f2", text: "#111111" },
  { name: "Reuters", bg: "#f2f2f2", text: "#ff641f" },
  { name: "Yahoo", bg: "#f2f2f2", text: "#6001d2" },
  { name: "Bloomberg", bg: "#f2f2f2", text: "#111111" },
  { name: "The Verge", bg: "#f2f2f2", text: "#111111" },
  { name: "Vox", bg: "#f2f2f2", text: "#111111" },
  { name: "TIME", bg: "#d40000", text: "#ffffff" },
  { name: "Axios", bg: "#f2f2f2", text: "#111111" },
  { name: "Insider", bg: "#f2f2f2", text: "#111111" },
  { name: "USA Today", bg: "#f2f2f2", text: "#087be8" },
  { name: "Newsweek", bg: "#f2f2f2", text: "#111111" },
  { name: "MarketWatch", bg: "#f2f2f2", text: "#008f49" },
  { name: "Inc.", bg: "#f2f2f2", text: "#111111" },
  { name: "WSJ", bg: "#f2f2f2", text: "#111111" },
  { name: "Fortune", bg: "#f2f2f2", text: "#111111" },
  { name: "Variety", bg: "#5b20b5", text: "#ffffff" },
  { name: "Mashable", bg: "#f2f2f2", text: "#00a88f" },
  { name: "Fast Company", bg: "#f2f2f2", text: "#111111" },
  { name: "Entrepreneur", bg: "#f2f2f2", text: "#111111" },
  { name: "The Economist", bg: "#d40000", text: "#ffffff" },
  { name: "People", bg: "#f2f2f2", text: "#111111" },
  { name: "GQ", bg: "#f2f2f2", text: "#111111" },
  { name: "Rolling Stone", bg: "#f2f2f2", text: "#111111" },
  { name: "The Guardian", bg: "#f2f2f2", text: "#052962" },
  { name: "Financial Times", bg: "#FFF1E5", text: "#990F3D" },
  { name: "TechCrunch", bg: "#f2f2f2", text: "#168b45" },
  { name: "Wired", bg: "#f2f2f2", text: "#111111" },
];

export default function BrandSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pointContainer = pointContainerRef.current;
    const sceneContainer = sceneContainerRef.current;

    if (!canvas || !pointContainer || !sceneContainer) return;

    // Do not run the 3D animation on mobile/tablet devices for better performance
    if (window.innerWidth < 1024) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const numPoints = 300;

    const baseCardSize = 80;
    const baseSphereRadius = 400;
    const cardSize = 100; // must match .brand-node width/height in CSS
    const sphereRadius = baseSphereRadius * (cardSize / baseCardSize);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const fibonacciOffsets = [8, 13, 21];

    let rotationY = 0.3;
    let rotationX = 0.3;
    let hoveredIndex: number | null = null;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velX = 0;
    let velY = 0;

    function getRandomLogo() {
      return companyLogos[Math.floor(Math.random() * companyLogos.length)];
    }

    function getSphericalPoints(count: number, radius: number) {
      const points = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        points.push({
          id: i,
          x: x * radius,
          y: y * radius,
          z: z * radius,
          brand: getRandomLogo(),
        });
      }
      return points;
    }

    const basePoints = getSphericalPoints(numPoints, sphereRadius);

    pointContainer.innerHTML = "";
    const htmlElements = basePoints.map((p, idx) => {
      const el = document.createElement("div");
      el.className = "brand-node";
      el.style.background = p.brand.bg;

      const label = document.createElement("span");
      label.textContent = p.brand.name;
      label.style.color = p.brand.text;
      el.appendChild(label);

      el.addEventListener("mouseenter", () => {
        hoveredIndex = idx;
        el.classList.add("hovered");
      });

      el.addEventListener("mouseleave", () => {
        if (hoveredIndex === idx) hoveredIndex = null;
        el.classList.remove("hovered");
      });

      pointContainer.appendChild(el);
      return el;
    });

    const connectionsSet = new Set<string>();
    const connections: { i: number; j: number }[] = [];

    function addConnection(i: number, j: number) {
      if (i < 0 || j < 0 || i >= numPoints || j >= numPoints || i === j) return;
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (!connectionsSet.has(key)) {
        connectionsSet.add(key);
        connections.push({ i, j });
      }
    }

    for (let i = 0; i < numPoints; i++) {
      for (let offset of fibonacciOffsets) {
        addConnection(i, i + offset);
      }
    }

    const poleBoundary = 13;
    for (let i = 0; i < poleBoundary; i++) {
      addConnection(i, i + 1);
      const bottomIdx = numPoints - 1 - i;
      addConnection(bottomIdx, bottomIdx - 1);
    }

    function handleDragStart(x: number, y: number) {
      isDragging = true;
      lastMouseX = x;
      lastMouseY = y;
      velX = 0;
      velY = 0;
    }

    function handleDragMove(x: number, y: number) {
      if (!isDragging) return;
      const dx = x - lastMouseX;
      const dy = y - lastMouseY;

      velX = dx * 0.005;
      velY = dy * 0.005;

      rotationY += velX;
      rotationX += velY;

      lastMouseX = x;
      lastMouseY = y;
    }

    function handleDragEnd() {
      isDragging = false;
    }

    const onMouseDown = (e: MouseEvent) => handleDragStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onMouseUp = () => handleDragEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleDragEnd();

    sceneContainer.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    sceneContainer.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    let animId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        velX *= 0.95;
        velY *= 0.95;

        rotationY += velX;
        rotationX += velY;

        if (Math.abs(velX) < 0.001 && Math.abs(velY) < 0.001) {
          if (hoveredIndex === null) {
            rotationY += 0.003;
          }
        }
      }

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const projected = basePoints.map((p, idx) => {
        let x1 = p.x * cosY + p.z * sinY;
        let y1 = p.y;
        let z1 = -p.x * sinY + p.z * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const fov = 450;
        const scale = fov / (fov - z2 + sphereRadius);
        const projectedX = centerX + x2 * scale;
        const projectedY = centerY + y2 * scale;

        const isHovered = hoveredIndex === idx;
        const hoverMultiplier = isHovered ? 1.1 : 1;
        const domEl = htmlElements[idx];
        z2 -= sphereRadius * 0.75;

        if (z2 <= 0) {
          domEl.style.display = "none";
        } else {
          domEl.style.display = "flex";
          domEl.style.transform = `translate3d(${projectedX - 50}px, ${projectedY - 50}px, 0px) scale(${scale * hoverMultiplier})`;
          domEl.style.opacity = isHovered ? "1" : `${Math.max(0.1, (z2 * 4) / sphereRadius)}`;
          domEl.style.zIndex = isHovered ? "999999" : `${Math.round((z2 + sphereRadius) * 10)}`;
        }

        return { x: projectedX, y: projectedY, z: z2 };
      });

      for (let k = 0; k < connections.length; k++) {
        const { i, j } = connections[k];
        const p1 = projected[i];
        const p2 = projected[j];

        if (p1.z > 0 || p2.z > 0) {
          const isConnectedToHovered =
            hoveredIndex !== null && (i === hoveredIndex || j === hoveredIndex);
          const avgZ = (p1.z + p2.z) / 2;
          let alpha = Math.max(0.02, (avgZ + sphereRadius) / (sphereRadius * 2));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (isConnectedToHovered) {
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = `rgba(56, 189, 248, 0.5)`;
          } else {
            ctx.lineWidth = alpha * 0.5;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * (hoveredIndex !== null ? 0.25 : 0.75)
              })`;
          }

          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      sceneContainer.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      sceneContainer.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full select-none">
      <div
        ref={sceneContainerRef}
        id="scene-container"
        className="relative w-[1000px] h-[1000px] cursor-grab active:cursor-grabbing select-none scale-[0.75] lg:scale-[1.1] xl:scale-[1.25] 2xl:scale-[1.3] min-[1920px]:scale-[1.6] min-[2560px]:scale-[2.0] min-[3840px]:scale-[2.8] translate-x-0 lg:translate-x-[70px] xl:translate-x-[30px] 2xl:translate-x-[150px] min-[1920px]:translate-x-[350px] min-[2560px]:translate-x-[700px] min-[3840px]:translate-x-[1500px] translate-y-[60px] lg:translate-y-[100px] xl:translate-y-[170px] 2xl:translate-y-[190px] min-[1920px]:translate-y-[250px] min-[2560px]:translate-y-[350px] min-[3840px]:translate-y-[600px] transition-transform duration-300"
      >
        <canvas
          ref={canvasRef}
          id="canvas"
          width="1000"
          height="1000"
          className="absolute top-0 left-0 pointer-events-none"
        />
        <div
          ref={pointContainerRef}
          id="point-container"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
