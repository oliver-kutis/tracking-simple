<script lang="ts">
	import themeStore from '$stores/theme';
	import { themes } from '$lib/themes';
	// import './prism-coldark-dark.css';
	import type { PageData } from './$types';
	import theme from '$stores/theme';

	const currentTheme = themes.find((theme: any) => theme.theme === $themeStore);
	const currentThemeMode = currentTheme ? currentTheme.meta.mode : { mode: 'light' };

	export let data: PageData;
	const { metadata, post: Post } = data;
</script>

<article>
	<div class={`prose py-4 px-4 ${currentThemeMode?.mode === 'dark' ? 'dark' : 'light'}`}>
		<Post />
	</div>
	<!-- <nav>
        {#if metadata.previous}
            <a href={`../${metadata.previous.slug}`}>← {metadata.previous.title}</a>
        {/if}
        {#if metadata.next} -->
</article>

<style lang="scss">
	.light {
		code[class*='language-'],
		pre[class*='language-'] {
			color: #393a34;
			font-family: 'Consolas', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace;
			direction: ltr;
			text-align: left;
			white-space: pre;
			word-spacing: normal;
			word-break: normal;
			font-size: 0.9em;
			line-height: 1.2em;

			-moz-tab-size: 4;
			-o-tab-size: 4;
			tab-size: 4;

			-webkit-hyphens: none;
			-moz-hyphens: none;
			-ms-hyphens: none;
			hyphens: none;
		}

		pre > code[class*='language-'] {
			font-size: 1em;
		}

		pre[class*='language-']::-moz-selection,
		pre[class*='language-'] ::-moz-selection,
		code[class*='language-']::-moz-selection,
		code[class*='language-'] ::-moz-selection {
			background: #b3d4fc;
		}

		pre[class*='language-']::selection,
		pre[class*='language-'] ::selection,
		code[class*='language-']::selection,
		code[class*='language-'] ::selection {
			background: #b3d4fc;
		}

		/* Code blocks */
		pre[class*='language-'] {
			padding: 1em;
			margin: 0.5em 0;
			overflow: auto;
			border: 1px solid #dddddd;
			background-color: white;
		}

		/* Inline code */
		:not(pre) > code[class*='language-'] {
			padding: 0.2em;
			padding-top: 1px;
			padding-bottom: 1px;
			background: #f8f8f8;
			border: 1px solid #dddddd;
		}

		.token.comment,
		.token.prolog,
		.token.doctype,
		.token.cdata {
			color: #999988;
			font-style: italic;
		}

		.token.namespace {
			opacity: 0.7;
		}

		.token.string,
		.token.attr-value {
			color: #e3116c;
		}

		.token.punctuation,
		.token.operator {
			color: #393a34; /* no highlight */
		}

		.token.entity,
		.token.url,
		.token.symbol,
		.token.number,
		.token.boolean,
		.token.variable,
		.token.constant,
		.token.property,
		.token.regex,
		.token.inserted {
			color: #36acaa;
		}

		.token.atrule,
		.token.keyword,
		.token.attr-name,
		.language-autohotkey .token.selector {
			color: #00a4db;
		}

		.token.function,
		.token.deleted,
		.language-autohotkey .token.tag {
			color: #9a050f;
		}

		.token.tag,
		.token.selector,
		.language-autohotkey .token.keyword {
			color: #00009f;
		}

		.token.important,
		.token.function,
		.token.bold {
			font-weight: bold;
		}

		.token.italic {
			font-style: italic;
		}
	}
</style>
