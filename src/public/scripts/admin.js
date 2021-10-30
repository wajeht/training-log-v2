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

              <!-- trash can -->
              <a href="#" class="link-secondary text-decoration-none"
                ><i class="bi bi-trash"></i
              ></a>
            </div>

            <p class="card-text">${comment}</p>
            <p class="card-text">
              <small class="text-muted">${new Date().toISOString()}</small>
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
