/* ============================================================
   THREE.JS 3D HERO SCENE — Particle Universe
   ============================================================ */

(function initThreeScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  /* ── Scene & Camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  /* ── Neural Network Node Mesh ── */
  const NODE_COUNT = 90;
  const nodes = [];
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 12;
    const y = (Math.random() - 0.5) * 8;
    const z = (Math.random() - 0.5) * 8;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    nodes.push({ x, y, z });
    velocities.push({
      x: (Math.random() - 0.5) * 0.012,
      y: (Math.random() - 0.5) * 0.012,
      z: (Math.random() - 0.5) * 0.012
    });
  }

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pointsMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.18,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const maxConnections = 150;
  const linePositions = new Float32Array(maxConnections * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
  scene.add(lineSegments);

  /* ── Mouse parallax ── */
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ── Animation Loop ── */
  function animate() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    const positionsArr = pointsGeo.attributes.position.array;
    const linePositionsArr = lineGeo.attributes.position.array;
    let lineIdx = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes[i].x += velocities[i].x;
      nodes[i].y += velocities[i].y;
      nodes[i].z += velocities[i].z;

      if (Math.abs(nodes[i].x) > 7) velocities[i].x *= -1;
      if (Math.abs(nodes[i].y) > 5) velocities[i].y *= -1;
      if (Math.abs(nodes[i].z) > 5) velocities[i].z *= -1;

      // Pull slightly towards mouse
      const dx = targetX * 3.5 - nodes[i].x;
      const dy = -targetY * 2.5 - nodes[i].y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distToMouse < 4) {
        nodes[i].x += dx * 0.003;
        nodes[i].y += dy * 0.003;
      }

      positionsArr[i * 3] = nodes[i].x;
      positionsArr[i * 3 + 1] = nodes[i].y;
      positionsArr[i * 3 + 2] = nodes[i].z;
    }
    pointsGeo.attributes.position.needsUpdate = true;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.5 && lineIdx < maxConnections) {
          linePositionsArr[lineIdx * 6] = nodes[i].x;
          linePositionsArr[lineIdx * 6 + 1] = nodes[i].y;
          linePositionsArr[lineIdx * 6 + 2] = nodes[i].z;

          linePositionsArr[lineIdx * 6 + 3] = nodes[j].x;
          linePositionsArr[lineIdx * 6 + 4] = nodes[j].y;
          linePositionsArr[lineIdx * 6 + 5] = nodes[j].z;
          lineIdx++;
        }
      }
    }

    for (let k = lineIdx; k < maxConnections; k++) {
      linePositionsArr[k * 6] = 0;
      linePositionsArr[k * 6 + 1] = 0;
      linePositionsArr[k * 6 + 2] = 0;
      linePositionsArr[k * 6 + 3] = 0;
      linePositionsArr[k * 6 + 4] = 0;
      linePositionsArr[k * 6 + 5] = 0;
    }
    lineGeo.attributes.position.needsUpdate = true;

    points.rotation.y += 0.0015;
    lineSegments.rotation.y += 0.0015;

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

})();


