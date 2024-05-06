import { dev } from '$app/environment';
import type { Language } from './types';

export const websiteURL = dev ? 'http://localhost:5173/' : 'https://oliverkutis.blog';
// export const githubURL = 'https://github.com/oliver-kutis';
// export const linkedinURL = 'https://linkedin.com/in/oliver-kuti%C5%A1-5248a1179';
// export const twitterURL = 'https://twitter.com/oliverkutis';
// export const emailAddress = 'oliver.kutis@gmail.com';

type LangConfigsType = {
	[key in Language]: {
		name: string;
		title: string;
		description: string;
		bio: string;
		bioDescription: string;
	};
};

export const langConfigs: LangConfigsType = {
	en: {
		name: 'Oliver Kutis',
		title: 'Oliver Kutis | Web analytics',
		description: 'Oliver Kutis personal website | Blog about web analytics',
		bio: 'Web tracking specialist and marketing analyst',
		bioDescription:
			'I am a web tracking specialist and marketing analyst. I help businesses to understand their customers and improve their online presence.',
	},
	sk: {
		name: 'Oliver Kutiš',
		title: 'Oliver Kutiš | Webová analytika',
		description: 'Osobná webstránka Olivera Kutiša | Blog o webovej analytike',
		bio: 'Špecialista na webové sledovanie a marketingový analytik',
		bioDescription:
			'Som špecialista na webové sledovanie a marketingový analytik. Pomáham firmám pochopiť ich zákazníkov a zlepšiť ich online prítomnosť.',
	},
};

export const socials = {
	github: 'https://github.com/oliver-kutis',
	linkedin: 'https://linkedin.com/in/oliver-kuti%C5%A1-5248a1179',
	twitter: 'https://twitter.com/oliverkutis',
	email: 'analytika.oliver.kutis@gmail.com',
	medium: 'https://medium.com/@oliverkutis',
};
