import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from "app/auth/authRoles";

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	// {
	// 	id: 'applications',
	// 	title: 'Applications',
	// 	translate: 'APPLICATIONS',
	// 	type: 'group',
	// 	icon: 'apps',
	// 	children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'DASHBOARD',
				type: 'item',
				icon: 'dashboard',
				url: '/dashboard',
				// auth: authRoles.admin,
			},
			{
				id: "crew",
				title: 'Crew',
				translate: "CREW",
				type: "collapse",
				icon: 'whatshot',
				children: [
					{
						id: 'crew-new',
						title: 'New',
						translate: 'NEW',
						type: 'item',
						url: '/crew/new'
					},
					{
						id: 'crew-search',
						title: 'Search',
						translate: 'SEARCH',
						type: 'item',
						url: '/crew/search'
					},
					// {
					// 	id: 'crew-edit',
					// 	title: 'Edit / View',
					// 	translate: 'EDIT / VIEW',
					// 	type: 'item',
					// 	url: '/crew/details/:crewId/personal-details'
					// },
					{
						id: 'crew-list',
						title: 'List',
						translate: 'LIST',
						type: 'item',
						url: '/crew/list'
					},
					{
						id: 'crew-retention-rate',
						title: 'Retention Rate',
						translate: 'RETENTION RATE',
						type: 'item',
						url: '/crew/retention-rate'
					},
					{
						id: 'crew-wrh-list',
						title: 'WRH List',
						translate: 'WRH LIST',
						type: 'item',
						url: '/crew/wrh-list'
					},
					{
						id: 'crew-working-arrangements',
						title: 'Working Arrangements',
						translate: 'WORKING ARRAGEMENTS',
						type: 'item',
						url: '/crew/working-arrangements'
					},
					{
						id: 'crew-vessel-operation-type',
						title: 'Vessel Operation Type',
						translate: 'VESSEL OPERATION TYPE',
						type: 'item',
						url: '/crew/vessel-operation-type'
					},
					{
						id: 'crew-ranks',
						title: 'Ranks',
						translate: 'RANKS',
						type: 'item',
						url: '/crew/ranks'
					},
					{
						id: 'crew-certificates',
						title: 'Certificates',
						translate: 'CERTIFICATES',
						type: 'item',
						url: '/crew/certificates'
					}
				]
			},		
			
	// 	]
	// }
];

export default navigationConfig;
