export interface IUserContext {
	user: any;
	login: (cb?: (user) => void) => void;
	logout: (cb?: () => void) => void;
}

export interface IFeedback {
	date: string;
	response: string;
	from: string;
}

export interface IFile {
	name: string;
	type: string;
	size: string;
	url: string;
}

export interface IIncident {
	createdAt: string;
	reportedBy: string;
	date: string;
	time: string;
	location: string;
	incidentType: 'Discrimination' | 'Harassment' | 'Bias' | string;
	status: 'Pending' | 'Under Review' | 'Resolved' | string;
	severity: string;
	description: string;
	partiesInvolved: string;
	witnesses: string;
	evidence?: IFile[];
	id?: string;
	investigator?: string;
	feedback?: IFeedback[];
	emotionalImpact?: string;
	rating?: number;
	desiredOutcome?: string;
	confidentiality: string;
	contactInformation?: string;
	comments?: string;
}
