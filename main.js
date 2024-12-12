(()=>{"use strict";function e(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count");return a.src=e.link,a.alt=e.name,i.textContent=e.name,e.owner._id!==o?u.remove():u.addEventListener("click",(function(){return t(c,e._id)})),e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),e.likes.length>0?(s.textContent=e.likes.length,s.classList.remove("card__like-count_hidden")):s.classList.add("card__like-count_hidden"),a.addEventListener("click",(function(){return r(e)})),l.addEventListener("click",(function(){return n(l,e._id)})),c}function t(e,t){var n=e.classList.contains("card__like-button_is-active")?"DELETE":"PUT";return fetch("https://nomoreparties.co/v1/wff-cohort-29/cards/likes/".concat(t),{method:n,headers:{authorization:"b6d14234-5726-490a-87eb-f980b45c2dd9","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e.classList.toggle("card__like-button_is-active");var n=e.closest(".card").querySelector(".card__like-count");t.likes.length>0?(n.textContent=t.likes.length,n.classList.remove("card__like-count_hidden")):n.classList.add("card__like-count_hidden")}))}function n(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");t&&o(t)}}function r(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n)}function o(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",n)}function c(e){e.target===e.currentTarget&&o(e.target)}function a(e,t){var n=e.querySelector(t.submitButtonSelector);Array.from(e.querySelectorAll(t.inputSelector)).every((function(e){return e.validity.valid}))?(n.classList.remove(t.inactiveButtonClass),n.disabled=!1):(n.classList.add(t.inactiveButtonClass),n.disabled=!0)}function i(e,t,n){var r=e.querySelector("#".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function u(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){i(e,n,t)}))}var l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"b6d14234-5726-490a-87eb-f980b45c2dd9","Content-Type":"application/json"}};function s(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function d(){return fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s)}function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _,v=document.querySelector(".places__list"),m=document.querySelector(".popup_type_image"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),k=document.forms["edit-profile"],q=k.querySelector(".popup__input_type_name"),L=k.querySelector(".popup__input_type_description"),E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=y.querySelector(".popup__form"),A=C.querySelector(".popup__input_type_card-name"),x=C.querySelector(".popup__input_type_url"),w=document.querySelectorAll(".popup__close"),T=m.querySelector(".popup__image"),j=m.querySelector(".popup__caption"),U=document.querySelector(".popup_type_delete-card"),O=U.querySelector(".popup__button"),P=null,B=document.querySelector(".popup_type_avatar"),D=document.forms["edit-avatar"],I=D.querySelector(".popup__input_type_avatar"),N=document.querySelector(".profile__image");function z(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function J(e,t){P={element:e,id:t},r(U)}var H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function M(e){T.src=e.link,T.alt=e.name,j.textContent=e.name,r(m)}w.forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup"))}))})),S.addEventListener("click",(function(){q.value=E.textContent,L.value=g.textContent,u(k,H),a(k,H),r(b)})),b.addEventListener("click",c),k.addEventListener("submit",(function(e){e.preventDefault();var t,n,r=e.submitter;z(!0,r),(t=q.value,n=L.value,fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t,about:n})}).then(s)).then((function(e){E.textContent=e.name,g.textContent=e.about,o(b)})).finally((function(){z(!1,r)}))})),h.addEventListener("click",(function(){C.reset(),u(C,H),a(C,H),r(y)})),y.addEventListener("click",c),m.addEventListener("click",c),C.addEventListener("submit",(function(n){n.preventDefault();var r,c,i=n.submitter;z(!0,i),(r=A.value,c=x.value,fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:r,link:c})}).then(s)).then((function(n){var r=e(n,J,t,M,_);v.prepend(r),C.reset(),a(C,H),o(y)})).finally((function(){z(!1,i)}))})),O.addEventListener("click",(function(){var e,t;P&&(e=P.element,t=P.id,fetch("https://nomoreparties.co/v1/wff-cohort-29/cards/".concat(t),{method:"DELETE",headers:{authorization:"b6d14234-5726-490a-87eb-f980b45c2dd9"}}).then((function(t){t.ok&&e.remove()}))).then((function(){o(U),P=null}))})),N.addEventListener("click",(function(){D.reset(),u(D,H),a(D,H),r(B)})),B.addEventListener("click",c),D.addEventListener("submit",(function(e){!function(e,t,n,r){e.preventDefault();var c,a=e.submitter;p(!0,a),(c=t.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:c})}).then(s)).then((function(e){r.style.backgroundImage="url(".concat(e.avatar,")"),o(n)})).finally((function(){p(!1,a)}))}(e,I,B,N)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(n){n.addEventListener("input",(function(){n.validity.valid?i(t,n,e):function(e,t,n){var r=e.querySelector("#".concat(t.name,"-input-error"));t.classList.add(n.inputErrorClass),r.textContent=t.validationMessage,r.classList.add(n.errorClass)}(t,n,e),a(t,e)}))})),a(t,e)}))}(H),d(),Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s),d()]).then((function(n){var r,o,c=(o=2,function(e){if(Array.isArray(e))return e}(r=n)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(r,o)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1];_=a._id,E.textContent=a.name,g.textContent=a.about,N.style.backgroundImage="url(".concat(a.avatar,")"),i.forEach((function(n){var r=e(n,J,t,M,_);v.append(r)}))}))})();