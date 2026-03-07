<script lang="ts">
  const imageCount = 9
  let imgs = $state(
    Array.from({ length: imageCount }, (_, i) => `assets/pokers/poker${i}.jpg`),
  )
  let imgIndex = $state(5)
  let transformDatas = [
    'rotate(-10deg)',
    'rotate(-6deg) translate(35%, -12%)',
    'rotate(-2deg) translate(65%, -19%)',
    'rotate(2deg) translate(95%, -26%)',
    'rotate(6deg) translate(125%, -23%)',
  ]
  let cards = $state([
    {
      id: 0,
      nums: 0,
      src: imgs[4],
      transitioning: true,
      dragging: false,
      offsetX: 0,
      offsetY: 0,
    },
    {
      id: 1,
      nums: 1,
      src: imgs[3],
      transitioning: true,
      dragging: false,
      offsetX: 0,
      offsetY: 0,
    },
    {
      id: 2,
      nums: 2,
      src: imgs[2],
      transitioning: true,
      dragging: false,
      offsetX: 0,
      offsetY: 0,
    },
    {
      id: 3,
      nums: 3,
      src: imgs[1],
      transitioning: true,
      dragging: false,
      offsetX: 0,
      offsetY: 0,
    },
    {
      id: 4,
      nums: 4,
      src: imgs[0],
      transitioning: true,
      dragging: false,
      offsetX: 0,
      offsetY: 0,
    },
  ])

  let cardElements: HTMLElement[] = []
  let container: HTMLElement | null

  // $inspect(cards[1].offsetX)

  let dragStartX = 0
  let dragStartY = 0
  let activeCardId: number | null

  function handlePointerDown(e: MouseEvent, cardId: number) {
    activeCardId = cardId
    const card = cards.find(c => c.id === cardId)
    const draggingCard = cardElements.find(card => card == e.target)
    if (card && draggingCard && container) {
      card.dragging = true
      card.transitioning = false

      const cardRect: DOMRect | undefined = draggingCard.getBoundingClientRect()
      const containerRect: DOMRect | undefined =
        container.getBoundingClientRect()
      dragStartX = e.clientX
      dragStartY = e.clientY

      card.offsetX = e.clientX - containerRect.x - cardRect.width / 2
      card.offsetY = e.clientY - containerRect.y - cardRect.height / 2
    }
  }

  function handlePointerMove(e: MouseEvent) {
    if (activeCardId === null) return
    const draggingCard = cardElements.find(card => card == e.target)
    const card = cards.find(c => c.id === activeCardId)
    if (card && card.dragging && draggingCard && container) {
      const cardRect: DOMRect | undefined = draggingCard.getBoundingClientRect()
      const containerRect: DOMRect | undefined =
        container.getBoundingClientRect()
      card.offsetX = e.clientX - containerRect.x - cardRect.width / 2
      card.offsetY = e.clientY - containerRect.y - cardRect.height / 2
    }
  }

  function handlePointerUp() {
    if (activeCardId === null) return
    const card = cards.find(c => c.id === activeCardId)
    if (card) {
      card.dragging = false
      card.transitioning = true
      card.offsetX = 0
      card.offsetY = 0
    }
    activeCardId = null
  }

  // $effect(() => {
  //   // Update card sources when imgs changes
  //   cards.forEach((card, index) => {
  //     const srcIndex = 4 - index
  //     if (srcIndex >= 0 && srcIndex < imgs.length) {
  //       card.src = imgs[srcIndex]
  //     }
  //   })
  // })

  function move() {
    for (let card of cards) {
      let newNums = card.nums + 1

      if (newNums >= transformDatas.length) {
        card.nums = 0
        card.transitioning = false
        card.src = imgs[imgIndex]
        imgIndex = (imgIndex + 1) % imgs.length
      } else {
        card.nums = newNums
        card.transitioning = true
      }
    }
  }
</script>

<div
  class="home_photos"
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  role="main"
>
  <div class="home_photos_container">
    <h4 class="banner">PHOTOS</h4>
    <div class="home_photos_plates" bind:this={container}>
      {#each cards as card, index (card.id)}
        <div
          class="poker"
          class:dragging={card.dragging}
          role="img"
          style:--poker-transform={transformDatas[card.nums]}
          style:z-index={card.nums}
          style:transform={card.dragging
            ? `translate(${card.offsetX}px, ${card.offsetY}px) scale(1.2)`
            : 'var(--poker-transform)'}
          style:transition={card.transitioning && !card.dragging
            ? 'transform 0.3s ease'
            : 'none'}
          onpointerdown={e => handlePointerDown(e, card.id)}
          bind:this={cardElements[index]}
        >
          <img src={card.src} alt="Poker Card" loading="lazy" />
        </div>
      {/each}
      <div
        class="poker_top"
        onclick={move}
        onkeydown={e => e.key === 'Enter' && move()}
        role="button"
        tabindex="0"
        aria-label="Next Card"
      >
        <img
          src="/assets/pokers/poker-back.jpg"
          alt="Poker Card Back"
          loading="lazy"
        />
        <div class="arrow-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .home_photos {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .home_photos_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 45rem;
    height: 100%;
  }

  .banner {
    display: block;
    font-size: 12rem;
    font-family: 'Impact Regular';
    font-weight: 400;
    color: transparent;
    letter-spacing: 0.15rem;
    -webkit-text-stroke: 0.15rem var(--primary-dark);
    transform: scaleY(70%);
  }

  .home_photos_plates {
    position: relative;
    width: 45rem;
    height: 25rem;
    margin-bottom: 1rem;
    font-size: 2vmin;
  }

  .poker,
  .poker_top {
    user-select: none;
    position: absolute;
    width: 20rem;
    height: 26rem;
    border: 0.2rem solid var(--primary-dark);
    border-radius: 1.5rem;
    background-color: var(--primary-dark);
    transform-origin: bottom left;
    overflow: hidden;
    transform: var(--poker-transform);
  }

  .poker:hover {
    transform: var(--poker-transform) translateY(-50px);
  }

  .poker.dragging {
    cursor: grabbing;
    z-index: 1000 !important;
  }

  .poker img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .poker_top {
    background-color: var(--primary);
    border: none;
    cursor: pointer;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(6deg) translate(125%, -23%);
  }
  .poker_top img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .arrow-wrapper {
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: #410030;
    border-radius: 50%;
    animation: arrow-move 1.5s infinite ease-in-out;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
  }

  @keyframes arrow-move {
    0%,
    100% {
      transform: translateX(0);
      opacity: 0.6;
    }
    50% {
      transform: translateX(15px);
      opacity: 0.9;
    }
  }

  .arrow-wrapper svg {
    width: 100%;
    height: 100%;
  }
</style>
