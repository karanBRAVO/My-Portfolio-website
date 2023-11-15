const addedNewProject_template = (content) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: 'Roboto', sans-serif; background-color: #fafafa; color: #333; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #4CAF50; text-align: center;">New Project Added!</h1>
      <div style="margin-top: 20px;">
        <h2 style="color: #333; margin-top: 20px; text-align: center;">Project Details</h2>
        <p style="margin-bottom: 10px; text-align: center;"><strong>Name:</strong> ${
          content.projectName
        }</p>
        <p style="margin-bottom: 10px; text-align: center;"><strong>Description:</strong>${
          content.projectDescription
        }</p>
      </div>

      <div style="margin-top: 20px;">
        <h2 style="color: #333; margin-top: 20px; text-align: center;">Previews</h2>
        ${content.projectPreviews
          .filter((value) => value.tag === "img")
          .map(
            (value) =>
              `<div style="text-align: center;">
                <img
                  src=${value.src}
                  style="width: 100%; max-width: 400px; height: auto; margin-bottom: 10px; border-radius: 8px;"
                  alt=${value.title}
                />
              </div>`
          )}
      </div>
    </div>
  </body>
  </html>`;
};

export default addedNewProject_template;
