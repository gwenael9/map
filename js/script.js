
//  Initialisation de la carte

function initMap() {

  const webForce3 = {
    lat: 47.21417533371409,
    lng: -1.5542568920682733,
  };

  //j'enregistre les para de loc
  const map = new google.maps.Map(document.getElementById("map"), {

    // on définit le pt central grâce aux coordonnées
    center: webForce3,
    // on définit un niveau de zoom
    zoom: 15,
    // dans un souci d'optimisation + SEO, on supprime streetview
    streetViewControl: false,

    // on peut rajouter du style, avec snazzymaps.com

  });

  // je rajoute un marqueur pour faciliter la loc
  const marker = new google.maps.Marker({
    position: webForce3,
    map: map
  });

  // Ajout de la recherche
  const input = document.getElementById("search_input");
  const searchBox = new google.maps.places.SearchBox(input);


  // les résultats de la boîte de recherche vers la fenêtre d'affichage de la carte actuelle
  map.addListener("x", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Effacer le marqueur précédent
    marker.setMap(null);

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {

      const newMap = new google.maps.Map(document.getElementById("map"), {
        center: place.geometry.location,
        zoom: 10,
        streetViewControl: false,
      });

      // Créer un nouveau marqueur pour le lieu recherché
      const newMarker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });

      // Mettre à jour la position du marqueur
      bounds.extend(place.geometry.location)
    });

    map.fitBounds(bounds);
  });
}

// je lance ma fct à l'initialisation de la fenêtre
window.initMap = initMap;