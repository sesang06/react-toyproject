import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';
import { render } from 'react-dom';
function makeUnsplashSrc (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}
function makeUnsplashSrcSet (id, size) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
	const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159';

	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}

// Unsplash images from the "Spirit Animals" collection
// https://unsplash.com/collections/158825/spirit-animals

const DEFAULT_IMAGES = [
	{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
	{ id: '1471079502516-250c19af6928', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
	{ id: '1454023492550-5696f8ff10e1', caption: 'Photo by Jessica Weiller', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
	{ id: '1470854989922-5be2f7456d78', caption: 'Photo by Piotr Łaskawski', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
	{ id: '1470317596697-cbdeda56f999', caption: 'Photo by Michel Bosma', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
];
const THEMED_IMAGES = [
	{ id: '1471101173712-b9884175254e', caption: 'Photo by Pedro Lastra', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/5oRzZU5uwSM (Dragonfly)
	{ id: '1471127432458-65206be149c9', caption: 'Photo by Ernesto Velázquez', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/Kpgt4pl03O0 (Deer)
	{ id: '1470777639313-60af88918203', caption: 'Photo by Cris Saur', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GNUcUx-iObg (Koala)
	{ id: '1453550486481-aa4175b013ea', caption: 'Photo by Benjamin Pley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/WiSeaZ4E6ZI (Elephant)
	{ id: '1415904663467-dfdc16cae794', caption: 'Photo by Levi Saunders', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/NUMlxTPsznM (Coyote)
];
const THUMBNAIL_IMAGES = [
	{ id: '1454991727061-be514eae86f7', caption: 'Photo by Thomas Kelley', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/t20pc32VbrU (Hump Back Whale)
	{ id: '1455717974081-0436a066bb96', caption: 'Photo by Teddy Kelley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/cmKPOUgdmWc (Deer)
	{ id: '1460899960812-f6ee1ecaf117', caption: 'Photo by Jay Ruzesky', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/h13Y8vyIXNU (Walrus)
	{ id: '1456926631375-92c8ce872def', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
	{ id: '1452274381522-521513015433', caption: 'Photo by Adam Willoughby-Knox', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/_snqARKTgoc (Mother and Cubs)
	{ id: '1471145653077-54c6f0aae511', caption: 'Photo by Boris Smokrovic', orientation: 'landscape' }, // https://unsplash.com/photos/n0feC_PWFdk (Dragonfly)
	{ id: '1471005197911-88e9d4a7834d', caption: 'Photo by Gaetano Cessati', orientation: 'landscape' }, // https://unsplash.com/photos/YOX8ZMTo7hk (Baby Crocodile)
	{ id: '1470583190240-bd6bbde8a569', caption: 'Photo by Alan Emery', orientation: 'landscape' }, // https://unsplash.com/photos/emTCWiq2txk (Beetle)
	{ id: '1470688090067-6d429c0b2600', caption: 'Photo by Ján Jakub Naništa', orientation: 'landscape' }, // https://unsplash.com/photos/xqjO-lx39B4 (Scottish Highland Cow)
	{ id: '1470742292565-de43c4b02b57', caption: 'Photo by Eric Knoll', orientation: 'landscape' }, // https://unsplash.com/photos/DmOCkOnx-MQ (Cheetah)
	// https://unsplash.com/photos/NUMlxTPsznM coyote?
];

const theme = {
	// container
	container: { background: 'rgba(255, 255, 255, 0.9)' },

	// arrows
	arrow: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		fill: '#222',
		opacity: 0.6,
		transition: 'opacity 200ms',

		':hover': {
			opacity: 1,
		},
	},
	arrow__size__medium: {
		borderRadius: 40,
		height: 40,
		marginTop: -20,

		'@media (min-width: 768px)': {
			height: 70,
			padding: 15,
		},
	},
	arrow__direction__left: { marginLeft: 10 },
	arrow__direction__right: { marginRight: 10 },

	// header
	close: {
		fill: '#D40000',
		opacity: 0.6,
		transition: 'all 200ms',

		':hover': {
			opacity: 1,
		},
	},

	// footer
	footer: {
		color: 'black',
	},
	footerCount: {
		color: 'rgba(0, 0, 0, 0.6)',
	},

	// thumbnails
	thumbnail: {
	},
	thumbnail__active: {
		boxShadow: '0 0 0 2px #00D8FF',
	},
};

class Apps extends Component {

render(){
	<div>
		<div style={{ marginBottom: 40 }}>
			<p>Photos courtesy of <a href="https://unsplash.com/" target="_blank">Unsplash</a>. Use your keyboard to navigate <kbd>left</kbd> <kbd>right</kbd> <kbd>esc</kbd> &mdash; Also, try resizing your browser window.</p>
		</div>
		<h3>Default Options</h3>
		<Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
			src: makeUnsplashSrc(id),
			thumbnail: makeUnsplashThumbnail(id, orientation),
			srcset: [
				makeUnsplashSrcSet(id, 1024),
				makeUnsplashSrcSet(id, 800),
				makeUnsplashSrcSet(id, 500),
				makeUnsplashSrcSet(id, 320),
			],
			caption,
			orientation,
			useForDemo,
		}))} />

		<h3>With Thumbnails</h3>
		<Gallery images={THUMBNAIL_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
			src: makeUnsplashSrc(id),
			thumbnail: makeUnsplashThumbnail(id, orientation),
			srcset: [
				makeUnsplashSrcSet(id, 1024),
				makeUnsplashSrcSet(id, 800),
				makeUnsplashSrcSet(id, 500),
				makeUnsplashSrcSet(id, 320),
			],
			caption,
			orientation,
			useForDemo,
		}))} showThumbnails />

		<h3>Themed Lightbox</h3>
		<Gallery images={THEMED_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
			src: makeUnsplashSrc(id),
			thumbnail: makeUnsplashThumbnail(id, orientation),
			srcset: [
				makeUnsplashSrcSet(id, 1024),
				makeUnsplashSrcSet(id, 800),
				makeUnsplashSrcSet(id, 500),
				makeUnsplashSrcSet(id, 320),
			],
			caption,
			orientation,
			useForDemo,
		}))} theme={theme} showThumbnails />
	</div>
}
}
class Gallery extends Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		const { images } = this.props;

		if (!images) return;

		const gallery = images.filter(i => i.useForDemo).map((obj, i) => {
			return (
				<a
					href={obj.src}
					className={css(classes.thumbnail, classes[obj.orientation])}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
				>
					<img src={obj.thumbnail} className={css(classes.source)} />
				</a>
			);
		});

		return (
			<div className={css(classes.gallery)}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					showThumbnails={this.props.showThumbnails}
					theme={this.props.theme}
				/>
			</div>
		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string,
};

const gutter = {
	small: 2,
	large: 4,
};
const classes = StyleSheet.create({
	gallery: {
		marginRight: -gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			marginRight: -gutter.large,
		},
	},

	// anchor
	thumbnail: {
		boxSizing: 'border-box',
		display: 'block',
		float: 'left',
		lineHeight: 0,
		paddingRight: gutter.small,
		paddingBottom: gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			paddingRight: gutter.large,
			paddingBottom: gutter.large,
		},
	},

	// orientation
	landscape: {
		width: '30%',
	},
	square: {
		paddingBottom: 0,
		width: '40%',

		'@media (min-width: 500px)': {
			paddingBottom: 0,
		},
	},

	// actual <img />
	source: {
		border: 0,
		display: 'block',
		height: 'auto',
		maxWidth: '100%',
		width: 'auto',
	},
});

export default Apps;
