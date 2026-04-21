<script lang="ts">
	import { onMount } from 'svelte'

	type Phase = 'entering' | 'covering' | 'exiting' | 'done'

	let phase: Phase = $state('covering')
	let animationKey = $state(0)

	const HOLD_DURATION = 400
	const EXIT_DURATION = 800

	let timers: ReturnType<typeof setTimeout>[] = []
	let hooksRegistered = false

	function clearTimers() {
		timers.forEach(clearTimeout)
		timers = []
	}

	function scheduleExit() {
		const exitTimer = setTimeout(() => {
			phase = 'exiting'
		}, HOLD_DURATION)

		const doneTimer = setTimeout(() => {
			phase = 'done'
			document.body.style.overflow = ''
		}, HOLD_DURATION + EXIT_DURATION)

		timers.push(exitTimer, doneTimer)
	}

	function onNavigationStart() {
		clearTimers()
		document.body.style.overflow = 'hidden'

		phase = 'done'

		animationKey += 1

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				phase = 'entering'

				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						phase = 'covering'
					})
				})
			})
		})
	}

	function onNavigationEnd() {
		clearTimers()
		scheduleExit()
	}

	function registerSwupHooks() {
		if (!window.swup || hooksRegistered) {
			return
		}
		window.swup.hooks.on('visit:start', onNavigationStart)
		window.swup.hooks.on('page:view', onNavigationEnd)
		hooksRegistered = true
	}

	function unregisterSwupHooks() {
		if (!window.swup || !hooksRegistered) {
			return
		}
		window.swup.hooks.off('visit:start', onNavigationStart)
		window.swup.hooks.off('page:view', onNavigationEnd)
		hooksRegistered = false
	}

	onMount(() => {
		document.body.style.overflow = 'hidden'

		if (window.swup) {
			registerSwupHooks()
		} else {
			document.addEventListener('swup:enable', registerSwupHooks)
		}

		if (document.readyState === 'complete') {
			scheduleExit()
		} else {
			const onLoad = () => {
				scheduleExit()
				window.removeEventListener('load', onLoad)
			}
			window.addEventListener('load', onLoad)
		}

		return () => {
			document.body.style.overflow = ''
			clearTimers()
			unregisterSwupHooks()
			document.removeEventListener('swup:enable', registerSwupHooks)
		}
	})
</script>

<div
	class="loader-wrapper"
	class:entering={phase === 'entering'}
	class:covering={phase === 'covering'}
	class:exiting={phase === 'exiting'}
	class:done={phase === 'done'}
	aria-hidden={phase === 'done'}
>
	<div class="loader-inner">
		{#key animationKey}
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
		{/key}
	</div>
</div>

<style>
	.loader-wrapper {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100vh;
		background-color: var(--page-bg);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transform: translateX(0);
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.loader-wrapper.entering {
		transform: translateX(-100%);
		transition: none;
	}

	.loader-wrapper.covering {
		transform: translateX(0);
	}

	.loader-wrapper.exiting {
		transform: translateX(100%);
		transition: transform 800ms cubic-bezier(0.7, 0, 0.84, 0);
	}

	.loader-wrapper.done {
		visibility: hidden;
		pointer-events: none;
	}

	.loader-inner {
		color: var(--primary);
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
