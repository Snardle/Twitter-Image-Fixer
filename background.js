
// Listen for onHeadersReceived events to fix headers and redirect to :orig if needed
browser.webRequest.onHeadersReceived.addListener(
	(req) =>
	{
		// Extract the original filename from the URL
		const filename = req.url.match(/^https\:\/\/.*\/(.*?)(?:\:.*)?$/)[ 1 ] || req.url;

		// Return a webRequest.BlockingResponse object specifying the missing header and any redirects
		return {
			responseHeaders: [
				// Include response headers from the request
				...(req.responseHeaders),

				// Add the Content-Disposition header to specify behavior and a proper filename
				{
					name: 'Content-Disposition',

					// In the case of a main_frame request (e.g. navigating to the URL),
					// the image needs to be marked as an inline image, otherwise a download is started.
					value: `${req.type === 'image' ? 'attachment' : 'inline'}; filename="${filename}"`,
				},
			],

			// Ensure that the URL ends with :orig
			...(req.url.endsWith(':large') ? { redirectUrl: req.url.replace(':large', ':orig') } : {}),
			...(!(req.url.endsWith(':large') || req.url.endsWith(':orig')) ? { redirectUrl: req.url + ':orig' } : {}),
		};
	},
	{ urls: [ '*://pbs.twimg.com/media/*' ], types: [ 'image', 'main_frame' ] },
	[ 'blocking', 'responseHeaders' ],
);
