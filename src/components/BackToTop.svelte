<script lang="ts">
  let visible = false

  function handleScroll() {
    visible = window.scrollY > 100
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (typeof window !== 'undefined') {
    addEventListener('scroll', handleScroll)
  }
</script>

<button
  class="back-to-top"
  class:visible
  onclick={scrollToTop}
  aria-label="回到顶部"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
</button>

<style>
  .back-to-top {
    position: fixed;
    bottom: 2em;
    right: 2em;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 9;
    &.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    &:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1.5em;
      right: 1.5em;
      width: 40px;
      height: 40px;
    }
  }
</style>
