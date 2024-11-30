// música
const musicaFundo = new Audio('./audio/audio.mp3');
musicaFundo.loop = true;
musicaFundo.volume = 1;

function tocarMusicaFundo() {
    musicaFundo.play().catch((error) => {
        console.error("Erro ao tentar tocar a música:", error);
    });
}

document.body.addEventListener('click', () => {
    tocarMusicaFundo();
});