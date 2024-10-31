
export const emailVerification = (email: string,title:string,link: string) =>{
	return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:700px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
	<!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body"
	style="background-color: #ecc9cf; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecc9cf;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
						role="presentation"
						style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5511b4; background-image: url(''); background-position: center top; background-repeat: no-repeat;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0"
										cellspacing="0" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;"
										width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1"
														style="height:40px;line-height:40px;font-size:1px;">&#8202;
													</div>
													<table class="image_block block-2" width="100%" border="0"
														cellpadding="0" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center"
																	style="line-height:10px">
																	<div style="max-width: 101px;"><a
																			href="http://www.example.com"
																			target="_blank" style="outline:none"
																			tabindex="-1"><img
																				src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1976/You_Logo.png"
																				style="display: block; height: auto; border: 0; width: 100%;"
																				width="101" alt="Logo" title="Logo"
																				height="auto"></a></div>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0"
														cellpadding="0" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad"
																style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
																<div
																	style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:30px;line-height:200%;text-align:center;mso-line-height-alt:60px;">
																	<p style="margin: 0; word-break: break-word;"><span
																			style="word-break: break-word;"><strong><span
																					style="word-break: break-word;">${email}</span></strong></span>
																	</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:42px;line-height:120%;text-align:center;mso-line-height-alt:96px;">
																	<p style="margin: 0; word-break: break-word;">
																		<strong><span
																				style="word-break: break-word;">${title}</span></strong></p>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="button_block block-5" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
														width="100%">
														<tbody>
															<tr>
																<td class="pad">
																	<div align="center" class="alignment"><!--[if mso]>
													<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:46px;width:201px;v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#181023">
													<w:anchorlock/>
													<v:textbox inset="0px,0px,0px,0px">
													<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:18px">
													<![endif]--><a href="${link}" style="background-color:#181023;border-bottom:0px solid #8a3b8f;border-left:0px solid #8a3b8f;border-radius:4px;border-right:0px solid #8a3b8f;border-top:0px solid #8a3b8f;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:18px;font-weight:undefined;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"
																			target="_blank"><span
																				style="word-break: break-word; padding-left: 55px; padding-right: 55px; font-size: 18px; display: inline-block; letter-spacing: normal;"><span
																					style="word-break: break-word;"><span
																						data-mce-style=""
																						style="word-break: break-word; line-height: 36px;">Click
																						Here</span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
								</td>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
	</td>
	</tr>
	</tbody>
	</table>
</body>

</html>`
}