# SkyCiv 2021 Hackathon Project | Tiny House

## What Does it do?
TINY HOUSE DESIGNER offers a complete set of dynamic solutions for design and optimization of tiny houses built using cold-formed steel and wood materials. This software generates the calculation report needed in order to build an adequate tiny house structure.

## Goal
TINY HOUSE DESIGNER gives cost-efficient and economical design especially on cases where these houses are to be designed on a large scale but to be built on different locations and have different dimensions, occupancy, and material sections required


## Parameters and Limitations
Uses Imperial units

The software uses the following references:
- ASCE 7-16 for the wind and snow load
- AISI S100-12 (LRFD) for Cold-formed steel design
- NDS 2018 (LRFD) for Wood design

Uses the following material properties:
- AISI - Chromium Steel (Alloy 50XX) - Alloy 5150 - Normalized for the cold-formed steel
- General Oakwood for the wood material

Spacing or Opening sizes:
- Door height = 7’ 
- Door width = 3’
- Window width = 5’
- Window height = 3’
- Purlins spacing = 2’
- Lintel truss height = 1’
- Height of truss above wall frame = 2’
- Width of truss at corners = 2’
- Spacing of horizontal wall studs = 5’
- Spacing of vertical wall studs = 3’

## Workflow

### Input Parameters
From the input parameters, Templates and Assemblies API functions were used to setup the geometry of the structure

### Generate Loads
Wind and Snow loads are generated from the Site Data input using standalone.loads API

### Member Design
The loads generated from standalone.loads API are then applied to the model generated from Templates and Assemblies API functions. This model data is then analyzed using S3D.model.solve and S3D.member_design.check to design the members


### Member Optimization
Then S3D.member_design.optimize is then used to get the optimized section for the wall and truss panels, and purlins.

## Demo Video
https://drive.google.com/file/d/1e5WYhAf89zCHHOtnKSwbJfdR4qi4doUf/view?usp=sharing

## Future Developments
- Localized material sections and properties (automatic database depending on site address)
- Add settings for fixed parameters
- Add AS/NZS (metric)
- Optimization of purlins
- Improvement of design report
- Add plans and scheduling for printing
- Add foundation/slab-on-grade
