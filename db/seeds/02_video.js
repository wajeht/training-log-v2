exports.seed = async (knex) => {
  return knex("video")
    .del()
    .then(async () => {
      return knex("video").insert([
        {
          date: new Date().toISOString(),
          title: "one",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_1",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_1&category=&color=",
          user_id: 1,
        },
        {
          date: new Date().toISOString(),
          title: "two",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_2",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_2&category=&color=",
          user_id: 2,
        },
        {
          date: new Date().toISOString(),
          title: "three",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_3",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_3&category=&color=",
          user_id: 3,
        },
        {
          date: new Date().toISOString(),
          title: "four",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_4",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_4&category=&color=",
          user_id: 4,
        },
        {
          date: new Date().toISOString(),
          title: "five",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_5",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_5&category=&color=",
          user_id: 1,
        },
        {
          date: new Date().toISOString(),
          title: "sixth",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_6",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_6&category=&color=",
          user_id: 2,
        },
        {
          date: new Date().toISOString(),
          title: "seven",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_7",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_7&category=&color=",
          user_id: 3,
        },
        {
          date: new Date().toISOString(),
          title: "eight",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_8",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_8&category=&color=",
          user_id: 4,
        },
        {
          date: new Date().toISOString(),
          title: "nine",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_9",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_9&category=&color=",
          user_id: 1,
        },
        {
          date: new Date().toISOString(),
          title: "ten",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_10",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_10&category=&color=",
          user_id: 2,
        },
        {
          date: new Date().toISOString(),
          title: "eleven",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_11",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_11&category=&color=",
          user_id: 3,
        },
        {
          date: new Date().toISOString(),
          title: "twelve",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_12",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_12&category=&color=",
          user_id: 4,
        },
        {
          date: new Date().toISOString(),
          title: "thirteen",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_13",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_13&category=&color=",
          user_id: 1,
        },
        {
          date: new Date().toISOString(),
          title: "fourteen",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_14",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_14&category=&color=",
          user_id: 2,
        },
        {
          date: new Date().toISOString(),
          title: "fifteen",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_15",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_15&category=&color=",
          user_id: 3,
        },
        {
          date: new Date().toISOString(),
          title: "sixteen",
          description:
            "Ultrices ut mauris fames tincidunt convallis et sed pulvinar suspendisse",
          video_url:
            "https://temp.media/video/?height=500&width=500&length=5&text=video_16",
          screenshot_url:
            "https://temp.media/?height=500&width=500&text=video_16&category=&color=",
          user_id: 4,
        },
      ]);
    });
};
