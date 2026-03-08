<script>
  import Noise from './noise.js'

  let container = $state(null)
  let svgElement = $state(null)
  let width = $state(0)
  let height = $state(0)

  let mouse = $state({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })

  // 核心数据：线条对应的路径字符串数组
  let pathStrings = $state([])

  // 内部逻辑变量（非响应式，用于物理计算）
  let lines = []
  let noise = new Noise(Math.random())
  let rafId

  const setSize = () => {
    if (!container) return
    const rect = container.getBoundingClientRect()
    width = rect.width
    height = rect.height
  }

  const setLines = () => {
    const xGap = 10
    const yGap = 32
    const oWidth = width + 200
    const oHeight = height + 30

    const totalLines = Math.ceil(oWidth / xGap)
    const totalPoints = Math.ceil(oHeight / yGap)
    const xStart = (width - xGap * totalLines) / 2
    const yStart = (height - yGap * totalPoints) / 2

    lines = Array.from({ length: totalLines + 1 }, (_, i) => {
      return Array.from({ length: totalPoints + 1 }, (_, j) => ({
        x: xStart + xGap * i,
        y: yStart + yGap * j,
        wave: { x: 0, y: 0 },
        cursor: { x: 0, y: 0, vx: 0, vy: 0 },
      }))
    })
  }

  const moved = (point, withCursorForce = true) => {
    const x = point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0)
    const y = point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)
    return {
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
    }
  }

  const updatePhysics = time => {
    // 平滑鼠标位移
    mouse.sx += (mouse.x - mouse.sx) * 0.1
    mouse.sy += (mouse.y - mouse.sy) * 0.1

    // 鼠标速度与角度
    const dx = mouse.x - mouse.lx
    const dy = mouse.y - mouse.ly
    mouse.v = Math.hypot(dx, dy)
    mouse.vs += (mouse.v - mouse.vs) * 0.1
    mouse.vs = Math.min(100, mouse.vs)
    mouse.lx = mouse.x
    mouse.ly = mouse.y
    mouse.a = Math.atan2(dy, dx)

    // 更新点位物理状态
    lines.forEach(points => {
      points.forEach(p => {
        // Noise 波动
        const move =
          noise.perlin2(
            (p.x + time * 0.0125) * 0.002,
            (p.y + time * 0.005) * 0.0015,
          ) * 12
        p.wave.x = Math.cos(move) * 32
        p.wave.y = Math.sin(move) * 16

        // 鼠标交互
        const mdx = p.x - mouse.sx
        const mdy = p.y - mouse.sy
        const dist = Math.hypot(mdx, mdy)
        const limit = Math.max(175, mouse.vs)

        if (dist < limit) {
          const s = 1 - dist / limit
          const f = Math.cos(dist * 0.001) * s
          p.cursor.vx += Math.cos(mouse.a) * f * limit * mouse.vs * 0.00065
          p.cursor.vy += Math.sin(mouse.a) * f * limit * mouse.vs * 0.00065
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.005 // 张力
        p.cursor.vy += (0 - p.cursor.y) * 0.005
        p.cursor.vx *= 0.925 // 摩擦力
        p.cursor.vy *= 0.925
        p.cursor.x += p.cursor.vx * 2
        p.cursor.y += p.cursor.vy * 2
        p.cursor.x = Math.max(-100, Math.min(100, p.cursor.x))
        p.cursor.y = Math.max(-100, Math.min(100, p.cursor.y))
      })
    })

    // 生成路径字符串（触发响应式更新）
    pathStrings = lines.map(points => {
      let p1 = moved(points[0], false)
      let d = `M ${p1.x} ${p1.y}`
      points.forEach((p, i) => {
        const isLast = i === points.length - 1
        const pos = moved(p, !isLast)
        d += ` L ${pos.x} ${pos.y}`
      })
      return d
    })
  }

  const tick = time => {
    updatePhysics(time)
    rafId = requestAnimationFrame(tick)
  }

  const onMouseMove = e => {
    if (!container) return
    const rect = container.getBoundingClientRect()
    mouse.x = e.pageX - rect.left
    mouse.y = e.pageY - (rect.top + window.scrollY)

    if (!mouse.set) {
      mouse.sx = mouse.lx = mouse.x
      mouse.sy = mouse.ly = mouse.y
      mouse.set = true
    }
  }

  $effect(() => {
    setSize()
    setLines()
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
    }
  })
</script>

<div
  bind:this={container}
  class="home-wavy-lines"
  onmousemove={onMouseMove}
  role="presentation"
>
  <div
    class="pointer-dot"
    style:--x="{mouse.sx}px"
    style:--y="{mouse.sy}px"
  ></div>

  <svg bind:this={svgElement} style:width="{width}px" style:height="{height}px">
    {#each pathStrings as d}
      <path class="a__line" {d} />
    {/each}
  </svg>
</div>

<style>
  .home-wavy-lines {
    position: relative;
    max-width: 100dvw;
    height: 80dvh;
    background-color: var(--bg-color);
    overflow: hidden;
  }

  .pointer-dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--text-secondary);
    border-radius: 50%;
    transform: translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0);
    will-change: transform;
    pointer-events: none;
    z-index: 2;
  }

  svg {
    display: block;
    pointer-events: none;
  }

  .a__line {
    fill: none;
    stroke: var(--text-secondary);
    stroke-width: 1px;
  }
</style>
