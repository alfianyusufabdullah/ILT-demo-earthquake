const API_KEY = "apps-demo-key";
const EARTHQUAKE_URL = "https://earthquake-indonesia.vercel.app/api/earthquake";

const EARTHQUAKE_ITEM = (earthquake) => {
  return `
        <div class="w-full md:w-1/2 lg:w-1/3">
            <div class="group relative">
                <img class="blur-none group-hover:blur-lg" src="${
                  earthquake.map
                }" />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <div class="m-10">
                        <p class="text-white text-3xl font-bold">${
                          earthquake.mmi
                        }</p>
                        <p class="text-white mt-4">${earthquake.time.replace(
                          "<br>",
                          " - "
                        )}</p>

                        <div class="mt-4 space-y-3">
                            <div>
                                <p class="text-white">Magnitudo</p>
                                <p class="text-white text-2xl font-bold">${
                                  earthquake.magnitudo
                                }SR</p>
                            </div>
                            <div>
                                <p class="text-white">Kedalaman</p>
                                <p class="text-white text-2xl font-bold">${
                                  earthquake.depth
                                }</p>
                            </div>
                            <div>
                                <p class="text-white">Lokasi</p>
                                <p class="text-white text-2xl font-bold">${
                                  earthquake.latLng
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const getEarthquakeHTML = (isDanger = false) =>
  new Promise(async (resolve, reject) => {
    try {
      const FORMATTED_EARTHQUAKE_URL = `${EARTHQUAKE_URL}?apiKey=${API_KEY}&isDanger=${isDanger}`;
      const response = await fetch(FORMATTED_EARTHQUAKE_URL).then((response) =>
        response.json()
      );

      const { data: earthquakes } = response;
      if (earthquakes.length < 1) return;

      const earthquakeHTML = earthquakes.map(EARTHQUAKE_ITEM);
      resolve(earthquakeHTML.join(""));
    } catch (error) {
      reject(error);
    }
  });

window.onload = async () => {
  const earthquakeHTML = await getEarthquakeHTML();
  const container = document.getElementById("earthquake-container");
  container.innerHTML = earthquakeHTML;

  document
    .getElementById("is-danger-checkbox")
    .addEventListener("change", async (event) => {
      const earthquakeHTML = await getEarthquakeHTML(event.target.checked);
      const container = document.getElementById("earthquake-container");
      container.innerHTML = earthquakeHTML;
    });
};
