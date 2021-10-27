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
      <div class="card mb-3 shadow-sm animate__animated animate__fadeIn">
        <div class="card-body">
          <div>
            <div class="d-flex justify-content-between">
              <!-- title -->
              <a class="card-title" href="/users/${username}"
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
   * Error message html
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
              document.querySelector("#error").remove();
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

const deleteVideo = (btn) => {
  alert("hi");
};
