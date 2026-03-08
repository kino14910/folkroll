<main class="home-welcome">
  <div class="background"></div>
  <div class="home-container">
    <div class="home-copy">
      <h1>Flokroll</h1>
      <p>Learn more <a href="/about">about me -></a></p>
    </div>
  </div>
</main>

<style>
  .home-welcome {
    flex: 1;
    margin: 0 auto;
    max-width: 1400px;
    padding: 1em 2em;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  .background {
    min-height: 100dvh;
    background-image: linear-gradient(var(--bgi-gradient)),
      url('/assets/hero-image.png');
    object-fit: fill;
    background-size: cover;
    background-position: center;
    max-width: 100dvw;

    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    z-index: -1;
  }
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 2em 0;
    min-height: 400px;
  }

  .home-copy {
    flex: 1;
    padding: 0 1em;

    & h1 {
      font-weight: 700;
      margin-bottom: 0.5em;
      line-height: 1.3;
    }

    & p {
      font-size: 1.4em;
    }
  }

  @media (max-width: 800px) {
    .home-container {
      flex-direction: column;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 2em;
      text-align: center;
    }
  }
</style>
