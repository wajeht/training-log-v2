/**
 * post handler for commenting
 */
const postComment = (btn) => {
  const videoId = btn.parentNode.querySelector("[name=videoId]").value;
  const username = btn.parentNode.querySelector("[name=username]").value;
  const comment = btn.parentNode.querySelector("[name=comment]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const videoComments = document.querySelector("#video_comments");
  const commentSection = document.querySelector("#comment_section");

  /**
   * Comment html
   */
  const newComment = (newUsername, newComment, newDate) => {
    const html = document.createElement("div");
    html.innerHTML = `
      <div class="card  mb-3 shadow-sm animate__animated animate__fadeIn">
        <div class="card-body">
          <div>
            <div class="d-flex justify-content-between">
              <!-- title -->
              <a class="card-title text-decoration-none link-dark" href="/users/${username}"
                ><h5>${username}</h5></a
              >
             </div>

            <p class="card-text">${comment}</p>
            <p class="card-text">
              <small class="text-muted">${new Date().toLocaleDateString()}</small>
            </p>
          </div>
        </div>
      </div>`;
    return html;
  };

  /**
   * Error message html for comment section
   */
  const newError = (message) => {
    const e = document.createElement("div");
    e.innerHTML = `
      <div id="error" class="alert alert-danger" role="alert">
      ${message}
      </div>
    `;
    return e;
  };

  /**
   * fetching post request to post a comment
   */
  (async () => {
    try {
      // only make a post req if comment is not empty
      if (comment != "") {
        if (comment.length < 100) {
          const raw = await fetch(`/comments/${videoId}`, {
            method: "POST",
            headers: {
              "csrf-token": csrf,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId, comment }),
          });
          const res = await raw.json();
          if (res.message == "success!") {
            const { date, comment } = res.comment;
            videoComments.append(newComment(username, comment, date));

            // reset the comment box
            document.querySelector("[name=comment]").value = "";

            // remove the error if exist
            if (document.querySelector("#error")) {
              document.querySelectorAll("#error").forEach((el) => {
                el.remove();
              });
            }
          }
        } else {
          throw new Error("must be 100 character long");
        }
      } else {
        // throw a new error if comment is empty
        throw new Error("must not be empty");
      }
    } catch (err) {
      commentSection.prepend(newError(err));
    }
  })();
};

const deleteComment = (btn) => {
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const video_user_id = window.localStorage.getItem("video_user_id");
  const comment_id = window.localStorage.getItem("comment_id");
  const session_user_id = window.localStorage.getItem("session_user_id");

  (async () => {
    try {
      const res = await fetch(`/comments/${comment_id}`, {
        method: "DELETE",
        headers: {
          "csrf-token": csrf,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_user_id,
          comment_id,
          session_user_id,
        }),
      });

      if (!res.ok) {
        alert("err");
      }

      if (document.querySelector("#single-video-page")) {
        document
          .querySelector(`#comment-id${comment_id}`)
          .classList.add("animate__animated");
        document
          .querySelector(`#comment-id${comment_id}`)
          .classList.add("animate__zoomOut");
        document
          .querySelector(`#comment-id${comment_id}`)
          .classList.add("animate__fast");
        setTimeout(() => {
          document.querySelector(`#comment-id${comment_id}`).remove();
        }, 400);
      }
    } catch (err) {
      document.body.prepend(newToast("danger", err));
      const myToastEl = document.getElementById("toast");
      const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      myToast.show();
    }
  })();
};

const setCommentIdToLocalStorage = (btn) => {
  const video_user_id = btn.parentNode.children[1].value;
  const comment_id =
    btn.parentNode.parentNode.parentNode.parentNode.id.split("comment-id")[1];
  const session_user_id = btn.parentNode.children[2].value;

  window.localStorage.setItem("video_user_id", video_user_id);
  window.localStorage.setItem("comment_id", comment_id);
  window.localStorage.setItem("session_user_id", session_user_id);
};

/**
 * setting variable to local storage
 */
const setVideoIdLocalStorage = (btn) => {
  const videoId = btn.parentNode.children[1].value;
  window.localStorage.setItem("videoId", videoId);

  const userId = btn.parentNode.children[0].value;
  window.localStorage.setItem("userId", userId);
};

/**
 * delete handle for DELETE request
 */
