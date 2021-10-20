export const greetings = [
    `Hello, sunshine!`,
    `Hello World!`,
    `Howdy, partner!`,
    `Hey, howdy, hi!`,
    `What’s kickin’, little chicken?`,
    `Peek-a-boo!`,
    `Howdy-doody!`,
    `Hey there, freshman!`,
    `Hi, mister!`,
    `I come in peace!`,
    `Hiya!`,
    `‘Ello, gov’nor!`,
    `Top of the mornin’ to ya!`,
    `What’s crackin’?`,
    `‘Sup, homeslice?`,
    `This call may be recorded for training purposes.`,
    `Howdy, howdy ,howdy!`,
    `How does a lion greet the other animals in the field? Answer: what is a lion? :(.`,
    `Hello, my name is Juan Pablo Montoya.`,
    `I'm Batman.`,
    `Hello, who's overe there watching, I'm walking over here.`,
    `Here's ANTony!`,
    `You know who this is.`,
    `Ghostbusters, whatya want?`,
    `Yo!`,
    `snooooooooooooooooooooop.`,
    `Greetings and salutations!`,
    `Man i love Queen.`,
    `Hola que pasa.`,
    `beep beep beep beep beeeeep.`,
]

export const processRequest = (className, htmlContent) => {
    const body = document.querySelector('body')
    const screen = document.querySelector('#screen')
    body.classList = []
    body.classList.add(className)
    screen.innerHTML = htmlContent
}

export const drawSlider = (min = 0, max = 100, value) => {
    return (`<input type="range" min="${min}" max="${max}" value="${value}" class="slider" id="myRange" oninput="Ants.counters.speed = 120 - this.value">`);
}

export const isMobile = (() => { return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) })();

export const arrows = {
    left: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/>
        </svg>`,
    right: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/>
        </svg>`,
    up: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"/>
        </svg>`,
    down: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/>
        </svg>`,
}

export const full = !window.screenTop && !window.screenY ? `
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <rect fill="none" height="24" width="24"/>
        <path d="M22,3.41l-5.29,5.29L20,12h-8V4l3.29,3.29L20.59,2L22,3.41z M3.41,22l5.29-5.29L12,20v-8H4l3.29,3.29L2,20.59L3.41,22z"/>
    </svg>
    ` : `
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <rect fill="none" height="24" width="24"/>
        <polygon points="21,11 21,3 13,3 16.29,6.29 6.29,16.29 3,13 3,21 11,21 7.71,17.71 17.71,7.71"/>
    </svg>
`;