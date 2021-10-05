var TINY_HOUSE = (function () {

	var viewer = null
	var s3d_model = null
	var functions = {}


	s3d_model = {
		"dataVersion": 22,
		"settings": {
			"units": {
				"length": "ft",
				"section_length": "in",
				"material_strength": "ksi",
				"density": "lb/ft3",
				"force": "kip",
				"moment": "kip-ft",
				"pressure": "ksf",
				"mass": "kip",
				"translation": "in",
				"stress": "ksi"
			},
			"precision": "fixed",
			"precision_values": 3,
			"evaluation_points": 9,
			"vertical_axis": "Y",
			"projection_system": "orthographic",
			"solver_timeout": 600,
			"accurate_buckling_shape": false,
			"buckling_johnson": false,
			"non_linear_tolerance": "1",
			"non_linear_theory": "small",
			"auto_stabilize_model": false
		},
		"details": {},
		"nodes": {
			"1": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"2": {
				"x": 15,
				"y": 0,
				"z": 0
			},
			"3": {
				"x": 30,
				"y": 0,
				"z": 0
			},
			"4": {
				"x": 0,
				"y": 10,
				"z": 0
			},
			"5": {
				"x": 15,
				"y": 10,
				"z": 0
			},
			"6": {
				"x": 30,
				"y": 10,
				"z": 0
			},
			"7": {
				"x": 0,
				"y": 0,
				"z": 15
			},
			"8": {
				"x": 15,
				"y": 0,
				"z": 15
			},
			"9": {
				"x": 30,
				"y": 0,
				"z": 15
			},
			"10": {
				"x": 0,
				"y": 10,
				"z": 15
			},
			"11": {
				"x": 15,
				"y": 10,
				"z": 15
			},
			"12": {
				"x": 30,
				"y": 10,
				"z": 15
			},
			"13": {
				"x": 0,
				"y": 0,
				"z": 30
			},
			"14": {
				"x": 15,
				"y": 0,
				"z": 30
			},
			"15": {
				"x": 30,
				"y": 0,
				"z": 30
			},
			"16": {
				"x": 0,
				"y": 10,
				"z": 30
			},
			"17": {
				"x": 15,
				"y": 10,
				"z": 30
			},
			"18": {
				"x": 30,
				"y": 10,
				"z": 30
			},
			"29": {
				"x": 15,
				"y": 10,
				"z": 25
			},
			"30": {
				"x": 0,
				"y": 10,
				"z": 25
			},
			"31": {
				"x": 15,
				"y": 10,
				"z": 20
			},
			"32": {
				"x": 0,
				"y": 10,
				"z": 20
			},
			"33": {
				"x": 15,
				"y": 10,
				"z": 10
			},
			"34": {
				"x": 0,
				"y": 10,
				"z": 10
			},
			"35": {
				"x": 15,
				"y": 10,
				"z": 5
			},
			"36": {
				"x": 0,
				"y": 10,
				"z": 5
			},
			"37": {
				"x": 30,
				"y": 10,
				"z": 25
			},
			"38": {
				"x": 30,
				"y": 10,
				"z": 20
			},
			"41": {
				"x": 30,
				"y": 10,
				"z": 10
			},
			"42": {
				"x": 30,
				"y": 10,
				"z": 5
			}
		},
		"members": {
			"1": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 1,
				"node_B": 4,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"2": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 7,
				"node_B": 10,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"3": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 4,
				"node_B": 5,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"4": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 5,
				"node_B": 6,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"5": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 6,
				"node_B": 3,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"6": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 2,
				"node_B": 5,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"7": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 17,
				"node_B": 16,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"8": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 15,
				"node_B": 12,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"9": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 12,
				"node_B": 9,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"10": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 8,
				"node_B": 11,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"11": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 13,
				"node_B": 16,
				"section_id": 3,
				"rotation_angle": 90,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"12": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 29,
				"node_B": 30,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"13": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 18,
				"node_B": 9,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"14": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 18,
				"node_B": 15,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"15": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 14,
				"node_B": 17,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"16": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 11,
				"node_B": 17,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"17": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 9,
				"node_B": 6,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"18": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 10,
				"node_B": 16,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"19": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 4,
				"node_B": 10,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"20": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 5,
				"node_B": 11,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"21": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 6,
				"node_B": 12,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"22": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 3,
				"node_B": 12,
				"section_id": 3,
				"rotation_angle": 0,
				"fixity_A": "FFFFFF",
				"fixity_B": "FFFFFF",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"28": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 12,
				"node_B": 18,
				"section_id": 2,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"30": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 31,
				"node_B": 32,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"32": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 11,
				"node_B": 10,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"34": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 33,
				"node_B": 34,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"35": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 35,
				"node_B": 36,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"36": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 17,
				"node_B": 18,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"37": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 29,
				"node_B": 37,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"39": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 31,
				"node_B": 38,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"41": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 11,
				"node_B": 12,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"43": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 33,
				"node_B": 41,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			},
			"44": {
				"type": "normal_continuous",
				"cable_length": null,
				"node_A": 35,
				"node_B": 42,
				"section_id": 1,
				"rotation_angle": 0,
				"fixity_A": "FFFFRR",
				"fixity_B": "FFFFRR",
				"offset_Ax": "0",
				"offset_Ay": "0",
				"offset_Az": "0",
				"offset_Bx": "0",
				"offset_By": "0",
				"offset_Bz": "0"
			}
		},
		"plates": {},
		"meshed_plates": {},
		"sections": {
			"1": {
				"version": 3,
				"name": "W21x48",
				"area": 14.1000003815,
				"Iz": 959,
				"Iy": 38.7000007629,
				"material_id": 1,
				"aux": {
					"composite": false,
					"Qz": 53.49157,
					"Qy": 7.45953,
					"centroid_point": [
						4.07,
						10.3
					],
					"centroid_length": [
						4.07,
						10.3
					],
					"depth": 20.6,
					"width": 8.14,
					"alpha": 0,
					"Zy": 14.8999996185,
					"Zz": 107,
					"polygons": [
						{
							"name": "W21x48",
							"group_id": 0,
							"points_calc": [
								[
									0,
									0,
									"regular"
								],
								[
									8.14,
									0,
									"regular"
								],
								[
									8.14,
									0.43,
									"regular"
								],
								[
									4.745,
									0.43,
									"filletStartEnd"
								],
								[
									4.55365828382,
									0.468060233744,
									"dontShow"
								],
								[
									4.39144660941,
									0.576446609407,
									"dontShow"
								],
								[
									4.28306023374,
									0.738658283817,
									"dontShow"
								],
								[
									4.245,
									0.93,
									"filletStartEnd"
								],
								[
									4.245,
									19.67,
									"filletStartEnd"
								],
								[
									4.28306023374,
									19.8613417162,
									"dontShow"
								],
								[
									4.39144660941,
									20.0235533906,
									"dontShow"
								],
								[
									4.55365828382,
									20.1319397663,
									"dontShow"
								],
								[
									4.745,
									20.17,
									"filletStartEnd"
								],
								[
									8.14,
									20.17,
									"regular"
								],
								[
									8.14,
									20.6,
									"regular"
								],
								[
									0,
									20.6,
									"regular"
								],
								[
									0,
									20.17,
									"regular"
								],
								[
									3.395,
									20.17,
									"filletStartEnd"
								],
								[
									3.58634171618,
									20.1319397663,
									"dontShow"
								],
								[
									3.74855339059,
									20.0235533906,
									"dontShow"
								],
								[
									3.85693976626,
									19.8613417162,
									"dontShow"
								],
								[
									3.895,
									19.67,
									"filletStartEnd"
								],
								[
									3.895,
									0.93,
									"filletStartEnd"
								],
								[
									3.85693976626,
									0.738658283817,
									"dontShow"
								],
								[
									3.74855339059,
									0.576446609407,
									"dontShow"
								],
								[
									3.58634171618,
									0.468060233744,
									"dontShow"
								],
								[
									3.395,
									0.43,
									"filletStartEnd"
								],
								[
									0,
									0.43,
									"regular"
								]
							],
							"points_custom_orig": [],
							"shape": "ibeam",
							"dimensions_show": true,
							"dimensions": {
								"TFw": {
									"value": 8.14,
									"locat": [
										[
											0,
											22.66
										],
										[
											8.14,
											22.66
										],
										{
											"placeholder": "Top Width",
											"dimension_id": "TFw",
											"dimension": 8.14
										}
									]
								},
								"TFt": {
									"value": 0.43,
									"locat": [
										[
											-2.06,
											20.6
										],
										[
											-2.06,
											20.17
										],
										{
											"placeholder": "Top Thickness",
											"dimension_id": "TFt",
											"dimension": 0.43
										}
									]
								},
								"BFw": {
									"value": 8.14,
									"locat": [
										[
											0,
											-4.12
										],
										[
											8.14,
											-4.12
										],
										{
											"placeholder": "Bottom Width",
											"dimension_id": "BFw",
											"dimension": 8.14
										}
									]
								},
								"BFt": {
									"value": 0.43,
									"locat": [
										[
											-2.06,
											0.43
										],
										[
											-2.06,
											0
										],
										{
											"placeholder": "Bottom Thickness",
											"dimension_id": "BFt",
											"dimension": 0.43
										}
									]
								},
								"h": {
									"value": 20.6,
									"locat": [
										[
											10.2,
											0
										],
										[
											10.2,
											20.6
										],
										{
											"placeholder": "Height",
											"dimension_id": "h",
											"dimension": 20.6
										}
									]
								},
								"Wt": {
									"value": 0.35,
									"locat": [
										[
											3.895,
											-2.06
										],
										[
											4.245,
											-2.06
										],
										{
											"placeholder": "Web Thickness",
											"dimension_id": "Wt",
											"dimension": 0.35
										}
									]
								}
							},
							"operations": {
								"rotation": 0,
								"translation": [
									0,
									0
								],
								"mirror_z": false,
								"mirror_y": false,
								"fillet_radius": 0.5
							},
							"cutout": false,
							"material": {
								"id": 1,
								"name": "Structural Steel",
								"density": 490,
								"elasticity_modulus": 29000,
								"poissons_ratio": 0.27,
								"yield_strength": 38,
								"ultimate_strength": 60,
								"class": "steel"
							},
							"type": "library",
							"library_selections": [
								"American",
								"AISC",
								"W shapes",
								"W21x48"
							],
							"results": {
								"T": 18.375,
								"kdes": 0.93,
								"A": 14.1000003815,
								"J": 0.802999973297,
								"Iyp": 38.7000007629,
								"Izp": 959,
								"Iy": 0,
								"Iz": 0,
								"Alpha": 0,
								"Cy": 0,
								"Cz": 0,
								"ry": 0,
								"rz": 0,
								"ryp": 0,
								"rzp": 0,
								"Iw": 3950,
								"Syp": 14.8999996185,
								"Szp": 107,
								"basis": {
									"shape": "ibeam",
									"dimensions": {
										"h": 20.6,
										"TFw": 8.14,
										"TFt": 0.43,
										"BFw": 8.14,
										"BFt": 0.43,
										"Wt": 0.35,
										"r": 0.5
									},
									"operations": {
										"rotation": 0,
										"mirror_z": false,
										"mirror_y": false,
										"translation": [
											0,
											0
										]
									}
								}
							},
							"points_centroid_shifted": [
								[
									-4.07,
									-10.3,
									"regular"
								],
								[
									4.07,
									-10.3,
									"regular"
								],
								[
									4.07,
									-9.87,
									"regular"
								],
								[
									0.675,
									-9.87,
									"filletStartEnd"
								],
								[
									0.175,
									-9.37,
									"filletStartEnd"
								],
								[
									0.175,
									9.37,
									"filletStartEnd"
								],
								[
									0.675,
									9.87,
									"filletStartEnd"
								],
								[
									4.07,
									9.87,
									"regular"
								],
								[
									4.07,
									10.3,
									"regular"
								],
								[
									-4.07,
									10.3,
									"regular"
								],
								[
									-4.07,
									9.87,
									"regular"
								],
								[
									-0.675,
									9.87,
									"filletStartEnd"
								],
								[
									-0.175,
									9.37,
									"filletStartEnd"
								],
								[
									-0.175,
									-9.37,
									"filletStartEnd"
								],
								[
									-0.675,
									-9.87,
									"filletStartEnd"
								],
								[
									-4.07,
									-9.87,
									"regular"
								]
							]
						}
					],
					"warping_constant": 3950,
					"shear_area_z": 6.2339951958,
					"shear_area_y": 6.92481309761,
					"torsion_radius": 0.649877
				},
				"J": 0.802999973297
			},
			"2": {
				"version": 3,
				"name": "W24x84",
				"area": 24.7000007629,
				"Iz": 2370,
				"Iy": 94.4000015259,
				"material_id": 1,
				"aux": {
					"composite": false,
					"Qz": 112.22863,
					"Qy": 16.3262,
					"centroid_point": [
						4.51,
						12.05
					],
					"centroid_length": [
						4.51,
						12.05
					],
					"depth": 24.1,
					"width": 9.02,
					"alpha": 0,
					"Zy": 32.5999984741,
					"Zz": 224,
					"polygons": [
						{
							"name": "W24x84",
							"group_id": 0,
							"points_calc": [
								[
									0,
									0,
									"regular"
								],
								[
									9.02,
									0,
									"regular"
								],
								[
									9.02,
									0.77,
									"regular"
								],
								[
									5.245,
									0.77,
									"filletStartEnd"
								],
								[
									5.05365828382,
									0.808060233744,
									"dontShow"
								],
								[
									4.89144660941,
									0.916446609407,
									"dontShow"
								],
								[
									4.78306023374,
									1.07865828382,
									"dontShow"
								],
								[
									4.745,
									1.27,
									"filletStartEnd"
								],
								[
									4.745,
									22.83,
									"filletStartEnd"
								],
								[
									4.78306023374,
									23.0213417162,
									"dontShow"
								],
								[
									4.89144660941,
									23.1835533906,
									"dontShow"
								],
								[
									5.05365828382,
									23.2919397663,
									"dontShow"
								],
								[
									5.245,
									23.33,
									"filletStartEnd"
								],
								[
									9.02,
									23.33,
									"regular"
								],
								[
									9.02,
									24.1,
									"regular"
								],
								[
									0,
									24.1,
									"regular"
								],
								[
									0,
									23.33,
									"regular"
								],
								[
									3.775,
									23.33,
									"filletStartEnd"
								],
								[
									3.96634171618,
									23.2919397663,
									"dontShow"
								],
								[
									4.12855339059,
									23.1835533906,
									"dontShow"
								],
								[
									4.23693976626,
									23.0213417162,
									"dontShow"
								],
								[
									4.275,
									22.83,
									"filletStartEnd"
								],
								[
									4.275,
									1.27,
									"filletStartEnd"
								],
								[
									4.23693976626,
									1.07865828382,
									"dontShow"
								],
								[
									4.12855339059,
									0.916446609407,
									"dontShow"
								],
								[
									3.96634171618,
									0.808060233744,
									"dontShow"
								],
								[
									3.775,
									0.77,
									"filletStartEnd"
								],
								[
									0,
									0.77,
									"regular"
								]
							],
							"points_custom_orig": [],
							"shape": "ibeam",
							"dimensions_show": true,
							"dimensions": {
								"TFw": {
									"value": 9.02,
									"locat": [
										[
											0,
											26.51
										],
										[
											9.02,
											26.51
										],
										{
											"placeholder": "Top Width",
											"dimension_id": "TFw",
											"dimension": 9.02
										}
									]
								},
								"TFt": {
									"value": 0.77,
									"locat": [
										[
											-2.41,
											24.1
										],
										[
											-2.41,
											23.33
										],
										{
											"placeholder": "Top Thickness",
											"dimension_id": "TFt",
											"dimension": 0.77
										}
									]
								},
								"BFw": {
									"value": 9.02,
									"locat": [
										[
											0,
											-4.82
										],
										[
											9.02,
											-4.82
										],
										{
											"placeholder": "Bottom Width",
											"dimension_id": "BFw",
											"dimension": 9.02
										}
									]
								},
								"BFt": {
									"value": 0.77,
									"locat": [
										[
											-2.41,
											0.77
										],
										[
											-2.41,
											0
										],
										{
											"placeholder": "Bottom Thickness",
											"dimension_id": "BFt",
											"dimension": 0.77
										}
									]
								},
								"h": {
									"value": 24.1,
									"locat": [
										[
											11.43,
											0
										],
										[
											11.43,
											24.1
										],
										{
											"placeholder": "Height",
											"dimension_id": "h",
											"dimension": 24.1
										}
									]
								},
								"Wt": {
									"value": 0.47,
									"locat": [
										[
											4.275,
											-2.41
										],
										[
											4.745,
											-2.41
										],
										{
											"placeholder": "Web Thickness",
											"dimension_id": "Wt",
											"dimension": 0.47
										}
									]
								}
							},
							"operations": {
								"rotation": 0,
								"translation": [
									0,
									0
								],
								"mirror_z": false,
								"mirror_y": false,
								"fillet_radius": 0.5
							},
							"cutout": false,
							"material": {
								"id": 1,
								"name": "Structural Steel",
								"density": 490,
								"elasticity_modulus": 29000,
								"poissons_ratio": 0.27,
								"yield_strength": 38,
								"ultimate_strength": 60,
								"class": "steel"
							},
							"type": "library",
							"library_selections": [
								"American",
								"AISC",
								"W shapes",
								"W24x84"
							],
							"results": {
								"T": 20.75,
								"kdes": 1.27,
								"A": 24.7000007629,
								"J": 3.70000004768,
								"Iyp": 94.4000015259,
								"Izp": 2370,
								"Iy": 0,
								"Iz": 0,
								"Alpha": 0,
								"Cy": 0,
								"Cz": 0,
								"ry": 0,
								"rz": 0,
								"ryp": 0,
								"rzp": 0,
								"Iw": 12800,
								"Syp": 32.5999984741,
								"Szp": 224,
								"basis": {
									"shape": "ibeam",
									"dimensions": {
										"h": 24.1,
										"TFw": 9.02,
										"TFt": 0.77,
										"BFw": 9.02,
										"BFt": 0.77,
										"Wt": 0.47,
										"r": 0.5
									},
									"operations": {
										"rotation": 0,
										"mirror_z": false,
										"mirror_y": false,
										"translation": [
											0,
											0
										]
									}
								}
							},
							"points_centroid_shifted": [
								[
									-4.51,
									-12.05,
									"regular"
								],
								[
									4.51,
									-12.05,
									"regular"
								],
								[
									4.51,
									-11.28,
									"regular"
								],
								[
									0.735,
									-11.28,
									"filletStartEnd"
								],
								[
									0.235,
									-10.78,
									"filletStartEnd"
								],
								[
									0.235,
									10.78,
									"filletStartEnd"
								],
								[
									0.735,
									11.28,
									"filletStartEnd"
								],
								[
									4.51,
									11.28,
									"regular"
								],
								[
									4.51,
									12.05,
									"regular"
								],
								[
									-4.51,
									12.05,
									"regular"
								],
								[
									-4.51,
									11.28,
									"regular"
								],
								[
									-0.735,
									11.28,
									"filletStartEnd"
								],
								[
									-0.235,
									10.78,
									"filletStartEnd"
								],
								[
									-0.235,
									-10.78,
									"filletStartEnd"
								],
								[
									-0.735,
									-11.28,
									"filletStartEnd"
								],
								[
									-4.51,
									-11.28,
									"regular"
								]
							]
						}
					],
					"warping_constant": 12800,
					"shear_area_z": 12.1159829299,
					"shear_area_y": 10.8957683428,
					"torsion_radius": 1.13702
				},
				"J": 3.70000004768
			},
			"3": {
				"version": 3,
				"name": "W12x45",
				"area": 13.1000003815,
				"Iz": 348,
				"Iy": 50,
				"material_id": 1,
				"aux": {
					"composite": false,
					"Qz": 32.34768,
					"Qy": 9.50408,
					"centroid_point": [
						4.025,
						6.05
					],
					"centroid_length": [
						4.025,
						6.05
					],
					"depth": 12.1,
					"width": 8.05,
					"alpha": 0,
					"Zy": 19,
					"Zz": 64.1999969482,
					"polygons": [
						{
							"name": "W12x45",
							"group_id": 0,
							"points_calc": [
								[
									0,
									0,
									"regular"
								],
								[
									8.05,
									0,
									"regular"
								],
								[
									8.05,
									0.575,
									"regular"
								],
								[
									4.7025,
									0.575,
									"filletStartEnd"
								],
								[
									4.50733144949,
									0.613821438419,
									"dontShow"
								],
								[
									4.34187554159,
									0.724375541595,
									"dontShow"
								],
								[
									4.23132143842,
									0.889831449494,
									"dontShow"
								],
								[
									4.1925,
									1.085,
									"filletStartEnd"
								],
								[
									4.1925,
									11.015,
									"filletStartEnd"
								],
								[
									4.23132143842,
									11.2101685505,
									"dontShow"
								],
								[
									4.34187554159,
									11.3756244584,
									"dontShow"
								],
								[
									4.50733144949,
									11.4861785616,
									"dontShow"
								],
								[
									4.7025,
									11.525,
									"filletStartEnd"
								],
								[
									8.05,
									11.525,
									"regular"
								],
								[
									8.05,
									12.1,
									"regular"
								],
								[
									0,
									12.1,
									"regular"
								],
								[
									0,
									11.525,
									"regular"
								],
								[
									3.3475,
									11.525,
									"filletStartEnd"
								],
								[
									3.54266855051,
									11.4861785616,
									"dontShow"
								],
								[
									3.70812445841,
									11.3756244584,
									"dontShow"
								],
								[
									3.81867856158,
									11.2101685505,
									"dontShow"
								],
								[
									3.8575,
									11.015,
									"filletStartEnd"
								],
								[
									3.8575,
									1.085,
									"filletStartEnd"
								],
								[
									3.81867856158,
									0.889831449494,
									"dontShow"
								],
								[
									3.70812445841,
									0.724375541595,
									"dontShow"
								],
								[
									3.54266855051,
									0.613821438419,
									"dontShow"
								],
								[
									3.3475,
									0.575,
									"filletStartEnd"
								],
								[
									0,
									0.575,
									"regular"
								]
							],
							"points_custom_orig": [],
							"shape": "ibeam",
							"dimensions_show": true,
							"dimensions": {
								"TFw": {
									"value": 8.05,
									"locat": [
										[
											0,
											13.31
										],
										[
											8.05,
											13.31
										],
										{
											"placeholder": "Top Width",
											"dimension_id": "TFw",
											"dimension": 8.05
										}
									]
								},
								"TFt": {
									"value": 0.575,
									"locat": [
										[
											-1.21,
											12.1
										],
										[
											-1.21,
											11.525
										],
										{
											"placeholder": "Top Thickness",
											"dimension_id": "TFt",
											"dimension": 0.575
										}
									]
								},
								"BFw": {
									"value": 8.05,
									"locat": [
										[
											0,
											-2.42
										],
										[
											8.05,
											-2.42
										],
										{
											"placeholder": "Bottom Width",
											"dimension_id": "BFw",
											"dimension": 8.05
										}
									]
								},
								"BFt": {
									"value": 0.575,
									"locat": [
										[
											-1.21,
											0.575
										],
										[
											-1.21,
											0
										],
										{
											"placeholder": "Bottom Thickness",
											"dimension_id": "BFt",
											"dimension": 0.575
										}
									]
								},
								"h": {
									"value": 12.1,
									"locat": [
										[
											9.26,
											0
										],
										[
											9.26,
											12.1
										],
										{
											"placeholder": "Height",
											"dimension_id": "h",
											"dimension": 12.1
										}
									]
								},
								"Wt": {
									"value": 0.335,
									"locat": [
										[
											3.8575,
											-1.21
										],
										[
											4.1925,
											-1.21
										],
										{
											"placeholder": "Web Thickness",
											"dimension_id": "Wt",
											"dimension": 0.335
										}
									]
								}
							},
							"operations": {
								"rotation": 0,
								"translation": [
									0,
									0
								],
								"mirror_z": false,
								"mirror_y": false,
								"fillet_radius": 0.51
							},
							"cutout": false,
							"material": {
								"id": 1,
								"name": "Structural Steel",
								"density": 490,
								"elasticity_modulus": 29000,
								"poissons_ratio": 0.27,
								"yield_strength": 38,
								"ultimate_strength": 60,
								"class": "steel"
							},
							"type": "library",
							"library_selections": [
								"American",
								"AISC",
								"W shapes",
								"W12x45"
							],
							"results": {
								"T": 9.25,
								"kdes": 1.08,
								"A": 13.1000003815,
								"J": 1.25999999046,
								"Iyp": 50,
								"Izp": 348,
								"Iy": 0,
								"Iz": 0,
								"Alpha": 0,
								"Cy": 0,
								"Cz": 0,
								"ry": 0,
								"rz": 0,
								"ryp": 0,
								"rzp": 0,
								"Iw": 1650,
								"Syp": 19,
								"Szp": 64.1999969482,
								"basis": {
									"shape": "ibeam",
									"dimensions": {
										"h": 12.1,
										"TFw": 8.05,
										"TFt": 0.575,
										"BFw": 8.05,
										"BFt": 0.575,
										"Wt": 0.335,
										"r": 0.51
									},
									"operations": {
										"rotation": 0,
										"mirror_z": false,
										"mirror_y": false,
										"translation": [
											0,
											0
										]
									}
								}
							},
							"points_centroid_shifted": [
								[
									-4.025,
									-6.05,
									"regular"
								],
								[
									4.025,
									-6.05,
									"regular"
								],
								[
									4.025,
									-5.475,
									"regular"
								],
								[
									0.6775,
									-5.475,
									"filletStartEnd"
								],
								[
									0.1675,
									-4.965,
									"filletStartEnd"
								],
								[
									0.1675,
									4.965,
									"filletStartEnd"
								],
								[
									0.6775,
									5.475,
									"filletStartEnd"
								],
								[
									4.025,
									5.475,
									"regular"
								],
								[
									4.025,
									6.05,
									"regular"
								],
								[
									-4.025,
									6.05,
									"regular"
								],
								[
									-4.025,
									5.475,
									"regular"
								],
								[
									-0.6775,
									5.475,
									"filletStartEnd"
								],
								[
									-0.1675,
									4.965,
									"filletStartEnd"
								],
								[
									-0.1675,
									-4.965,
									"filletStartEnd"
								],
								[
									-0.6775,
									-5.475,
									"filletStartEnd"
								],
								[
									-4.025,
									-5.475,
									"regular"
								]
							]
						}
					],
					"warping_constant": 1650,
					"shear_area_z": 8.11289140224,
					"shear_area_y": 3.88830988618,
					"torsion_radius": 0.86188
				},
				"J": 1.25999999046
			}
		},
		"materials": {
			"1": {
				"id": 1,
				"name": "Structural Steel",
				"density": 490,
				"elasticity_modulus": 29000,
				"poissons_ratio": 0.27,
				"yield_strength": 38,
				"ultimate_strength": 60,
				"class": "steel"
			},
			"2": {
				"id": 2,
				"name": "Aluminium",
				"density": 167,
				"elasticity_modulus": 10000,
				"poissons_ratio": 0.32,
				"yield_strength": 15,
				"ultimate_strength": 22,
				"class": "aluminium"
			},
			"3": {
				"id": 3,
				"name": "Carbon Fibre Reinforced Plastic",
				"density": 200,
				"elasticity_modulus": 21800,
				"poissons_ratio": 0.2,
				"yield_strength": null,
				"ultimate_strength": 460,
				"class": "other"
			},
			"4": {
				"id": 4,
				"name": "Concrete",
				"density": 150,
				"elasticity_modulus": 2500,
				"poissons_ratio": 0.2,
				"yield_strength": null,
				"ultimate_strength": 0.5,
				"class": "concrete"
			},
			"5": {
				"id": 5,
				"name": "Concrete High Strength",
				"density": 150,
				"elasticity_modulus": 4400,
				"poissons_ratio": 0.2,
				"yield_strength": null,
				"ultimate_strength": 0.75,
				"class": "concrete"
			},
			"6": {
				"id": 6,
				"name": "Oakwood",
				"density": 56,
				"elasticity_modulus": 1600,
				"poissons_ratio": 0.3,
				"yield_strength": 0.65,
				"ultimate_strength": 0.75,
				"class": "wood"
			},
			"7": {
				"id": 7,
				"name": "Glass",
				"density": 160,
				"elasticity_modulus": 10000,
				"poissons_ratio": 0.24,
				"yield_strength": null,
				"ultimate_strength": 4.8,
				"class": "other"
			},
			"8": {
				"name": "ASTM - ASTM A992 - Structural Steel Alloy - Standard",
				"elasticity_modulus": 29000,
				"density": 490,
				"poissons_ratio": 0.29,
				"yield_strength": 50,
				"ultimate_strength": 65,
				"class": "steel",
				"aux": {
					"units": {
						"E": "material_strength",
						"density": "density",
						"Fu": "material_strength",
						"Fy": "material_strength",
						"alpha": "thermal_expansion",
						"v": null
					},
					"selections": [
						"Imperial",
						"Steel",
						"ASTM",
						"ASTM A992",
						"Structural Steel Alloy",
						"Standard"
					]
				}
			}
		},
		"supports": {
			"1": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 1,
				"restraint_code": "FFFFFF"
			},
			"2": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 2,
				"restraint_code": "FFFFFF"
			},
			"3": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 3,
				"restraint_code": "FFFFFF"
			},
			"4": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 7,
				"restraint_code": "FFFFFF"
			},
			"5": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 8,
				"restraint_code": "FFFFFF"
			},
			"6": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 9,
				"restraint_code": "FFFFFF"
			},
			"7": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 13,
				"restraint_code": "FFFFFF"
			},
			"8": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 14,
				"restraint_code": "FFFFFF"
			},
			"9": {
				"tx": 0,
				"ty": 0,
				"tz": 0,
				"rx": 0,
				"ry": 0,
				"rz": 0,
				"node": 15,
				"restraint_code": "FFFFFF"
			}
		},
		"settlements": {},
		"point_loads": {},
		"moments": {},
		"distributed_loads": {},
		"pressures": {},
		"area_loads": {
			"2": {
				"type": "one_way",
				"nodes": "16,4,6,18",
				"members": 0,
				"mag": -1,
				"direction": "Y",
				"elevations": 0,
				"mags": "0",
				"column_direction": "18,16",
				"loaded_members_axis": "all",
				"LG": "Dead Load"
			}
		},
		"member_prestress_loads": {},
		"self_weight": {
			"1": {
				"x": 0,
				"y": -1,
				"z": 0,
				"LG": "SW1"
			}
		},
		"load_combinations": {},
		"load_cases": {
			"AISC": {
				"SW1": "Dead: dead",
				"Live Load": "Live: live",
				"Snow Load": "Snow: snow"
			}
		},
		"nodal_masses": {},
		"nodal_masses_conversion_map": {},
		"spectral_loads": {}
	}

	functions.init = function () {
		viewer = new SKYCIV.renderer({
			container_selector: '#renderer-container',
		});
	
		viewer.model.set(s3d_model);
		viewer.model.buildStructure();
		viewer.render();
	}
 

	functions.getViewer = function () {
		return viewer
	}
	


	return functions;

})();