const deleteVideo = (btn) => {
  let userId = window.localStorage.getItem("userId");
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  let videoId = window.localStorage.getItem("videoId");

  // grab the videoId manually on single video page
  // because on regular page, as soon as user click
  // delete, the dropdown menu show up and it will
  // set the id to local storage, but since we are in
  // single video details page, there is not drop down
  // menu, so we have to set and id of its parent
  // element and grab it manually
  if (document.querySelector("#single-video-page")) {
    videoId = document
      .querySelector("#delete-button")
      .parentNode.parentNode.parentNode.id.split("video-card")[1];
    userId =
      document.querySelector("#delete-button").parentNode.children[0].value;
  }

  (async () => {
    try {
      const res = await fetch(`/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          "csrf-token": csrf,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId }),
      });

      if (!res.ok) {
        throw new Error("some went wrong!");
      }

      if (document.querySelector("#single-video-page")) {
        document
          .getElementById(`single-video-page`)
          .classList.add("animate__animated");

        document
          .getElementById(`single-video-page`)
          .classList.add("animate__zoomOut");

        document
          .getElementById(`single-video-page`)
          .classList.add("animate__fast");
        setTimeout(() => {
          document.getElementById(`single-video-page`).remove();
        }, 400);

        setTimeout(() => {
          return (document.location.href = "/videos");
        }, 400);
      }

      document
        .getElementById(`video-card${videoId}`)
        .classList.add("animate__animated");

      document
        .getElementById(`video-card${videoId}`)
        .classList.add("animate__zoomOut");

      document
        .getElementById(`video-card${videoId}`)
        .classList.add("animate__fast");
      setTimeout(() => {
        document.getElementById(`video-card${videoId}`).remove();
      }, 400);
    } catch (err) {
      document.body.prepend(newToast("danger", err));
      const myToastEl = document.getElementById("toast");
      const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      myToast.show();
    }
  })();
};

/**
 *  toast html
 */
const newToast = (type, message) => {
  const html = document.createElement("div");
  html.innerHTML = `
  <div
  id="toast"
  class="toast align-items-center text-white bg-${type} border-0 position-fixed top-50 start-50 translate-middle p-3" style="z-index: 11"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
  `;
  return html;
};

const editProfile = (btn) => {
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...`;

  const id = btn.parentNode.querySelector("[name=id]").value;
  const name = btn.parentNode.querySelector("[name=name]").value;
  const username = btn.parentNode.querySelector("[name=username]").value;
  const email = btn.parentNode.querySelector("[name=email]").value;
  const age = btn.parentNode.querySelector("[name=age]").value;
  const gender = btn.parentNode.querySelector("[name=gender]").value;
  const biography = btn.parentNode.querySelector("[name=biography]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const usernameLink = document.querySelector("#username-link");

  (async () => {
    try {
      const res = await fetch("/settings/edit-profile", {
        method: "PUT",
        headers: {
          "csrf-token": csrf,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          username,
          email,
          age,
          gender,
          biography,
          csrf,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setTimeout(() => {
          btn.disabled = false;
          btn.innerText = "Save changes";
        }, 500);
        throw {
          statusCode: res.status,
          ...data,
        };
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Save changes";

        document.body.prepend(newToast("success", "updated!"));
        const myToastEl = document.getElementById("toast");
        const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
        myToast.show();
      }, 1000);

      // have to update this manually because since we use ajax
      // to update user setting, the username link has already loaded
      // from previous request. after ajax call, we gotta do it manually
      usernameLink.href = `/users/${username}`;
    } catch (err) {
      document.body.prepend(newToast("danger", err.message));
      const myToastEl = document.getElementById("toast");
      const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      myToast.show();
    }
  })();
};

const changePassword = (btn) => {
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...`;

  const userId = btn.parentNode.querySelector("[name=userId]").value;
  const oldPassword = btn.parentNode.querySelector("[name=oldPassword]").value;
  const newPassword = btn.parentNode.querySelector("[name=newPassword]").value;
  const confirmNewPassword = btn.parentNode.querySelector(
    "[name=confirmNewPassword]"
  ).value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

  (async () => {
    try {
      // check for empty
      if (newPassword == "" || confirmNewPassword == "" || oldPassword == "") {
        throw new Error("cannot be empty");
      }

      const res = await fetch("/settings/change-password", {
        method: "PUT",
        headers: {
          "csrf-token": csrf,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          oldPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw {
          statusCode: res.status,
          ...data,
        };
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Change password";

        document.body.prepend(newToast("success", "updated!"));
        const myToastEl = document.getElementById("toast");
        const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
        myToast.show();
      }, 1000);
    } catch (err) {
      btn.disabled = false;
      btn.innerText = "Change password";
      document.body.prepend(newToast("danger", err.message));
      const myToastEl = document.getElementById("toast");
      const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      myToast.show();
    }
  })();
};

/**
 * contact from coaching section
 */
const postContactOnCoachingSection = (btn) => {
  let name = btn.parentNode.parentNode.querySelector("[name=name]").value;
  let email = btn.parentNode.parentNode.querySelector("[name=name]").value;
  let message = btn.parentNode.parentNode.querySelector("[name=name]").value;
  const csrf = btn.parentNode.querySelector("#csrfToken").value;

  var emailValidator =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  (async () => {
    try {
      // empty check
      if (!name || !email || !message) {
        throw Error("must not be empty!");
      }

      // if (!email.match(emailValidator)) {
      //   throw Error("must be an email!");
      // }

      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "csrf-token": csrf,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw {
          statusCode: res.status,
          ...data,
        };
      }

      // show spinner
      btn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;
      btn.disabled = true;

      // after 1 sec
      setTimeout(() => {
        // change btn text to send
        btn.disabled = false;
        btn.innerText = "Send";

        // show a toast saying success
        document.body.prepend(
          newToast("success", "Sent! we'll get back to you ASAP!")
        );
        const myToastEl = document.getElementById("toast");
        const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
        myToast.show();

        // reset the form
        document.querySelector("#contactFormCoachingSection").reset();
      }, 1000);

      // reset the form
    } catch (err) {
      document.body.prepend(newToast("danger", err.message));
      const myToastEl = document.getElementById("toast");
      const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      myToast.show();
    }
  })();
};
