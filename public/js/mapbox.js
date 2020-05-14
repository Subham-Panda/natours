/* eslint-disable*/

export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW1zc3BhbmRhIiwiYSI6ImNrYTFkYjYzNDFpYTEzZXF1NmpwZXQ1NzUifQ.QUwzfbd2BfM0KuFDvmLWbg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/imsspanda/cka1dloki56vm1isa384brbz3',
        scrollZoom: false
        // center: [ -118.113491, 34.111745 ],
        // zoom: 4,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        //Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        //Add Marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        //Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        //Extends the map bounds
        bounds.extend(loc.coordinates) 
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 200,
            left: 50,
            right: 50
        }
    })
}

