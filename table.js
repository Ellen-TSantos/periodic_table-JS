document.addEventListener("DOMContentLoaded", function () {
  function showElementInfo(elementId) {
    fetch("http://localhost:3000/elements")
      .then((response) => response.json())
      .then((data) => {
        let elementInfoDiv = document.getElementById("elementInfo");
        if (elementInfoDiv) {
          if (Array.isArray(data) && data.length > 0) {
            const elementData = data.find(
              (element) => element.id === elementId
            );

            if (elementData) {
              elementInfoDiv.innerHTML = `
                <div class="card" style="z-index: 1;">
                  <h5>${elementData.Atomic_Number}</h5>
                  <h2>${elementData.Symbol}</h2>
                  <h2>${elementData.Name}</h2>
                  <h3>${elementData.Physical_State}</h3>
                  <p id="details">+ Detalhes</p>
                  <p id="type" style="display: none;">${elementData.Type}</p>
              `;


              const detailsParagraph = document.getElementById("details");
              const typeParagraph = document.getElementById("type");
              detailsParagraph.addEventListener("click", function() {
                if (typeParagraph.style.display === "none") {
                  typeParagraph.style.display = "block"; // Exibir o "Type"
                  detailsParagraph.textContent = "- Detalhes";
                } else {
                  typeParagraph.style.display = "none"; // Ocultar o "Type"
                  detailsParagraph.textContent = "+ Detalhes";
                }
              });

              elementInfoDiv.style.display = "block";

              setTimeout(function () {
                elementInfoDiv.style.display = "none";
              }, 8000);
            } else {
              console.error("Elemento não encontrado nos dados.");
            }
          } else {
            console.error("Dados inválidos retornados pelo servidor.");
          }
        } else {
          console.error("Elemento 'elementInfo' não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados:", error);
      });
  }

  let elements = document.querySelectorAll(".tbody, .tfoot, .container-table");
  elements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.currentTarget.style.opacity = 1;

      elements.forEach(function (el) {
        if (el !== event.currentTarget) {
          el.style.opacity = 0.1;
         
        }
      });
      setTimeout(function () {
        elements.forEach(function (el) {
          el.style.opacity = 1;
        });
      }, 8000);

      if (event.target.closest("td , th")) {
        let elementId = event.target.closest("td").id;
        showElementInfo(elementId);
      } else {
        console.log("Elemento clicado não é um 'td'");
      }
    });
  });
});
