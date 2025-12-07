import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import { type Membership, CreateMembership, UpdateMembership } from "./types";

// Функції для API-запитів
const getMemberships = async (): Promise<Membership[]> => {
	const response = await apiClient.get("/membership");
	return response.data;
};

const getMembershipById = async (id: string): Promise<Membership> => {
	const response = await apiClient.get(`/membership/${id}`);
	return response.data;
};

const createMembership = async (
	newMembersgip: Omit<CreateMembership, "id">
): Promise<Membership> => {
	const response = await apiClient.post("/membership", newMembersgip);
	return response.data;
};

const updateMembership = async ({
	id,
	data,
}: {
	id: string;
	data: Partial<UpdateMembership>;
}): Promise<Membership> => {
	const response = await apiClient.patch(`/membership/${id}`, data);
	return response.data;
};

const deleteMembership = async (id: string): Promise<void> => {
	await apiClient.delete(`/membership/${id}`);
};

export const useMemberships = () =>
	useQuery<Membership[]>({
		queryKey: ["memberships"],
		queryFn: getMemberships,
	});

export const useMembership = (id: string) =>
	useQuery<Membership>({
		queryKey: ["memberships", id],
		queryFn: () => getMembershipById(id),
	});

export const useCreateMembership = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createMembership,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["memberships"] });
			navigate({ to: "/memberships" });
		},
	});
};

export const useUpdateMembership = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateMembership,
		onSuccess: (updateMembership) => {
			queryClient.invalidateQueries({ queryKey: ["memberships"] });
			queryClient.setQueryData(
				["memberships", updateMembership.id],
				updateMembership
			);
			navigate({ to: "/memberships" });
		},
	});
};

export const useDeleteMembership = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteMembership,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["memberships"] });
		},
	});
};
