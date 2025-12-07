export interface Service {
	id: number;
	name: string;
}

export interface Membership {
	id: string;
	name: string;
	duration_months: number;
	price: number;
	status: string | null;
	services: Service[];
}

export interface CreateMembership {
	name: string;
	duration_months: number;
	price: number;
	status: string | null;
	serviceIds?: number[];
}

export interface UpdateMembership {
	id: string;
	name: string;
	duration_months: number;
	price: number;
	status: string | null;
	serviceIds: number[];
}
