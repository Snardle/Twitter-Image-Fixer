<h1 align="center">
<sub>
<img  src="icon.svg"
      height="38"
      width="38">
</sub>
Twitter Image Fixer
</h1>

Twitter does weird things with image URLs. Trying to download an image will sometimes result in a weird filename or extension. To save on bandwidth (ostensibly), Twitter hosts three different copies of an uploaded image: `image.jpg`, `image.jpg:large`, and `image.jpg:orig`. Each one has different uses:
+ `image.jpg` is displayed when the image is present in a timeline post.
+ `image.jpg:large` is displayed when the image is clicked on from a post.
+ `image.jpg:orig` is apparently used somewhere.

Of those three, `image.jpg:orig` is the original uploaded image and will have the highest quality (in most cases, it seems, `image.jpg:large` is just a duplicate of `:orig`, but I can't ensure that's always the case). However, none of the images are sent with a Content-Disposition header, and, without it, browsers have to guess what a download's proper filename is. This isn't a problem for `image.jpg`, but the `:large` and `:orig` variants throw a wrench into the system because the "`:`" character is often reserved by operating systems and file systems. And so the web browser usually ends up sanitizing the name by mucking around with the filename or (worse) the extension.

That's where the Twitter Image Fixer extension comes in. TIF does two very simple things:
1. Redirect all image requests to the `:orig` quality version; and
2. Intercept the received headers to ensure that the image is downloaded with the expected name.

Essentially, it does in 30 lines of JavaScript what Twitter could do in a couple on their backend servers.

¯\\\_(ツ)\_/¯

<h1></h1>

## Releases
+ Firefox: https://addons.mozilla.org/en-US/firefox/addon/twitter-image-fixer/

## Maintenance
I only use Firefox, so I can only guarantee TIF to work there. The WebExtension v2 API seems pretty well solidified, though, and I would expect anything that's compatibile with it to work with this extension. I use Twitter often enough that I'll probably notice if something breaks, but I can't guarantee any timetable for fixes, especially for Chrome et al.

## History
+ v1.0: Initial release

## License
Twitter Image Fixer is licensed under [GPLv3](LICENSE.txt). The TIF icon uses a modified [solid style file-image](https://fontawesome.com/icons/file-image?style=solid) asset from Font Awesome, which is licensed under [CC BY 4.0](https://fontawesome.com/license/free).