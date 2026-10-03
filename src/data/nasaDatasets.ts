export type NasaDataset = { id: string; title: string; category: string; description: string; url: string };

export const nasaDatasets: NasaDataset[] = [
  {
    "id": "vo1-vo2-mars-infrared-thermal-mapper-resampled-data-v1-0",
    "title": "VO1/VO2 MARS INFRARED THERMAL MAPPER RESAMPLED DATA V1.0",
    "category": "Thermal",
    "description": "This data set contains the Infrared Thermal Mapping (IRTM) data of Mars acquired by the Viking orbiters. The database contains the time, geometry, and radiative parameters obtained by the IRTM instrument. Included in the database for each measurement are model temperatures of Mars represent the average Martian response to the temporal variation of insolation. The reference 'Thermal and Albedo Mapping of Mars during the Viking Primary Mission', Journal of Geophysical Research, Vol. 82, No. 28, 1977, describes how th",
    "url": "https://data.nasa.gov/dataset/vo1-vo2-mars-infrared-thermal-mapper-resampled-data-v1-0"
  },
  {
    "id": "odyssey-mars-marie-reformatted-raw-data-v1-0",
    "title": "ODYSSEY MARS MARIE REFORMATTED RAW DATA V1.0",
    "category": "Radiation",
    "description": "The MARIE (Martian Radiation Environment Experiment), aboard the 2001 Mars Odyssey spacecraft, was launched on April 7, 2001, and arrived at Mars on October 24, 2001. Data were collected intermittently during the cruise phase, starting in late April and ending in late July. A problem with MARIE's onboard computer occurred in early August, and the instrument was turned off until early March 2002, after Odyssey 's mapping orbit had been established. Data have been collected from that time to the present without major",
    "url": "https://data.nasa.gov/dataset/odyssey-mars-marie-reformatted-raw-data-v1-0-360da"
  },
  {
    "id": "odyssey-mars-marie-calibrated-data-v1-0",
    "title": "ODYSSEY MARS MARIE CALIBRATED DATA V1.0",
    "category": "Radiation",
    "description": "The MARIE (Martian Radiation Environment Experiment), aboard the 2001 Mars Odyssey spacecraft, was launched on April 7, 2001, and arrived at Mars on October 24, 2001. Data were collected intermittently during the cruise phase, starting in late April and ending in late July. A problem with MARIE's onboard computer occurred in early August, and the instrument was turned off until early March, 2002, after Odyssey's mapping orbit had been established. Data have been collected from that time to the present without major",
    "url": "https://data.nasa.gov/dataset/odyssey-mars-marie-calibrated-data-v1-0-ba23a"
  },
  {
    "id": "mro-crism-map-projected-targeted-reduced-data-record-v1-0",
    "title": "MRO CRISM MAP-PROJECTED TARGETED REDUCED DATA RECORD V1.0",
    "category": "Mineralogy / Spectroscopy",
    "description": "This volume contains the CRISM Map-projected Targeted Reduced Data Record (MTRDR) archive, a collection of multiband image cubes derived from targeted (gimbaled) observations of Mars' surface acquired by the Compact Reconnaissance Imaging Spectrometer for Mars (CRISM) instrument on the Mars Reconnaissance Orbiter (MRO) spacecraft. Post-processing attempts to represent the spectrum the instrument would have measured looking at the surface of Mars at a standard illumination geometry, in the absence of atmospheric gas",
    "url": "https://data.nasa.gov/dataset/mro-crism-map-projected-targeted-reduced-data-record-v1-0-ae389"
  },
  {
    "id": "classification-of-mars-terrain-using-multiple-data-sources",
    "title": "Classification of Mars Terrain Using Multiple Data Sources",
    "category": "Terrain / ML",
    "description": "Classification of Mars Terrain Using Multiple Data Sources - Dataset - NASA Open Data Portal Skip to main content NASA Open Data Portal Datasets About Search Home Organizations NASA Classification of Mars... Classification of Mars Terrain Using Multiple Data Sources Total Views 164 Recent Views 11 NASA NASA's vision: To reach for new heights and reveal the unknown so that what we do and learn will benefit all humankind. To do that, thousands of people have been working around... read more Social Twitter Facebook Li",
    "url": "https://data.nasa.gov/dataset/classification-of-mars-terrain-using-multiple-data-sources"
  },
  {
    "id": "mro-crism-targeted-empirical-record-v1-0",
    "title": "MRO CRISM TARGETED EMPIRICAL RECORD V1.0",
    "category": "Mineralogy / Spectroscopy",
    "description": "This volume contains the CRISM Targeted Empirical Record (TER) archive, a collection of multiband image cubes derived from targeted (gimbaled) observations of Mars' surface acquired by the Compact Reconnaissance Imaging Spectrometer for Mars (CRISM) instrument on the Mars Reconnaissance Orbiter (MRO) spacecraft. Post-processing attempts to represent the spectrum the instrument would have measured looking at the surface of Mars at a standard illumination geometry, in the absence of atmospheric gases, with aerosol sc",
    "url": "https://data.nasa.gov/dataset/mro-crism-targeted-empirical-record-v1-0-1d641"
  }
];

export const pipelineLayers = [
  { key: "terrain", label: "Terrain classification", source: "NASA terrain classification dataset", effect: "landing + traverse suitability" },
  { key: "thermal", label: "Thermal environment", source: "Viking IRTM", effect: "thermal load + night risk" },
  { key: "radiation", label: "Radiation environment", source: "Mars Odyssey MARIE", effect: "exposure + shelter planning" },
  { key: "minerals", label: "Mineralogy", source: "MRO CRISM", effect: "science + ISRU targets" },
] as const;
