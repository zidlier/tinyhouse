INDEX.general_data = (function () {
    
    var functions = {}

    var AISI_sections = {
        "C-Sections W Lips (I-1)": [
            "4CS2.5x059",
            "4CS2.5x065",
            "4CS2.5x070",
            "4CS2.5x085",
            "4CS2.5x105",
            "4CS2x059",
            "4CS2x065",
            "4CS2x070",
            "4CS2x085",
            "4CS2x105",
            "4CS4x059",
            "4CS4x065",
            "4CS4x070",
            "4CS4x085",
            "4CS4x105",
            "6CS2.5x059",
            "6CS2.5x065",
            "6CS2.5x070",
            "6CS2.5x085",
            "6CS2.5x105",
            "6CS4x059",
            "6CS4x065",
            "6CS4x070",
            "6CS4x085",
            "6CS4x105",
            "7CS2.5x059",
            "7CS2.5x065",
            "7CS2.5x070",
            "7CS2.5x085",
            "7CS2.5x105",
            "7CS4x059",
            "7CS4x065",
            "7CS4x070",
            "7CS4x085",
            "7CS4x105",
            "8CS2.5x059",
            "8CS2.5x065",
            "8CS2.5x070",
            "8CS2.5x085",
            "8CS2.5x105",
            "8CS2x059",
            "8CS2x065",
            "8CS2x070",
            "8CS2x085",
            "8CS2x105",
            "8CS3.5x059",
            "8CS3.5x065",
            "8CS3.5x070",
            "8CS3.5x085",
            "8CS3.5x105",
            "8CS4x059",
            "8CS4x065",
            "8CS4x070",
            "8CS4x085",
            "8CS4x105",
            "9CS2.5x059",
            "9CS2.5x065",
            "9CS2.5x070",
            "9CS2.5x085",
            "9CS2.5x105",
            "10CS2.5x065",
            "10CS2.5x070",
            "10CS2.5x085",
            "10CS2.5x105",
            "10CS2x065",
            "10CS2x070",
            "10CS2x085",
            "10CS2x105",
            "10CS3.5x065",
            "10CS3.5x070",
            "10CS3.5x085",
            "10CS3.5x105",
            "10CS4x065",
            "10CS4x070",
            "10CS4x085",
            "10CS4x105",
            "12CS2.5x070",
            "12CS2.5x085",
            "12CS2.5x105",
            "12CS3.5x070",
            "12CS3.5x085",
            "12CS3.5x105",
            "12CS4x070",
            "12CS4x085",
            "12CS4x105"
        ],
        "C-Sections W Lips (I-2)": [
            "250S137-33",
            "250S137-43",
            "250S137-54",
            "250S137-68",
            "250S162-33",
            "250S162-43",
            "250S162-54",
            "250S162-68",
            "350S162-33",
            "350S162-43",
            "350S162-54",
            "350S162-68",
            "362S137-33",
            "362S137-43",
            "362S137-54",
            "362S137-68",
            "362S162-33",
            "362S162-43",
            "362S162-54",
            "362S162-68",
            "362S200-33",
            "362S200-43",
            "362S200-54",
            "362S200-68",
            "400S137-33",
            "400S137-43",
            "400S137-54",
            "400S137-68",
            "400S162-33",
            "400S162-43",
            "400S162-54",
            "400S162-68",
            "400S200-33",
            "400S200-43",
            "400S200-54",
            "400S200-68",
            "550S162-33",
            "550S162-43",
            "550S162-54",
            "550S162-68",
            "600S137-33",
            "600S137-43",
            "600S137-54",
            "600S137-68",
            "600S137-97",
            "600S162-33",
            "600S162-43",
            "600S162-54",
            "600S162-68",
            "600S162-97",
            "600S200-33",
            "600S200-43",
            "600S200-54",
            "600S200-68",
            "600S200-97",
            "600S250-43",
            "600S250-54",
            "600S250-68",
            "600S250-97",
            "800S137-33*",
            "800S137-43",
            "800S137-54",
            "800S137-68",
            "800S137-97",
            "800S162-33*",
            "800S162-43",
            "800S162-54",
            "800S162-68",
            "800S162-97",
            "800S200-33*",
            "800S200-43",
            "800S200-54",
            "800S200-68",
            "800S200-97",
            "800S250-43",
            "800S250-54",
            "800S250-68",
            "800S250-97",
            "1000S162-43*",
            "1000S162-54",
            "1000S162-68",
            "1000S162-97",
            "1000S200-43*",
            "1000S200-54",
            "1000S200-68",
            "1000S200-97",
            "1000S250-43*",
            "1000S250-54",
            "1000S250-68",
            "1000S250-97",
            "1200S162-54*",
            "1200S162-68",
            "1200S162-97",
            "1200S200-54*",
            "1200S200-68",
            "1200S200-97",
            "1200S250-54*",
            "1200S250-68",
            "1200S250-97"
        ],
        "C-Sections WO Lips (I-3)": [
            "162T125-18",
            "162T125-27",
            "162T125-30",
            "162T125-33",
            "250T125-18",
            "250T125-27",
            "250T125-30",
            "250T125-33",
            "250T125-43",
            "250T125-54",
            "250T125-68",
            "250T150-27",
            "250T150-30",
            "250T150-33",
            "250T150-43",
            "250T150-54",
            "250T150-68",
            "250T200-33",
            "250T200-43",
            "250T200-54",
            "250T200-68",
            "350T125-18",
            "350T125-27",
            "350T125-30",
            "350T125-33",
            "350T125-43",
            "350T125-54",
            "350T125-68",
            "350T150-27",
            "350T150-30",
            "350T150-33",
            "350T150-43",
            "350T150-54",
            "350T150-68",
            "350T200-33",
            "350T200-43",
            "350T200-54",
            "350T200-68",
            "362T125-18",
            "362T125-27",
            "362T125-30",
            "362T125-33",
            "362T125-43",
            "362T125-54",
            "362T125-68",
            "362T150-27",
            "362T150-30",
            "362T150-33",
            "362T150-43",
            "362T150-54",
            "362T150-68",
            "362T200-33",
            "362T200-43",
            "362T200-54",
            "362T200-68",
            "400T125-18*",
            "400T125-27",
            "400T125-30",
            "400T125-33",
            "400T125-43",
            "400T125-54",
            "400T125-68",
            "400T150-27",
            "400T150-30",
            "400T150-33",
            "400T150-43",
            "400T150-54",
            "400T150-68",
            "400T200-33",
            "400T200-43",
            "400T200-54",
            "400T200-68",
            "550T125-27",
            "550T125-30",
            "550T125-33",
            "550T125-43",
            "550T125-54",
            "550T125-68",
            "550T150-27",
            "550T150-30",
            "550T150-33",
            "550T150-43",
            "550T150-54",
            "550T150-68",
            "550T200-33",
            "550T200-43",
            "550T200-54",
            "550T200-68",
            "600T125-27*",
            "600T125-30",
            "600T125-33",
            "600T125-43",
            "600T125-54",
            "600T125-68",
            "600T125-97",
            "600T150-27*",
            "600T150-30",
            "600T150-33",
            "600T150-43",
            "600T150-54",
            "600T150-68",
            "600T150-97",
            "600T200-33",
            "600T200-43",
            "600T200-54",
            "600T200-68",
            "600T200-97",
            "800T125-33*",
            "800T125-43",
            "800T125-54",
            "800T125-68",
            "800T125-97",
            "800T150-33*",
            "800T150-43",
            "800T150-54",
            "800T150-68",
            "800T150-97",
            "800T200-33*",
            "800T200-43",
            "800T200-54",
            "800T200-68",
            "800T200-97",
            "1000T125-43*",
            "1000T125-54",
            "1000T125-68",
            "1000T125-97",
            "1000T150-43*",
            "1000T150-54",
            "1000T150-68",
            "1000T150-97",
            "1000T200-43*",
            "1000T200-54",
            "1000T200-68",
            "1000T200-97",
            "1200T125-54*",
            "1200T125-68",
            "1200T125-97",
            "1200T150-54*",
            "1200T150-68",
            "1200T150-97",
            "1200T200-54*",
            "1200T200-68",
            "1200T200-97"
        ],
        "Z-Sections W Lips (I-4)": [
            "3.5ZS1.5x059",
            "3.5ZS1.5x065",
            "3.5ZS1.5x070",
            "4ZS2.25x059",
            "4ZS2.25x065",
            "4ZS2.25x070",
            "6ZS2.25x059",
            "6ZS2.25x065",
            "6ZS2.25x070",
            "6ZS2.25x085",
            "6ZS2.25x105",
            "7ZS2.25x059",
            "7ZS2.25x065",
            "7ZS2.25x070",
            "7ZS2.25x085",
            "7ZS2.25x105",
            "8ZS2.25x059",
            "8ZS2.25x065",
            "8ZS2.25x070",
            "8ZS2.25x085",
            "8ZS2.25x105",
            "8ZS2.75x059",
            "8ZS2.75x065",
            "8ZS2.75x070",
            "8ZS2.75x085",
            "8ZS2.75x105",
            "8ZS3.25x059",
            "8ZS3.25x065",
            "8ZS3.25x070",
            "8ZS3.25x085",
            "8ZS3.25x105",
            "9ZS2.25x059",
            "9ZS2.25x065",
            "9ZS2.25x070",
            "9ZS2.25x085",
            "9ZS2.25x105",
            "10ZS2.25x059",
            "10ZS2.25x065",
            "10ZS2.25x070",
            "10ZS2.25x085",
            "10ZS2.25x105",
            "10ZS2.75x059",
            "10ZS2.75x065",
            "10ZS2.75x070",
            "10ZS2.75x085",
            "10ZS2.75x105",
            "10ZS3.25x059",
            "10ZS3.25x065",
            "10ZS3.25x070",
            "10ZS3.25x085",
            "10ZS3.25x105",
            "12ZS2.25x070",
            "12ZS2.25x085",
            "12ZS2.25x105",
            "12ZS2.75x070",
            "12ZS2.75x085",
            "12ZS2.75x105",
            "12ZS3.25x070",
            "12ZS3.25x085",
            "12ZS3.25x105"
        ],
        "Z-Sections WO Lips (I-5)": [
            "1.5ZU1.25x036",
            "1.5ZU1.25x048",
            "1.5ZU1.25x060",
            "1.5ZU1.25x075",
            "1.5ZU1.25x090",
            "2.5ZU1.25x036",
            "2.5ZU1.25x048",
            "2.5ZU1.25x060",
            "2.5ZU1.25x075",
            "2.5ZU1.25x090",
            "3.625ZU1.25x036",
            "3.625ZU1.25x048",
            "3.625ZU1.25x060",
            "3.625ZU1.25x075",
            "3.625ZU1.25x090",
            "4ZU1.25x036",
            "4ZU1.25x048",
            "4ZU1.25x060",
            "4ZU1.25x075",
            "4ZU1.25x090",
            "6ZU1.25x048",
            "6ZU1.25x060",
            "6ZU1.25x075",
            "6ZU1.25x090",
            "6ZU1.25x105",
            "8ZU1.25x048",
            "8ZU1.25x060",
            "8ZU1.25x075",
            "8ZU1.25x090",
            "8ZU1.25x105"
        ],
        "EL Angles W Lips (I-6)": [
            "2.5LS2.5x060",
            "2.5LS2.5x075",
            "2.5LS2.5x090",
            "2.5LS2.5x105",
            "2.5LS2.5x135",
            "2LS2x060",
            "2LS2x075",
            "2LS2x090",
            "2LS2x105",
            "2LS2x135",
            "3LS3x060",
            "3LS3x075",
            "3LS3x090",
            "3LS3x105",
            "3LS3x135",
            "4LS4x060",
            "4LS4x075",
            "4LS4x090",
            "4LS4x105",
            "4LS4x135"
        ],
        "EL Angles WO Lips (I-7)": [
            "2.5LU2.5x060",
            "2.5LU2.5x075",
            "2.5LU2.5x090",
            "2.5LU2.5x105",
            "2.5LU2.5x135",
            "2LU2x060",
            "2LU2x075",
            "2LU2x090",
            "2LU2x105",
            "2LU2x135",
            "3LU3x060",
            "3LU3x075",
            "3LU3x090",
            "3LU3x105",
            "3LU3x135",
            "4LU4x060",
            "4LU4x075",
            "4LU4x090",
            "4LU4x105",
            "4LU4x135"
        ],
        "Hat Sections (I-8)": [
            "3HU3x075",
            "3HU3x105",
            "3HU4.5x105",
            "3HU4.5x135",
            "4HU2x048",
            "4HU2x060",
            "4HU2x075",
            "4HU4x075",
            "4HU4x105",
            "4HU6x105",
            "4HU6x135",
            "6HU3x048",
            "6HU3x060",
            "6HU3x075",
            "6HU6x075",
            "6HU6x105",
            "6HU9x105",
            "6HU9x135",
            "8HU4x060",
            "8HU4x075",
            "8HU8x075",
            "8HU8x105",
            "8HU12x105",
            "8HU12x135",
            "10HU5x075"
        ]
    }

    var NDS_sections = {
        "Sawn Lumber": [
            "1 x 3",
            "1 x 4",
            "1 x 6",
            "1 x 8",
            "1 x 10",
            "1 x 12",
            "2 x 3",
            "2 x 4",
            "2 x 5",
            "2 x 6",
            "2 x 8",
            "2 x 10",
            "2 x 12",
            "2 x 14",
            "3 x 4",
            "3 x 5",
            "3 x 6",
            "3 x 8",
            "3 x 10",
            "3 x 12",
            "3 x 14",
            "3 x 16",
            "4 x 4",
            "4 x 5",
            "4 x 6",
            "4 x 8",
            "4 x 10",
            "4 x 12",
            "4 x 14",
            "4 x 16",
            "5 x 5",
            "6 x 6",
            "6 x 8",
            "6 x 10",
            "6 x 12",
            "6 x 14",
            "6 x 16",
            "6 x 18",
            "6 x 20",
            "6 x 22",
            "6 x 24",
            "8 x 8",
            "8 x 10",
            "8 x 12",
            "8 x 14",
            "8 x 16",
            "8 x 18",
            "8 x 20",
            "8 x 22",
            "8 x 24",
            "10 x 10",
            "10 x 12",
            "10 x 14",
            "10 x 16",
            "10 x 18",
            "10 x 20",
            "10 x 22",
            "10 x 24",
            "12 x 12",
            "12 x 14",
            "12 x 16",
            "12 x 18",
            "12 x 20",
            "12 x 22",
            "12 x 24",
            "14 x 14",
            "14 x 16",
            "14 x 18",
            "14 x 20",
            "14 x 22",
            "14 x 24",
            "16 x 16",
            "16 x 18",
            "16 x 20",
            "16 x 22",
            "16 x 24",
            "18 x 18",
            "18 x 20",
            "18 x 22",
            "18 x 24",
            "20 x 20",
            "20 x 22",
            "20 x 24",
            "22 x 22",
            "22 x 24",
            "24 x 24"
        ],
        "Western Species Structural Glued Laminated Timber": [
            "2-1/2 x 6",
            "2-1/2 x 7-1/2",
            "2-1/2 x 9",
            "2-1/2 x 10-1/2",
            "2-1/2 x 12",
            "2-1/2 x 13-1/2",
            "2-1/2 x 15",
            "2-1/2 x 16-1/2",
            "2-1/2 x 18",
            "2-1/2 x 19-1/2",
            "2-1/2 x 21",
            "3-1/2 x 6",
            "3-1/2 x 7-1/2",
            "3-1/2 x 9",
            "3-1/2 x 9-1/2",
            "3-1/2 x 9-1/4",
            "3-1/2 x 10-1/2",
            "3-1/2 x 11-1/4",
            "3-1/2 x 11-7/8",
            "3-1/2 x 12",
            "3-1/2 x 13-1/2",
            "3-1/2 x 14",
            "3-1/2 x 15",
            "3-1/2 x 16",
            "3-1/2 x 16-1/2",
            "3-1/2 x 18",
            "3-1/2 x 19-1/2",
            "3-1/2 x 20",
            "3-1/2 x 21",
            "3-1/2 x 22",
            "3-1/2 x 22-1/2",
            "3-1/2 x 24",
            "3-1/8 x 6",
            "3-1/8 x 7-1/2",
            "3-1/8 x 9",
            "3-1/8 x 10-1/2",
            "3-1/8 x 12",
            "3-1/8 x 13-1/2",
            "3-1/8 x 15",
            "3-1/8 x 16-1/2",
            "3-1/8 x 18",
            "3-1/8 x 19-1/2",
            "3-1/8 x 21",
            "3-1/8 x 22-1/2",
            "3-1/8 x 24",
            "5-1/2 x 6",
            "5-1/2 x 7-1/2",
            "5-1/2 x 9",
            "5-1/2 x 9-1/2",
            "5-1/2 x 9-1/4",
            "5-1/2 x 10-1/2",
            "5-1/2 x 11-1/4",
            "5-1/2 x 11-7/8",
            "5-1/2 x 12",
            "5-1/2 x 13-1/2",
            "5-1/2 x 14",
            "5-1/2 x 15",
            "5-1/2 x 16",
            "5-1/2 x 16-1/2",
            "5-1/2 x 18",
            "5-1/2 x 19-1/2",
            "5-1/2 x 20",
            "5-1/2 x 21",
            "5-1/2 x 22",
            "5-1/2 x 22-1/2",
            "5-1/2 x 24",
            "5-1/2 x 25-1/2",
            "5-1/2 x 27",
            "5-1/2 x 28-1/2",
            "5-1/2 x 30",
            "5-1/2 x 31-1/2",
            "5-1/2 x 33",
            "5-1/2 x 34-1/2",
            "5-1/2 x 36",
            "6-3/4 x 7-1/2",
            "6-3/4 x 9",
            "6-3/4 x 10-1/2",
            "6-3/4 x 12",
            "6-3/4 x 13-1/2",
            "6-3/4 x 15",
            "6-3/4 x 16-1/2",
            "6-3/4 x 18",
            "6-3/4 x 19-1/2",
            "6-3/4 x 21",
            "6-3/4 x 22-1/2",
            "6-3/4 x 24",
            "6-3/4 x 25-1/2",
            "6-3/4 x 27",
            "6-3/4 x 28-1/2",
            "6-3/4 x 30",
            "6-3/4 x 31-1/2",
            "6-3/4 x 33",
            "6-3/4 x 34-1/2",
            "6-3/4 x 36",
            "6-3/4 x 37-1/2",
            "6-3/4 x 39",
            "6-3/4 x 40-1/2",
            "6-3/4 x 42",
            "6-3/4 x 43-1/2",
            "6-3/4 x 45",
            "6-3/4 x 46-1/2",
            "6-3/4 x 48",
            "6-3/4 x 49-1/2",
            "6-3/4 x 51",
            "6-3/4 x 52-1/2",
            "6-3/4 x 54",
            "6-3/4 x 55-1/2",
            "6-3/4 x 57",
            "6-3/4 x 58-1/2",
            "6-3/4 x 60",
            "10-3/4 x 9",
            "10-3/4 x 10-1/2",
            "10-3/4 x 12",
            "10-3/4 x 13-1/2",
            "10-3/4 x 15",
            "10-3/4 x 16-1/2",
            "10-3/4 x 18",
            "10-3/4 x 19-1/2",
            "10-3/4 x 21",
            "10-3/4 x 22-1/2",
            "10-3/4 x 24",
            "10-3/4 x 25-1/2",
            "10-3/4 x 27",
            "10-3/4 x 28-1/2",
            "10-3/4 x 30",
            "10-3/4 x 31-1/2",
            "10-3/4 x 33",
            "10-3/4 x 34-1/2",
            "10-3/4 x 36",
            "10-3/4 x 37-1/2",
            "10-3/4 x 39",
            "10-3/4 x 40-1/2",
            "10-3/4 x 42",
            "10-3/4 x 43-1/2",
            "10-3/4 x 45",
            "10-3/4 x 46-1/2",
            "10-3/4 x 48",
            "10-3/4 x 49-1/2",
            "10-3/4 x 51",
            "10-3/4 x 52-1/2",
            "10-3/4 x 54",
            "10-3/4 x 55-1/2",
            "10-3/4 x 57",
            "10-3/4 x 58-1/2",
            "10-3/4 x 60",
            "12-1/4 x 13-1/2",
            "12-1/4 x 15",
            "12-1/4 x 16-1/2",
            "12-1/4 x 18",
            "12-1/4 x 19-1/2",
            "12-1/4 x 21",
            "12-1/4 x 22-1/2",
            "12-1/4 x 24",
            "12-1/4 x 25-1/2",
            "12-1/4 x 27",
            "12-1/4 x 28-1/2",
            "12-1/4 x 30",
            "12-1/4 x 31-1/2",
            "12-1/4 x 33",
            "12-1/4 x 34-1/2",
            "12-1/4 x 36",
            "12-1/4 x 37-1/2",
            "12-1/4 x 39",
            "12-1/4 x 40-1/2",
            "12-1/4 x 42",
            "12-1/4 x 43-1/2",
            "12-1/4 x 45",
            "12-1/4 x 46-1/2",
            "12-1/4 x 48",
            "12-1/4 x 49-1/2",
            "12-1/4 x 51",
            "12-1/4 x 52-1/2",
            "12-1/4 x 54",
            "12-1/4 x 55-1/2",
            "12-1/4 x 57",
            "12-1/4 x 58-1/2",
            "12-1/4 x 60"
        ],
        "Southern Pine Structural Glued Laminated Timber": [
            "2-1/2 x 5-1/2",
            "2-1/2 x 6-7/8",
            "2-1/2 x 8-1/4",
            "2-1/2 x 9-5/8",
            "2-1/2 x 11",
            "2-1/2 x 12-3/8",
            "2-1/2 x 13-3/4",
            "2-1/2 x 15-1/8",
            "2-1/2 x 16-1/2",
            "2-1/2 x 17-7/8",
            "2-1/2 x 19-1/4",
            "2-1/2 x 20-5/8",
            "2-1/2 x 22",
            "2-1/2 x 23-3/8",
            "3 x 5-1/2",
            "3 x 6-7/8",
            "3 x 8-1/4",
            "3 x 9-5/8",
            "3 x 11",
            "3 x 12-3/8",
            "3 x 13-3/4",
            "3 x 15-1/8",
            "3 x 16-1/2",
            "3 x 17-7/8",
            "3 x 19-1/4",
            "3 x 20-5/8",
            "3 x 22",
            "3 x 23-3/8",
            "3-1/2 x 5-1/2",
            "3-1/2 x 6-7/8",
            "3-1/2 x 8-1/4",
            "3-1/2 x 9-1/2",
            "3-1/2 x 9-1/4",
            "3-1/2 x 9-5/8",
            "3-1/2 x 11",
            "3-1/2 x 11-1/4",
            "3-1/2 x 11-7/8",
            "3-1/2 x 12-3/8",
            "3-1/2 x 13-3/4",
            "3-1/2 x 14",
            "3-1/2 x 15-1/8",
            "3-1/2 x 16",
            "3-1/2 x 16-1/2",
            "3-1/2 x 17-7/8",
            "3-1/2 x 18",
            "3-1/2 x 19-1/4",
            "3-1/2 x 20",
            "3-1/2 x 20-5/8",
            "3-1/2 x 22",
            "3-1/2 x 23-3/8",
            "3-1/2 x 24",
            "3-1/8 x 5-1/2",
            "3-1/8 x 6-7/8",
            "3-1/8 x 8-1/4",
            "3-1/8 x 9-5/8",
            "3-1/8 x 11",
            "3-1/8 x 12-3/8",
            "3-1/8 x 13-3/4",
            "3-1/8 x 15-1/8",
            "3-1/8 x 16-1/2",
            "3-1/8 x 17-7/8",
            "3-1/8 x 19-1/4",
            "3-1/8 x 20-5/8",
            "3-1/8 x 22",
            "3-1/8 x 23-3/8",
            "5 x 6-7/8",
            "5 x 8-1/4",
            "5 x 9-5/8",
            "5 x 11",
            "5 x 12-3/8",
            "5 x 13-3/4",
            "5 x 15-1/8",
            "5 x 16-1/2",
            "5 x 17-7/8",
            "5 x 19-1/4",
            "5 x 20-5/8",
            "5 x 22",
            "5 x 23-3/8",
            "5 x 24-3/4",
            "5 x 26-1/8",
            "5 x 27-1/2",
            "5 x 28-7/8",
            "5 x 30-1/4",
            "5 x 31-5/8",
            "5 x 33",
            "5 x 34-3/8",
            "5 x 35-3/4",
            "5-1/2 x 6-7/8",
            "5-1/2 x 8-1/4",
            "5-1/2 x 9-1/2",
            "5-1/2 x 9-1/4",
            "5-1/2 x 9-5/8",
            "5-1/2 x 11",
            "5-1/2 x 11-1/4",
            "5-1/2 x 11-7/8",
            "5-1/2 x 12-3/8",
            "5-1/2 x 13-3/4",
            "5-1/2 x 14",
            "5-1/2 x 15-1/8",
            "5-1/2 x 16",
            "5-1/2 x 16-1/2",
            "5-1/2 x 17-7/8",
            "5-1/2 x 18",
            "5-1/2 x 19-1/4",
            "5-1/2 x 20",
            "5-1/2 x 20-5/8",
            "5-1/2 x 22",
            "5-1/2 x 23-3/8",
            "5-1/2 x 24",
            "5-1/2 x 24-3/4",
            "5-1/2 x 26-1/8",
            "5-1/2 x 27-1/2",
            "5-1/2 x 28-7/8",
            "5-1/2 x 30-1/4",
            "5-1/2 x 31-5/8",
            "5-1/2 x 33",
            "5-1/2 x 34-3/8",
            "5-1/2 x 35-3/4",
            "5-1/8 x 6-7/8",
            "5-1/8 x 8-1/4",
            "5-1/8 x 9-5/8",
            "5-1/8 x 11",
            "5-1/8 x 12-3/8",
            "5-1/8 x 13-3/4",
            "5-1/8 x 15-1/8",
            "5-1/8 x 16-1/2",
            "5-1/8 x 17-7/8",
            "5-1/8 x 19-1/4",
            "5-1/8 x 20-5/8",
            "5-1/8 x 22",
            "5-1/8 x 23-3/8",
            "5-1/8 x 24-3/4",
            "5-1/8 x 26-1/8",
            "5-1/8 x 27-1/2",
            "5-1/8 x 28-7/8",
            "5-1/8 x 30-1/4",
            "5-1/8 x 31-5/8",
            "5-1/8 x 33",
            "5-1/8 x 34-3/8",
            "5-1/8 x 35-3/4",
            "6-3/4 x 6-7/8",
            "6-3/4 x 8-1/4",
            "6-3/4 x 9-5/8",
            "6-3/4 x 11",
            "6-3/4 x 12-3/8",
            "6-3/4 x 13-3/4",
            "6-3/4 x 15-1/8",
            "6-3/4 x 16-1/2",
            "6-3/4 x 17-7/8",
            "6-3/4 x 19-1/4",
            "6-3/4 x 20-5/8",
            "6-3/4 x 22",
            "6-3/4 x 23-3/8",
            "6-3/4 x 24-3/4",
            "6-3/4 x 26-1/8",
            "6-3/4 x 27-1/2",
            "6-3/4 x 28-7/8",
            "6-3/4 x 30-1/4",
            "6-3/4 x 31-5/8",
            "6-3/4 x 33",
            "6-3/4 x 34-3/8",
            "6-3/4 x 35-3/4",
            "6-3/4 x 37-1/8",
            "6-3/4 x 38-1/2",
            "6-3/4 x 39-7/8",
            "6-3/4 x 41-1/4",
            "6-3/4 x 42-5/8",
            "6-3/4 x 44",
            "6-3/4 x 45-3/8",
            "6-3/4 x 46-3/4",
            "6-3/4 x 48-1/8",
            "6-3/4 x 49-1/2",
            "6-3/4 x 50-7/8",
            "6-3/4 x 52-1/4",
            "6-3/4 x 53-5/8",
            "6-3/4 x 55",
            "6-3/4 x 56-3/8",
            "6-3/4 x 57-3/4",
            "6-3/4 x 59-1/8",
            "6-3/4 x 60-1/2",
            "8-1/2 x 9-5/8",
            "8-1/2 x 11",
            "8-1/2 x 12-3/8",
            "8-1/2 x 13-3/4",
            "8-1/2 x 15-1/8",
            "8-1/2 x 16-1/2",
            "8-1/2 x 17-7/8",
            "8-1/2 x 19-1/4",
            "8-1/2 x 20-5/8",
            "8-1/2 x 22",
            "8-1/2 x 23-3/8",
            "8-1/2 x 24-3/4",
            "8-1/2 x 26-1/8",
            "8-1/2 x 27-1/2",
            "8-1/2 x 28-7/8",
            "8-1/2 x 30-1/4",
            "8-1/2 x 31-5/8",
            "8-1/2 x 33",
            "8-1/2 x 34-3/8",
            "8-1/2 x 35-3/4",
            "8-1/2 x 37-1/8",
            "8-1/2 x 38-1/2",
            "8-1/2 x 39-7/8",
            "8-1/2 x 41-1/4",
            "8-1/2 x 42-5/8",
            "8-1/2 x 44",
            "8-1/2 x 45-3/8",
            "8-1/2 x 46-3/4",
            "8-1/2 x 48-1/8",
            "8-1/2 x 49-1/2",
            "8-1/2 x 50-7/8",
            "8-1/2 x 52-1/4",
            "8-1/2 x 53-5/8",
            "8-1/2 x 55",
            "8-1/2 x 56-3/8",
            "8-1/2 x 57-3/4",
            "8-1/2 x 59-1/8",
            "8-1/2 x 60-1/2",
            "10-1/2 x 11",
            "10-1/2 x 12-3/8",
            "10-1/2 x 13-3/4",
            "10-1/2 x 15-1/8",
            "10-1/2 x 16-1/2",
            "10-1/2 x 17-7/8",
            "10-1/2 x 19-1/4",
            "10-1/2 x 20-5/8",
            "10-1/2 x 22",
            "10-1/2 x 23-3/8",
            "10-1/2 x 24-3/4",
            "10-1/2 x 26-1/8",
            "10-1/2 x 27-1/2",
            "10-1/2 x 28-7/8",
            "10-1/2 x 30-1/4",
            "10-1/2 x 31-5/8",
            "10-1/2 x 33",
            "10-1/2 x 34-3/8",
            "10-1/2 x 35-3/4",
            "10-1/2 x 37-1/8",
            "10-1/2 x 38-1/2",
            "10-1/2 x 39-7/8",
            "10-1/2 x 41-1/4",
            "10-1/2 x 42-5/8",
            "10-1/2 x 44",
            "10-1/2 x 45-3/8",
            "10-1/2 x 46-3/4",
            "10-1/2 x 48-1/8",
            "10-1/2 x 49-1/2",
            "10-1/2 x 50-7/8",
            "10-1/2 x 52-1/4",
            "10-1/2 x 53-5/8",
            "10-1/2 x 55",
            "10-1/2 x 56-3/8",
            "10-1/2 x 57-3/4",
            "10-1/2 x 59-1/8",
            "10-1/2 x 60-1/2"
        ]
    }
    
    functions.getAISI = function (){
        return AISI_sections
    }

    functions.getNDS = function (){
        return NDS_sections
    }

    return functions

})();
