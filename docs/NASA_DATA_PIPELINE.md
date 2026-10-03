# NASA data pipeline

The supplied `Dataset of Nasa.zip` contains archived NASA Open Data Portal pages for:

- Viking IRTM thermal mapping
- Mars Odyssey MARIE raw/calibrated radiation data
- MRO CRISM MTRDR/TER spectroscopy
- Classification of Mars Terrain Using Multiple Data Sources

The application uses the archived metadata as a provenance registry. It does not pretend that those HTML snapshots are the raw instrument archives.

For a full research/ML pipeline, replace the registry with downloaded raw/processed products and add a preprocessing stage that produces normalized geospatial layers (terrain, temperature, radiation, mineralogy), then feed those layers into the route/survival scoring model.
