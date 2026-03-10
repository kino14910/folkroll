<script>
  import gsap from 'gsap'

  const DURATION = 1.4

  $effect(() => {
    const tl = gsap.timeline({
      delay: DURATION,
      onComplete: () => {
        document.body.style.overflow = ''
      },
    })

    tl.to('.loader-wrapper', {
      yPercent: 100,
      opacity: 0.8,
      duration: 0.8,
      ease: 'expo.inOut',
      display: 'none',
    })

    tl.from(
      '.page-content',
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all',
      },
      '-=0.4',
    )

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  })
</script>

<div class="loader-wrapper">
  <div class="loader-inner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="22"
      viewBox="0 0 62 22"
      class="logo-svg"
    >
      <path
        d="M60.493,3.675,49.176,14.992,37.684,3.5,26.309,14.817,15.05,3.558,3.5,15.167"
        transform="translate(-1.019 1.443)"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="7"
      />
      <g class="rects">
        <rect width="7" height="7" x="-9" y="24"></rect>
        <rect width="7" height="7" x="66" y="-9"></rect>
        <rect width="7" height="7" x="66" y="-9"></rect>
      </g>
    </svg>
  </div>
</div>

<style>
  .loader-wrapper {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color, #aefff7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .loader-inner {
    color: var(--primary, #7a30cf);
  }

  .logo-svg {
    width: 62px;
    height: auto;
    overflow: visible;
  }

  .logo-svg path {
    stroke-dasharray: 81px 100px;
    stroke-dashoffset: -99px;
    animation: snake 2s linear infinite;
  }

  @keyframes snake {
    0%,
    19% {
      stroke-dashoffset: -81px;
    }
    50%,
    100% {
      stroke-dashoffset: 81px;
    }
  }

  /* --- 方块掉落动画 --- */
  .rects rect {
    fill: currentColor;
  }

  .rects rect:nth-child(1) {
    animation: drop-in 2.4s cubic-bezier(0.32, 0, 0.67, 0) infinite;
    transform-origin: -9px 24px;
  }
  .rects rect:nth-child(2) {
    animation: drop-out 2.4s cubic-bezier(0.33, 1, 0.68, 1) infinite;
    transform-origin: 66px -9px;
  }
  .rects rect:nth-child(3) {
    animation: drop-out-2 2.4s cubic-bezier(0.33, 1, 0.68, 1) infinite;
    transform-origin: 66px -9px;
  }

  @keyframes drop-in {
    0% {
      transform: translate3d(-20px, 20px, 0) scale(0.1);
    }
    20% {
      transform: translate3d(10px, -10px, 0) scale(1);
    }
    20.01%,
    100% {
      transform: scale(0);
    }
  }

  @keyframes drop-out {
    0%,
    49.99% {
      transform: translate3d(20px, -20px, 0) scale(0);
    }
    50% {
      transform: translate3d(-10px, 10px, 0) scale(1);
    }
    80%,
    100% {
      transform: translate3d(15px, -15px, 0) scale(0);
    }
  }

  @keyframes drop-out-2 {
    0%,
    49.99% {
      transform: translate3d(20px, -20px, 0) scale(0);
    }
    50% {
      transform: translate3d(-10px, 10px, 0) scale(1);
    }
    100% {
      transform: translate3d(10px, -20px, 0) scale(0);
    }
  }
</style>
