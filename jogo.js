
//colisão
class Borda {
    static width = 48
    static height = 48
    constructor ({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0.3)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
//sprites
class Sprite {
    constructor({ position, velocity, map, frames = { max: 1 }, lines = { line: 1 }, scale = 1 }) {
        this.position = position;
        this.map = map;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.lines = lines;
        this.scale = scale;

        this.map.onload = () => {
            this.width = (this.map.width / this.frames.max) * this.scale;
            this.height = (this.map.height / this.lines.line) * this.scale;
        };
        this.movendo = false;
        this.currentDirection = 0; // Posição inicial(EIXO Y) (parado para baixo, nesse caso)
    }

    draw() {
        ctx.save(); // Salva o estado atual do contexto

        if (this.currentDirection === 127 || this.currentDirection === 31) {  // Quando o personagem está indo para a esquerda
            ctx.scale(-1, 1); // Espelha horizontalmente
            ctx.translate(-this.position.x * 2 - this.width, 0); // Ajusta a posição
        }

        // Desenha o sprite com base nos parâmetros
        ctx.drawImage(
            this.map,
            this.frames.val * (this.map.width / this.frames.max), // Posição X da fatia
            this.currentDirection,                                // Posição Y da fatia
            this.map.width / this.frames.max,                    // Largura da fatia
            this.map.height / this.lines.line,                   // Altura da fatia
            this.position.x,
            this.position.y,
            (this.map.width / this.frames.max) * this.scale,      // Largura no canvas
            (this.map.height / this.lines.line) * this.scale      // Altura no canvas
        );

        ctx.restore(); // Restaura o estado original do contexto

        // Lógica para animação
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.max > 1) {
    this.frames.elapsed++;
    if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
            this.frames.val++;
        } else {
            this.frames.val = 0; // Voltar ao primeiro frame quando a animação terminar
        }
    }
    }
    }
}
//mapa colisão
const colisao = [221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 221, 221, 221, 221, 0, 0, 0, 221, 221, 221, 221, 0, 0, 221, 221, 221, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 221, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 221, 0, 0, 0, 221, 0, 221, 221, 221, 221, 0, 0, 0, 221, 221, 221, 221, 0, 0, 221, 221, 221, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 221, 221, 221, 221, 0, 0, 0, 221, 221, 221, 221, 0, 0, 221, 221, 221, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 221, 221, 221, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221,
    221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 221, 221, 221, 221, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 221, 0, 221, 221, 221, 221, 0, 0, 0, 0, 221, 221, 221, 221, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221,
    221, 0, 0, 0, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221,
    221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221, 221]
//mapa
const canvas = document.getElementById('mapa');
const ctx = canvas.getContext("2d");

canvas.width = 1240; // Largura do canvas
canvas.height = 720; // Altura do canvas
canvas.style.backgroundColor = "darkgray";

const coliMap = [];

for (let i = 0; i < colisao.length; i += 70) {
    coliMap.push(colisao.slice(i, 70 + i)); // Divide o mapa de colisão em blocos de 70
}
//coloca as colisões
const bordas = [];
offset = {
    x: 0,
    y: 0
};

coliMap.forEach((row, i) => { // Cada linha sendo id I
    row.forEach((symbol, j) => { // Cada número na linha, ou seja, as colunas de id J
        if (symbol === 1) // Se o número for de colisão
            bordas.push(
                new Borda({
                    position: {
                        x: j * Borda.width + offset.x, // Calcula posição x
                        y: i * Borda.height + offset.y // Calcula posição y
                    }
                })
            );
    });
});
//carrega o mapa
const mapa = new Image();//cria a constante da imagem
mapa.src = 'mapa/mapa.png'//pega a imagem

mapa.onload =() => {
    ctx.drawImage(mapa,0,-1100);//desenha a imagem na tela 
}
// mapa.onload = () => {
//     console.log('Mapa carregado!');
//     // Execute o código que usa o mapa aqui
// };

const foreImg = new Image();//cria a constante da imagem
foreImg.src= './mapa/foreground.png'//pega a imagem

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    map: foreImg // Usa a imagem do foreground
});

//canvassprite.js
const canvassprite = document.getElementById("canvassprite");
const ctxsprite = canvassprite.getContext("2d") ;

canvassprite.width = canvas.width; //largura canva (3720 mapa completo)
canvassprite.height = canvas.height; //altura canva  (2160 mapa completo)
canvassprite.style.backgroundColor = "rgba(255,0,0,0.0)";
//------------------------------------------------------------------------------------------------
const playerImage = new Image(); // Cria a constante da imagem
playerImage.src = './personagem/run.png';
 // Carrega a imagem do personagem
// playerImage.onload = () => {
//     console.log("Imagem carregada!");
// };


mapinha.src= 'mapa/mapa.png'

offset = {
    x: 0,
    y: -1100
};
const scale = 6;

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

const player = new Sprite({                    //criar animacoes
    position: {
        x: (canvas.width / 2) - ((384/6 ) * scale/ 2),//16 pixels por personagem
        y: (canvas.height / 2) - (32  * scale/ 2),//32 de altura
    },
    map: playerImage,
    frames: {
        max: 6,
    },
    lines: {
        line: 4
    },
    scale: scale,
    currentLine : 0
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    map: mapinha
});
//------------------------------------------------------------------------------------
const movables = [background, ...bordas, foreground];
//------------------------------------------------------------------------------------
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // Colisão pela direita
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // Colisão pela esquerda
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // Colisão pela parte superior
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y // Colisão pela parte inferior
    );
}

function animate() {
    const currentTime = performance.now(); // Tempo atual em ms
    window.requestAnimationFrame(animate); // Chama a função novamente (loop de animação)
    // Limpa a tela antes de redesenhar tudo
    ctxsprite.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(); // Desenha o fundo
    bordas.forEach(borda => {
        borda.draw();
    });

    player.draw(); // Desenha o personagem
    foreground.draw()
 
    let movendo = true;
    player.movendo = false
    // Movimento para cima (w)

    const speed = 5; // jogar em consts.js quando criar
    if (keys.w.pressed) {
        player.currentLine = 3; // Linha 3: movimento para cima
    } else if (keys.s.pressed) {
        player.currentLine = 0; // Linha 0: movimento para baixo
    } else if (keys.a.pressed) {
        player.currentLine = 1; // Linha 1: movimento para esquerda
    } else if (keys.d.pressed) {
        player.currentLine = 2; // Linha 2: movimento para direita
    }

    player.update(ctx);
}
animate();
//-------------------------------------------------------------------------------------
//movimentacao.js
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});