import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import Cookies from "js-cookie";
import { LoginData, LoginRsp } from "./types";

const login = async (data: LoginData): Promise<LoginRsp> => {
	const response = await apiClient.post("/auth/login/", data);
	return response.data;
};

export const useLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			// queryClient.invalidateQueries({ queryKey: ["memberships"] });
			Cookies.set("token", data.data);
			navigate({ to: "/memberships" });
		},
	});
};
