var config = {
    style: 'mapbox://styles/mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ',
    showMarkers: false,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    theme: 'light',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    title: '',
    subtitle: '',
    byline: '',
    // footer: 'Source: https://twitter.com/sherryrehman/status/1564278183368822785. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'ch1',
            alignment: 'left',
            hidden: false,
            fullPhoto: './assets/4971108904_988f6d5592_o.jpg',
            title: '',
            image: '',
            description: 'Pakistan is at the center of a global climate crisis. A series of meteorological disasters in 2022 included glacial outbursts in the Upper Indus Basin, urban flooding in Karachi and Hyderabad, torrential rains and runoffs in Balochistan, flash floods in southern Punjab, and unprecedented rains in central Sindh.',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'ch2',
            alignment: 'right',
            hidden: false,
            fullPhoto: './assets/4971108908_8ab1c5202a_o.jpg',
            title: '',
            image: '',
            description: 'the flooding was unprecedented and has had a devastating impact on the people, infrastructure, and agriculture.',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '0' }],
            onChapterExit: []
        },
        {
            id: 'ch3',
            alignment: 'left',
            hidden: false,
            title: '',
            image: '',
            description: 'A team from the Vienna University of Technology mapped the flood extent using satellite imagery. scroll below to see the extent of flooding across the country',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': "flat" }
            ],
            onChapterExit: []
        },
        {
            id: 'ch4',
            alignment: 'fully',
            hidden: false,
            title: 'August 18',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 1 }],
            onChapterExit: []
        },
        {
            id: 'ch5',
            alignment: 'fully',
            hidden: true,
            title: 'August 22',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 2 }],
            onChapterExit: []
        },
        {
            id: 'ch6',
            alignment: 'fully',
            hidden: true,
            title: 'August 27',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 3 }],
            onChapterExit: []
        },
        {
            id: 'ch7',
            alignment: 'fully',
            hidden: true,
            title: 'August 30',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 4 }],
            onChapterExit: []
        },
        {
            id: 'ch8',
            alignment: 'fully',
            hidden: true,
            title: 'September 3',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 5 }],
            onChapterExit: []
        },
        {
            id: 'ch9',
            alignment: 'fully',
            hidden: true,
            title: 'September 6',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 6 }],
            onChapterExit: []
        },
        {
            id: 'ch10',
            alignment: 'fully',
            hidden: true,
            title: 'September 8',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 7 }],
            onChapterExit: []
        },
        {
            id: 'ch11',
            alignment: 'fully',
            hidden: true,
            title: 'September 10',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 8 }],
            onChapterExit: []
        },
        {
            id: 'ch12',
            alignment: 'fully',
            hidden: true,
            title: 'September 11',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 9 }],
            onChapterExit: []
        },
        {
            id: 'ch13',
            alignment: 'fully',
            hidden: true,
            title: 'September 15',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 10 }],
            onChapterExit: []
        },
        {
            id: 'ch14',
            alignment: 'fully',
            hidden: true,
            title: 'September 18',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 11 }],
            onChapterExit: []
        },
        {
            id: 'ch15',
            alignment: 'fully',
            hidden: true,
            title: 'September 20',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 12 }],
            onChapterExit: []
        },
        {
            id: 'ch16',
            alignment: 'fully',
            hidden: true,
            title: 'September 22',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 13 }],
            onChapterExit: []
        },
        {
            id: 'ch17',
            alignment: 'fully',
            hidden: true,
            title: 'September 23',
            image: '',
            description: '',
            location: {
                center: [69.086, 26.067],
                zoom: 7,
                pitch: 55,
                bearing: -28
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ layer: 'flood3d', 'fill-extrusion-opacity': '1' }, { layer: 'flood3d', 'fill-extrusion-height': 14 }],
            onChapterExit: []
        },
    ]
};