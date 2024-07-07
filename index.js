document.addEventListener("DOMContentLoaded", function() {
    updateClientInfo(); 
    initializeFormValidation(); 
    initializeMobileMenu(); 
  });
  
  function updateClientInfo() {
    const locationText = document.querySelectorAll('.location__text'); 
    const telText = document.querySelectorAll('.tel__text'); 
  
    locationText.forEach(elem => {
      elem.textContent = ClientConfig.city; 
    });
  
    telText.forEach(elem => {
      elem.textContent = ClientConfig.phone; 
    });
  }
  
  function initializeFormValidation() {
    const form = document.querySelector('.feedback__form');
    const formMessage = document.querySelector('.feedback__message');
    const nameInput = document.querySelector('#name');
    const phoneInput = document.querySelector('#phone');
    const termsCheckbox = document.querySelector('#terms');
    const formErrors = document.querySelectorAll('.feedback__error'); 
  
    function clearErrorMessages() {
      formErrors.forEach(error => {   // очистка текста ошибок
        error.textContent = ''; 
      });
      nameInput.style.borderColor = ''; 
      phoneInput.style.borderColor = ''; 
    }
  
    function showError(input, message) {
      const errorDiv = input.nextElementSibling; 
      errorDiv.textContent = message;  // установка текста ошибки
      input.style.borderColor = 'red';
    }
  
    nameInput.addEventListener('blur', function() {
      clearErrorMessages();
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Пожалуйста, введите имя');
      }
    });
  
    phoneInput.addEventListener('blur', function() {
      clearErrorMessages();
      const phoneValue = phoneInput.value.trim();
      const phoneRegex = /^\+?[0-9]+$/;
      if (!phoneRegex.test(phoneValue)) {
        showError(phoneInput, 'Номер телефона может содержать только цифры и знак "+"');
      } else if (phoneValue === '') {
        showError(phoneInput, 'Пожалуйста, введите номер телефона');
      }
    });
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращаем отправку формы по умолчанию
  
      clearErrorMessages();
  
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const terms = termsCheckbox.checked;
  
      if (name === '' || phone === '' || !terms) {
        formMessage.textContent = "Пожалуйста, заполните все обязательные поля.";
        formMessage.style.color = "red";
      } else {
        const formData = new FormData(form);
        fetch('send_mail.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            formMessage.textContent = "Ваше сообщение успешно отправлено.";
            formMessage.style.color = "green";
            form.reset(); // Сбрасываем форму после успешной отправки
          } else {
            formMessage.textContent = "Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.";
            formMessage.style.color = "red";
          }
        })
        .catch(error => {
          formMessage.textContent = "Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.";
          formMessage.style.color = "red";
        });
      }
    });
  }
  
  function initializeMobileMenu() {
    const burger = document.querySelector(".burger");
    const navMobile = document.querySelector(".nav__mobile");
    const navItems = navMobile.querySelectorAll(".nav__item");
    const locationBlock = document.querySelector(".location");
  
    burger.addEventListener("click", function() {
      burger.classList.toggle("active");
      navMobile.classList.toggle("active");
      locationBlock.classList.toggle("active");
      closeAllSublists();
    });
  
    navItems.forEach((item) => {
      item.addEventListener("click", function(event) {
        event.preventDefault();
        const isActive = item.classList.contains("active");
        closeAllSublists();
        if (!isActive) {
          openSublist(item);
        }
      });
    });
  
    function closeAllSublists() {
      navItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  
    function openSublist(item) {
      item.classList.add("active");
    }
  }


// document.addEventListener('DOMContentLoaded', () => {
//     const menu = new Mmenu('#menu', {
//         // Опции Mmenu
//     }, {
//         // Конфигурация Mmenu
//         offCanvas: {
//             page: {
//                 nodetype: "header"
//             }
//         }
//     });

//     console.log(menu);

//     const burger = document.querySelector('.burger');

//     burger.addEventListener('click', function () {
//         menu.open();
//     });
// });





  
