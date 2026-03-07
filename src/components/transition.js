import { cubicOut } from 'svelte/easing'
import { crossfade } from 'svelte/transition'

export const [send, receive] = crossfade({
  duration: 500,
  easing: cubicOut,
  fallback(node, params) {
    return {
      duration: 500,
      easing: cubicOut,
      css: t => `opacity: ${t}`,
    }
  },
})
