const conditionalField = document.getElementById("conditional-field");
const form = document.getElementById("form");
const container = document.getElementsByClassName("integration-container")[0];
const checkbox = document.getElementsByName("integration");
const completedList = document.getElementById("completed-list");
const button = document.getElementsByClassName("btn")[0];

const getirHtml = `
            <div class="input-wrapper">
              <div class="input">
                <input
                  type="text"
                  id="app-secret-key"
                  class="input__field"
                  placeholder=" "
                />
                <label for="app-secret-key" class="input__label">App Secret Key</label>
              </div>
              <div class="input">
                <input
                  type="text"
                  id="restaurant-secret-key"
                  class="input__field"
                  placeholder=" "
                />
                <label for="restaurant-secret-key" class="input__label">Restaurant Secret Key</label>
              </div>
            </div>
`;

const trendyolHtml = `
            <div class="input-wrapper" >
              <div class="input">
                <input
                  type="text"
                  id="api-key"
                  class="input__field"
                  placeholder=" "
                />
                <label for="api-key" class="input__label">Api Key</label>
              </div>
              <div class="input">
                <input
                  type="text"
                  id="api-secret-key"
                  class="input__field"
                  placeholder=" "
                />
                <label for="api-secret-key" class="input__label">Api Secret Key</label>
              </div>
            </div>
            <div class="input">
              <input
                type="text"
                id="supplier-id"
                class="input__field"
                placeholder=" "
              />
              <label for="supplier-id" class="input__label">Supplier Id</label>
            </div>
`;

const yemekSepetiHtml = `
<div class="input">
<input
  type="text"
  id="username"
  class="input__field"
  placeholder=" "
/>
<label for="username" class="input__label">Username</label>
</div>
<div class="input">
<input
  type="password"
  id="password"
  class="input__field"
  placeholder=" "
/>
<label for="password" class="input__label">Password</label>
<i class="material-icons" id="visibility">visibility</i>
</div>
<div class="input-wrapper">
<div class="input">
  <input
    type="text"
    class="input__field"
    id="app-secret-key"
    placeholder=" "
  />
  <label for="app-secret-key" class="input__label">App Secret Key</label>
</div>
<div class="input">
  <input
    type="text"
    class="input__field"
    id="restaurant-secret-key"
    placeholder=" "
  />
  <label for="restaurant-secret-key" class="input__label">Restaurant Secret Key</label>
</div>
</div>
`;

// firmaların bulunduğu array
let data = [
  { restaurant: "Getir", id: "getir", checked: true },
  { restaurant: "Trendyol", id: "trendyol", checked: false },
  { restaurant: "Yemek Sepeti", id: "yemek-sepeti", checked: false },
];

// sayfada firmaların listelenmesi
const getContainerItems = () => {
  return (container.innerHTML =
    data.length > 0
      ? `
  <p>Lütfen entegrasyon yapmak istediğiniz restoran yönetim panelini seçiniz.</p>
  <ul class="list" id="list">` +
        data
          .map(
            (item) => `
        <li class="list__item" >
          <label for="${item.id}">
          <input type="radio" id="${item.id}" name="integration" ${item.checked ? "checked" : ""}   />
            <div>
              <span></span>
              ${item.restaurant}
            </div>
          </label>
        </li>`
          )
          .join("") +
        `</ul>`
      : null);
};

// Seçilen firmaya ait inputların listelenmesi
const integrationsEvents = () => {
  const integrations = document.getElementsByClassName("list__item");
  Array.from(integrations).forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.id) {
        switch (event.target.id) {
          case "getir":
            setConditionalFields(getirHtml);
            break;
          case "trendyol":
            setConditionalFields(trendyolHtml);
            break;
          case "yemek-sepeti":
            setConditionalFields(yemekSepetiHtml);
            // Şifrenin kapatılıp açılması
            document.getElementById("visibility").addEventListener("click", (event) => {
              const inputPassword = document.getElementById("password");
              if (inputPassword.type === "password") {
                inputPassword.type = "text";
              } else {
                inputPassword.type = "password";
              }

              if (event.target.innerHTML === "visibility") {
                event.target.innerHTML = "visibility_off";
              } else {
                event.target.innerHTML = "visibility";
              }
            });
            break;
        }
      }
    });
  });
};

const setConditionalFields = (html) => {
  conditionalField.innerHTML = html;
};

// Restoran eklendiğinde buton üzerinde olan değişimler
const setButtonClass = () => {
  button.classList.add("btn-completed");
  button.innerHTML = `
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1L6 12L1 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  Tebrikler! Entegrasyon Tamamlandı.
  `;
  button.disabled = true;
  setTimeout(() => {
    button.classList.remove("btn-completed");
    button.innerHTML = "Restoran Ekle";
    button.disabled = false;
  }, 3000);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setButtonClass();
  checkbox.forEach((item) => {
    if (item.checked) {
      data = data.filter((obj) => obj.id !== item.id);
      completedList.innerHTML += `<li class="completed">${item.id} entegrasyonu tamamlandı.</li>`;
    }
  });

  if (data[0]) {
    data[0].checked = true;
    if (data[0].id == "getir") {
      setConditionalFields(getirHtml);
    } else if (data[0].id == "trendyol") {
      setConditionalFields(trendyolHtml);
    } else if (data[0].id == "yemek-sepeti") {
      setConditionalFields(yemekSepetiHtml);
    }
  } else {
    setConditionalFields(null);
  }

  getContainerItems();
  integrationsEvents();

  if (data.length == 0) {
    button.remove();
  }
});

window.onload = () => {
  getContainerItems();
  integrationsEvents();
  setConditionalFields(getirHtml);
};
