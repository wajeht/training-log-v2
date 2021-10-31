/**
 * global spinner
 */
const title = document.title;
const regex = /users|videos|video|Videos|profile|400|500/;
const homePage = "TrainingLog";
const url = window.location.href;

if (title.match(regex) || url.match(regex)) {
  document.onreadystatechange = () => {
    if (document.readyState !== "complete") {
      document.querySelector("main").style.visibility = "hidden";
      document.querySelector("#spinner").style.visibility = "visible";
    } else {
      document.querySelector("#spinner").style.display = "none";
      document.querySelector("main").style.visibility = "visible";
    }
  };
}

/**
 * recent videos home page spinner
 */
if (title == homePage) {
  document.onreadystatechange = () => {
    if (document.readyState !== "complete") {
      document.querySelector("#videos-home-page").style.visibility = "hidden";
      document.querySelector("#videos-home-page-spinner").style.visibility =
        "visible";
    } else {
      document.querySelector("#videos-home-page-spinner").style.display =
        "none";
      document;
      document.querySelector("#videos-home-page").style.visibility = "visible";
    }
  };
}

/**
 * add video modal
 */
const avfm = document.querySelector("#addVideoFormModal");
const avcb = document.querySelector("#add-video_cancel-button");
const avsb = document.querySelector("#add-video_submit-button");
if (avfm) {
  if (avsb) {
    avfm.addEventListener("submit", () => {
      avcb.remove();
      avsb.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading...`;
      avsb.disabled = true;
    });
  }
}

/**
 * sign in modal
 */
const siffm = document.getElementById("signinFormFromModal");
const sibfm = document.getElementById("signinButtonFromModal");
if (siffm) {
  siffm.addEventListener("submit", () => {
    if (sibfm) {
      sibfm.disabled = true;
      sibfm.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    }
  });
}

/**
 * sign in single page
 */
const siffsp = document.getElementById("signinFormFromSinglePage");
const sibfsp = document.getElementById("signinButtonFromSinglePage");
if (siffsp) {
  siffsp.addEventListener("submit", () => {
    if (sibfsp) {
      sibfsp.disabled = true;
      sibfsp.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    }
  });
}

/**
 * sign up single page
 */
const suffsp = document.getElementById("signupFormFromSinglePage");
const subfsp = document.getElementById("signupButtonFromSinglePage");
if (suffsp) {
  suffsp.addEventListener("submit", () => {
    if (subfsp) {
      subfsp.disabled = true;
      subfsp.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    }
  });
}

const postAComment = document.getElementById("postAComment");
if (postAComment) {
  postAComment.addEventListener("click", () => {
    // alert("s")
  });
}

/**
 * Sign in modal initialization
 */
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");
if (myInput && myModal) {
  myModal.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

/**
 * This will take care of card layout on video details page
 */
// window.addEventListener("DOMContentLoaded", () => {
//   const recentVideo = document.querySelector("#recent-video");
//   if (recentVideo) {
//     if (window.innerWidth <= 992) {
//       recentVideo.classList.remove("position-absolute");
//       // recentVideo.childNodes[1].classList.remove("row");
//       recentVideo.childNodes[1].classList.add("d-flex");
//       recentVideo.childNodes[1].classList.add("gap-3");
//     }
//     window.addEventListener("resize", () => {
//       if (window.innerWidth <= 992) {
//         recentVideo.classList.remove("position-absolute");
//         // recentVideo.childNodes[1].classList.remove("row");
//         recentVideo.childNodes[1].classList.add("d-flex");
//         recentVideo.childNodes[1].classList.add("gap-3");
//       } else if (window.innerWidth >= 992) {
//         recentVideo.classList.add("position-absolute");
//         // recentVideo.childNodes[1].classList.add("row");
//         recentVideo.childNodes[1].classList.remove("d-flex");
//         // recentVideo.childNodes[1].classList.remove("gap-3");
//       }
//     });
//   }
// });

/**
 * typed.js initialization
 */
const description = document.getElementsByClassName("description");
if (description.length != 0) {
  new Typed(".description", {
    strings: [
      "A full-stack web application to log training videos with the respect to weekly session. <i>For the athletes!</i>",
      "A full-stack web application to log training videos with the respect to weekly session. <i>Built by an athlete!</i>",
    ],
    typeSpeed: 0,
    backSpeed: 0,
    smartBackspace: true, // this is a default
  });
}
