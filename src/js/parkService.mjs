const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + url, options);
  if (response.ok) {
    data = await response.json();
  } else {
    // Get more details about the error
    const errorText = await response.text();
    console.error(`API Error: ${response.status} ${response.statusText}`);
    console.error(`Response:`, errorText);
    console.error(`API Key present:`, apiKey ? "Yes" : "No");
    throw new Error(`response not ok: ${response.status} ${response.statusText}`);
  }
  return data;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export async function getParkAlerts(code) {
  const parkData = await getJson(`alerts?parkCode=${code}`);
  return parkData.data;
}

export async function getParkVisitorCenters(code) {
  const parkData = await getJson(`visitorcenters?parkCode=${code}`);
  return parkData.data;
}

export function getInfoLinks(images) {
  return [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: images[2].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: images[3].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: images[9].url,
      description: "Learn about the visitor centers in the park."
    }
  ];
}
