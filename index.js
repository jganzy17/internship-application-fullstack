/** John Gansallo  */
const URL = "https://cfw-takehome.developers.workers.dev/api/variants";

addEventListener("fetch", async (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */

async function linkHandler(link) {
  if (!link) return null;
  try {
    return await fetch(link);
  } catch (err) {
    console.log("Error: ", err + ".");
    return null;
  }
}

const PORTFOLIO = "http://jgansallo-sps-spring20.appspot.com/";

async function HTMLRewriterHandler(oldResponse) {
  let newResponse = new HTMLRewriter()
    .on("title", {
      element(element) {
        element.prepend("John Gansallo ");
      },
    }).on("h1#title", {
      element(element) {
        element.append(" created by John Gansallo");
      },
    }).on("p#description", {
      element(element) {
        element.append(
          "Cloudflare Workers Internship App: Full-Stack"
        );
      },
    }).on("a#url", {
      element(element) {
        element.setAttribute("href", PORTFOLIO);
        element.setInnerContent("Click here for John Gansallo's Portfolio");
      },
    }).transform(oldResponse);

  return newResponse;
}
 
async function handleRequest(request) {
  let link
  if (!link) {
    try {
      await fetch(URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          link = Math.random() < 0.5 ? data.variants[0] : data.variants[1];
        });
    } catch (err) {
      console.log("Error: ", err + ".");
    }
  }
  urlResponse = await linkHandler(link);

  try {
    let response = new Response(urlResponse.body, {
      status: urlResponse.status,
      statsText: urlResponse.statusText,
    });
    response = HTMLRewriterHandler(response);
    return response;
  } catch(error) {
    console.error(error);
  }
}
