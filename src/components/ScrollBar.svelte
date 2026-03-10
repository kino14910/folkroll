<script>
  import Lenis from 'lenis'

  let { minThumbHeight = 40, hoverToShow = false } = $props()

  let scrollProgress = $state(0)
  let containerHeight = $state(0)
  let contentHeight = $state(0)
  let isDragging = $state(false)
  let isScrolling = $state(false)
  let isHovered = $state(false)

  let lenis = $state(null)
  let dragStart = { y: 0, progress: 0 }
  let scrollingTimeout

  let heightRatio = $derived(
    contentHeight > 0 ? containerHeight / contentHeight : 1,
  )
  let thumbHeight = $derived(
    Math.max(minThumbHeight, heightRatio * containerHeight),
  )
  let trackSpace = $derived(containerHeight - thumbHeight)
  let thumbTop = $derived(scrollProgress * trackSpace)
  let hideTrack = $derived(heightRatio >= 1)

  $effect(() => {
    const lenisInstance = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    })

    lenisInstance.on('scroll', e => {
      scrollProgress = e.progress

      isScrolling = true
      clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    })

    const onNativeScroll = () => {
      if (isDragging) return

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      if (maxScroll > 0) {
        scrollProgress = scrollTop / maxScroll

        isScrolling = true
        clearTimeout(scrollingTimeout)
        scrollingTimeout = setTimeout(() => {
          isScrolling = false
        }, 100)
      }
    }

    window.addEventListener('scroll', onNativeScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      containerHeight = window.innerHeight
      contentHeight = document.documentElement.scrollHeight
    })
    resizeObserver.observe(document.documentElement)

    lenis = lenisInstance

    return () => {
      lenisInstance.destroy()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onNativeScroll)
      clearTimeout(scrollingTimeout)
    }
  })

  function getClientY(e) {
    return e.touches ? e.touches[0].clientY : e.clientY
  }

  function onDragStart(e) {
    isDragging = true
    isScrolling = true
    dragStart.y = getClientY(e)
    dragStart.progress = scrollProgress
    if (e.cancelable) e.preventDefault()
  }

  function handleGlobalMove(e) {
    if (!isDragging || !lenis) return
    const deltaY = getClientY(e) - dragStart.y
    const progressDelta = deltaY / trackSpace
    let targetProgress = Math.max(
      0,
      Math.min(1, dragStart.progress + progressDelta),
    )

    lenis.scrollTo(targetProgress * (contentHeight - containerHeight), {
      immediate: true,
    })
    scrollProgress = targetProgress
  }

  function handleGlobalUp() {
    isDragging = false
    isScrolling = false
  }
</script>

<svelte:window
  onmousemove={handleGlobalMove}
  onmouseup={handleGlobalUp}
  ontouchmove={handleGlobalMove}
  ontouchend={handleGlobalUp}
/>

<div
  class="track-container"
  class:is-active={isDragging || isScrolling || isHovered}
  class:hover-show={hoverToShow}
  class:hide={hideTrack}
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  role="scrollbar"
  aria-controls="main-content"
  aria-orientation="vertical"
  aria-valuenow={Math.round(scrollProgress * 100)}
  tabindex="-1"
>
  <div class="track">
    <div
      class="thumb"
      class:no-transition={isScrolling || isDragging}
      onmousedown={onDragStart}
      ontouchstart={onDragStart}
      style="height: {thumbHeight}px; transform: translateY({thumbTop}px);"
      role="slider"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(scrollProgress * 100)}
      tabindex="-1"
    ></div>
  </div>
</div>

<style>
  .track-container {
    --scrollbar-width: 16px;
    --thumb-visible-width: 8px;
    --thumb-bg: rgba(136, 136, 136, 0.4);
    --thumb-bg-active: #555;

    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: var(--scrollbar-width);
    z-index: 9999;
    background: transparent;
    user-select: none;
    touch-action: pan-y;
    transition: opacity 0.3s;
  }

  .hover-show {
    opacity: 0;
  }

  .is-active {
    opacity: 1;
  }

  .track {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .thumb {
    position: absolute;
    left: 50%;
    width: var(--thumb-visible-width);
    background: var(--thumb-bg);
    border-radius: 10px;
    cursor: grab;
    translate: -50% 0;
    /* 默认有平滑过渡，用于点击滑道跳转等场景 */
    transition:
      transform 0.2s cubic-bezier(0.23, 1, 0.32, 1),
      width 0.15s,
      background 0.15s;
    will-change: transform;
  }

  /* 核心修复：滚动或拖拽时，立即禁用过渡，实现实时跟随 */
  .thumb.no-transition {
    transition:
      width 0.15s,
      background 0.15s !important;
  }

  .thumb::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 100%;
  }

  .track-container:hover .thumb,
  .is-active .thumb {
    background: var(--thumb-bg-active);
    width: calc(var(--thumb-visible-width) + 2px);
  }

  .hide {
    display: none !important;
  }
</style>
