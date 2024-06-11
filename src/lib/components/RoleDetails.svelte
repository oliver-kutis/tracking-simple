<script lang="ts">
	import { format, intervalToDuration, isValid } from 'date-fns';
	// import { format } from 'date-fns/fp/formatWithOptions';
	import { sk, enGB } from 'date-fns/locale';

	const {
		lang,
		position,
		company,
		startDate,
		endDate,
		eventName,
		eventTopic,
		eventClassification,
		eventLocation,
		eventDate,
	} = $$props;

	const formatDates = (
		startDate: string | number | Date,
		endDate: string | number | Date,
		formatType: string = 'range', // 'range' | 'single'
		lang = 'en',
	) => {
		const dateOptions = {
			locale: lang === 'sk' ? sk : enGB,
			localize: true,
		};

		let dateFormat;
		if (formatType === 'range') {
			dateFormat = 'LLLL yyyy';
		} else {
			dateFormat = 'd. LLLL, yyyy';
		}
		let formatedDateStart = format(new Date(startDate), dateFormat, dateOptions);
		formatedDateStart = formatedDateStart.charAt(0).toUpperCase() + formatedDateStart.slice(1);

		if (formatType === 'single') {
			if (lang === 'en') {
				if (formatedDateStart.startsWith('1.')) {
					formatedDateStart = formatedDateStart.replace('1.', '1st of');
				} else if (formatedDateStart.startsWith('2.')) {
					formatedDateStart = formatedDateStart.replace('2.', '2nd of');
				} else if (formatedDateStart.startsWith('3.')) {
					formatedDateStart = formatedDateStart.replace('3.', '3rd of');
				} else {
					formatedDateStart = formatedDateStart.replace('4.', '4th of');
				}
			}

			return formatedDateStart;
		}

		let formatedDateEnd = () => {
			if (isValid(new Date(endDate))) {
				return format(new Date(endDate), 'LLLL yyyy', dateOptions);
			} else {
				return lang === 'sk' ? 'Súčasnosť' : 'Present';
			}
		};
		const intervalEndDate = endDate === '' ? new Date() : endDate;
		const { years, months } = intervalToDuration({
			start: new Date(startDate),
			end: new Date(intervalEndDate),
		});
		const yearsAndMonths = () => {
			const yrsLoc = lang === 'sk' ? 'roky' : 'years';
			const yrLoc = lang === 'sk' ? 'rok' : 'year';
			const mosLoc = lang === 'sk' ? 'mesiace' : 'months';
			const moLoc = lang === 'sk' ? 'mesiac' : 'month';

			const intervalYears = years ? `${years} ${years === 1 ? yrLoc : yrsLoc}` : '';
			const intervalMonths = months ? `${months} ${months === 1 ? moLoc : mosLoc}` : '';

			if (intervalYears === '' && intervalMonths !== '') {
				return `(${intervalMonths})`;
			}
			if (intervalYears !== '' && intervalMonths === '') {
				return `(${intervalYears})`;
			}
			if (intervalYears !== '' && intervalMonths !== '') {
				return `(${intervalYears} + ${intervalMonths})`;
			}
			return '';
		};

		return `${formatedDateStart} - ${formatedDateEnd()} ${yearsAndMonths()}`;
	};
</script>

<div
	class="mb-2 flex flex-col justify-between md:flex-row md:items-start print:mb-0 print:flex-row"
>
	{#if position}
		<h2
			class="my-2 text-2xl md:text-3xl font-bold tracking-wide text-primary print:text-2xl print:text-black not-prose"
		>
			{position}
		</h2>
	{/if}
	{#if eventName}
		<div class="flex flex-col">
			<h2
				class="my-2 text-2xl md:text-3xl font-bold tracking-wide text-primary print:text-2xl print:text-black not-prose"
			>
				{eventName}
			</h2>
			<h3
				class="text-xl md:text-2xl font-normal tracking-wide text-primary print:text-xl print:text-black not-prose"
			>
				{eventClassification} - {eventLocation}
			</h3>
			<h4
				class="mt-2 text-xl md:text-2xl font-bold tracking-wide text-base-content print:text-xl print:text-black not-prose"
			>
				{eventTopic}
			</h4>
		</div>
	{/if}
	{#if company}
		<span
			class="text-nowrap text-lg md:text-2xl font-bold print:text-xl print:text-black not-prose"
		>
			{company}
		</span>
	{/if}
</div>

<span
	class="text-base md:text-lg font-bold text-accent print:text-xs print:font-medium print:text-black"
>
	{#if startDate}
		{formatDates(startDate, endDate === null ? '' : endDate, 'range', lang)}
	{:else if eventDate}
		{formatDates(new Date(eventDate), '', 'single', lang)}
	{/if}
	<!-- {formatDates(startDate, endDate === null ? '' : endDate)} -->
</span>
<div class="mb-6 print:mb-2" />
