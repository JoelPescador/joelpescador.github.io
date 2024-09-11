const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    console.log(entrada);
    if (entrada.isIntersecting) {
      entrada.target.classList.add("mostrar");
    } else {
      entrada.target.classList.remove("mostrar");
    }
  });
});

const elementosOcultos = document.querySelectorAll(".oculto");
elementosOcultos.forEach((elemento) => observador.observe(elemento));
function svgParpadea() {
  const contacto = document.getElementById("contacto");
  const svgs = document.getElementsByClassName("animar");

  contacto.addEventListener("click", function () {
    for (let i = 0; i < svgs.length; i++) {
      svgs[i].classList.add("animacion");
    }
  });
}