/* ─── Skills Canvas — Floating Tech Orbs ─── */
(function initSkillsCanvas() {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  const resizeCanvas = () => {
    if (canvas.offsetWidth) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight || 380;
    }
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Read tags dynamically from the DOM skill items
  const skillItems = Array.from(document.querySelectorAll('.skill-item'));
  const count = skillItems.length;
  
  if (count === 0) return;

  const colors = ['#6c63ff', '#00d4ff', '#ff6b9d', '#00ffaa'];
  let orbs = [];

  function rebuildOrbs(filterVal) {
    const filteredItems = skillItems.filter(item => {
      if (filterVal === 'all') return true;
      const cat = item.getAttribute('data-category');
      return cat === filterVal;
    });

    const count = filteredItems.length;
    if (count === 0) {
      orbs = [];
      return;
    }

    orbs = filteredItems.map((item, i) => {
      const k = -1 + (2 * i + 1) / count;
      const theta = Math.acos(k);
      const phi = Math.sqrt(count * Math.PI) * theta;

      // Sphere radius (fits inside canvas)
      const R = Math.min(canvas.width, canvas.height) * 0.38;
      const name = item.getAttribute('data-skill');
      const icon = item.getAttribute('data-icon') || '⚡';

      return {
        label: name,
        icon: icon,
        domItem: item,
        color: colors[i % colors.length],
        x3d: R * Math.sin(theta) * Math.cos(phi),
        y3d: R * Math.sin(theta) * Math.sin(phi),
        z3d: R * Math.cos(theta),
        x: 0,
        y: 0,
        scale: 1,
        alpha: 1,
        radius: 45 // Collision base radius
      };
    });
  }

  // Initial build
  rebuildOrbs('all');

  // Re-filter tags inside 3D Sphere Tag Cloud on filter click
  const filterBtns = document.querySelectorAll('.skills-filter-row .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter');
      rebuildOrbs(filterVal);
    });
  });

  let angleX = 0.002;
  let angleY = 0.002;
  let targetAngleX = 0.002;
  let targetAngleY = 0.002;
  let hoveredOrb = null;
  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Center coordinates
    const cx = mouseX - canvas.width / 2;
    const cy = mouseY - canvas.height / 2;

    targetAngleY = cx * 0.00002;
    targetAngleX = -cy * 0.00002;

    // Detect hover
    let hit = null;
    const sortedOrbs = [...orbs].sort((a, b) => b.z3d - a.z3d);
    for (let orb of sortedOrbs) {
      const dx = mouseX - orb.x;
      const dy = mouseY - orb.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < orb.radius * orb.scale) {
        hit = orb;
        break;
      }
    }
    hoveredOrb = hit;
    canvas.style.cursor = hit ? 'pointer' : 'grab';
  };

  const handleMouseLeave = () => {
    targetAngleX = 0.002;
    targetAngleY = 0.002;
    hoveredOrb = null;
    canvas.style.cursor = 'grab';
  };

  const handleCanvasClick = () => {
    if (hoveredOrb && hoveredOrb.domItem) {
      hoveredOrb.domItem.click();
      hoveredOrb.domItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  canvas.addEventListener('click', handleCanvasClick);

  let frameId;
  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate points based on mouse speeds
    angleX += (targetAngleX - angleX) * 0.08;
    angleY += (targetAngleY - angleY) * 0.08;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    orbs.forEach(orb => {
      let y1 = orb.y3d * cosX - orb.z3d * sinX;
      let z1 = orb.z3d * cosX + orb.y3d * sinX;
      let x2 = orb.x3d * cosY - z1 * sinY;
      let z2 = z1 * cosY + orb.x3d * sinY;

      orb.x3d = x2;
      orb.y3d = y1;
      orb.z3d = z2;

      const focalLength = 350;
      const scale = focalLength / (focalLength - orb.z3d);
      orb.scale = scale;
      
      orb.alpha = Math.max(0.15, Math.min(1.0, (orb.z3d + 200) / 360 * 0.8 + 0.2));

      orb.x = orb.x3d * scale + canvas.width / 2;
      orb.y = orb.y3d * scale + canvas.height / 2;
    });

    const drawOrder = [...orbs].sort((a, b) => a.z3d - b.z3d);

    drawOrder.forEach(orb => {
      ctx.save();
      ctx.globalAlpha = orb.alpha;

      const isHovered = hoveredOrb && hoveredOrb.label === orb.label;

      // 1. Glowing aura
      const glowRad = orb.scale * (isHovered ? 40 : 25);
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, glowRad);
      grad.addColorStop(0, orb.color + (isHovered ? '55' : '33'));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, glowRad, 0, Math.PI * 2);
      ctx.fill();

      // 2. Glassmorphic capsule tag
      const pillWidth = orb.scale * 88;
      const pillHeight = orb.scale * 24;
      const radius = pillHeight / 2;

      ctx.beginPath();
      ctx.roundRect(orb.x - pillWidth / 2, orb.y - pillHeight / 2, pillWidth, pillHeight, radius);
      
      ctx.fillStyle = isHovered ? 'rgba(20, 26, 48, 0.9)' : 'rgba(8, 12, 28, 0.65)';
      ctx.fill();

      ctx.strokeStyle = isHovered ? '#00d4ff' : orb.color + '88';
      ctx.lineWidth = isHovered ? 1.8 : 1;
      ctx.stroke();

      // 3. Text label
      ctx.fillStyle = isHovered ? '#00d4ff' : '#e8e8f0';
      const fontSize = Math.max(9, Math.round(orb.scale * 9));
      ctx.font = `500 ${fontSize}px 'Fira Code', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const labelText = (orb.icon ? orb.icon + ' ' : '') + orb.label;
      ctx.fillText(labelText, orb.x, orb.y);

      ctx.restore();
    });

    frameId = requestAnimationFrame(loop);
  };
  loop();
})();
