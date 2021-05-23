//src: https://medium.com/edonec/the-best-way-to-get-image-dimensions-and-use-it-in-functional-components-6e02368095c3

export const dimensions = (imgSrc) => {
    // Create new offscreen image to test
    const theImage = new Image();
    theImage.src = imgSrc;
    // Get accurate measurements from that.
    const imageWidth = theImage.width;
    const imageHeight = theImage.height;
    // Create an object to save the image width and height
    const imgDimensions = { width: imageWidth, height: imageHeight };
    // Return the result
    return imgDimensions;
};