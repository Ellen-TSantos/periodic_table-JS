document.addEventListener("DOMContentLoaded", function () {
  function showElementInfo(elementName) {
    let elementInfoDiv = document.getElementById("elementInfo");
    if (elementInfoDiv) {
      elementInfoDiv.innerHTML = `
                <div class="card"  z-index: 1>
                    <h2>${elementName}</h2>
                </div>
            `;

      elementInfoDiv.style.display = "block";

      setTimeout(function () {
        elementInfoDiv.style.display = "none";
      }, 4000);
    } else {
      console.error("Elemento 'elementInfo' não encontrado.");
    }
  }

  let elements = document.querySelectorAll(`.tbody , .tfoot`);
  elements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      if (event.target.closest("td")) {
        let elementName =
        event.target.closest("td").querySelector(`h5`).textContent +
        `<br>` +
          event.target.closest("td").querySelector(`h3`).textContent +
          `<br>` +
          event.target.closest("td").querySelector(`h4`).textContent 

        showElementInfo(elementName);
      } else {
        console.log("Elemento clicado não é um 'td'");
      }
    });
  });
});
