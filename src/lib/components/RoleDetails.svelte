<script lang="ts">
	import { format, intervalToDuration, isValid } from 'date-fns';

	const { position, company, startDate, endDate } = $$props;

	const formatDates = (startDate: string | number | Date, endDate: string | number | Date) => {
		const formatedDateStart = format(new Date(startDate), 'MMMM yyyy');
		const formatedDateEnd = () => {
			if (isValid(new Date(endDate))) {
				return format(new Date(endDate), 'MMMM yyyy');
			} else {
				return 'Present';
			}
		};
		const intervalEndDate = endDate === '' ? new Date() : endDate;
		const { years, months } = intervalToDuration({
			start: new Date(startDate),
			end: new Date(intervalEndDate),
		});
		const yearsAndMonths = () => {
			const intervalYears = years ? `${years}${years === 1 ? 'yr' : 'yrs'}` : '';
			const intervalMonths = months ? `${months}${months === 1 ? 'mo' : 'mos'}` : '';

			if (intervalYears === '' && intervalMonths !== '') {
				return `(${intervalMonths})`;
			}
			if (intervalYears !== '' && intervalMonths === '') {
				return `(${intervalYears})`;
			}
			if (intervalYears !== '' && intervalMonths !== '') {
				return `(${intervalYears} ${intervalMonths})`;
			}
			return '';
		};

		return `${formatedDateStart} - ${formatedDateEnd()} ${yearsAndMonths()}`;
	};
</script>

<div
	class="mb-2 flex flex-col justify-between md:flex-row md:items-center print:mb-0 print:flex-row"
>
	<h2
		class="my-2 text-2xl md:text-3xl font-bold tracking-wide text-primary print:text-2xl print:text-black not-prose"
	>
		{position}
	</h2>
	<span class="text-lg md:text-2xl font-bold print:text-xl print:text-black not-prose">
		{company}
	</span>
</div>

<span
	class="text-base md:text-lg font-bold text-accent print:text-xs print:font-medium print:text-black"
>
	{formatDates(startDate, endDate === null ? '' : endDate)}
</span>
<div class="mb-6 print:mb-2" />
